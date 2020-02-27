const Tools = require('../models/tool-model')
const ObjectId = require('mongoose').Types.ObjectId
class ToolControler {

    static rotas(){
        return {
            home: '/',
            remove: '/:id'
        }
    }

    getTools() {
        return async (req, res) => {
            let db_response = null
            // console.log(req.query)
            if( req.query.hasOwnProperty('global') ){
                if(req.query.global !== ''){
                    db_response = await Tools.find(
                        { 
                            $text: { $search: req.query.global } 
                        }
                    )
                }else{
                    db_response = await Tools.find({})
                }
            }else if( req.query.hasOwnProperty('tag') ){
                let tags = req.query.tag.split(',').map(tag => tag.trim().toLowerCase())
                db_response = await Tools.find({ "tags": { "$in": tags } })
            }else{
                db_response = await Tools.find({})
            }
            return res.status(200).json(db_response)
        }
    }

    addTool(){
        return async (req, res) => {
            const { title, link, description, tags } = req.body;
            let db_response = await Tools.findOne({ title })

            if(!db_response){
                let db_response = await Tools.create(req.body)
                return res.status(201).json(db_response)
            }
                        
            return res.status(200).json(db_response)
        }
    }

    removeTool(){
        return async (req,res) =>{
            await tools.findByIdAndRemove(new ObjectId(req.params.id))
            return res.sendStatus(204)
        }
    }

    
}


module.exports = ToolControler