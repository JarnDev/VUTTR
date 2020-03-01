/**
 * @param  {string}  base64 Data
 * @return {string}  Promise Image url
 */
const imageUpload = (base64) => {
    if(!base64.includes('data:image')){
        return new Promise((resolve, reject) => {
            return resolve(base64)
        })
    }
    console.log("UPLOADING")
    const AWS = require('aws-sdk');
    const {aws_config, bucket} = require('./s3_config.json')

    // Configure AWS with your access and secret key.
    AWS.config.update(aws_config)
    
    // Create an s3 instance
    const s3 = new AWS.S3({ params: { Bucket: bucket } });

    //Remove header from file
    
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // Getting the file type, ie: jpeg, png or gif
    const type = base64.split(';')[0].split('/')[1];
    //console.log(`image/${type}`)

    var data = {
        Key: `${Date.now()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
    }

    return new Promise((resolve, reject) => {
        s3.upload(data, function (err, data) {
            if (err) {
                console.log(err);
                return reject('Error uploading data: ', data)
            }
            console.log('succesfully uploaded the image!');
            console.log(data.Location)
            return resolve(data.Location)
        })
    })

}

const deleteItems = (lista) => {
    if(!lista[0].includes('s3.amazonaws.com')){
        return new Promise((resolve, reject) => {
            return resolve()
        })
    }
    console.log("DELETING")
    const AWS = require('aws-sdk');
    const {aws_config, bucket} = require('./s3_config.json')
    const S3_BUCKET = 'mockupcatwalk'
    var deletable = false
    // Configure AWS with your access and secret key.
    AWS.config.update(aws_config)
    
    // Create an s3 instance
    const s3 = new AWS.S3({ params: { Bucket: bucket } });

    const key_list = []
    //location.replace(/^http.*\//, "")
    for(let index in lista){
        if(lista[index].length >0){
            key_list.push({"Key": lista[index].replace(/^http.*\//, "")})
            deletable=true
        }
    }
    return new Promise((resolve, reject) => { 
        if(deletable){
            var params = {
                Bucket: bucket, 
                Delete: {
                Objects: key_list, 
                Quiet: false
                }
                };

            s3.deleteObjects(params, function(err, data) {
                if (err){
                    console.log(err, err.stack); // an error occurred
                    reject(err, err.stack)
                }   
                console.log(data)        
                resolve(data)
            }); 
        }
    })
    
}

module.exports = {imageUpload, deleteItems};