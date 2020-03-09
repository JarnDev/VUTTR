const redis = require('redis-mock')

function createClient(){
    return redis.createClient()
}


module.exports = {
    createClient
}