const Tools = require('../models/tool-model')
const ObjectId = require('mongoose').Types.ObjectId
const customRedis = require('../config/customRedis')
class ToolControler {

    static rotas() {
        return {
            home: '/',
            remove: '/:id'
        }
    }

    getTools() {
        return async (req, res) => {
            let db_response = null

            db_response = await customRedis.get(req.query)
            if (!db_response) {
                console.log("Not in Cache!") //for debug
                if (req.query.hasOwnProperty('global')) {
                    if (req.query.global !== '') {
                        db_response = await Tools.aggregate([
                            {
                                $match: {
                                    $or: [
                                        { 'title': { $regex: req.query.global, $options: 'i' } },
                                        { 'description': { $regex: req.query.global, $options: 'i' } },
                                        { 'tags': { $elemMatch: { $regex: req.query.global, $options: 'i' } } }
                                    ]
                                }
                            }
                        ])
                    } else {
                        db_response = await Tools.find({})
                    }
                } else if (req.query.hasOwnProperty('tag')) {
                    let tags = req.query.tag.split(/,| /).filter(tag => tag !== '').map(tag => tag.toLowerCase())
                    db_response = await Tools.find({ "tags": { "$in": tags } })
                } else {
                    db_response = await Tools.find({})
                }

                customRedis.set(req.query, db_response)
            } else {
                console.log("In Cache!")
            }


            return res.status(200).json(db_response)
        }
    }

    addTool() {
        return async (req, res) => {
            await customRedis.clearAll()
            const { title, link, description, tags } = req.body;
            let db_response = await Tools.findOne({ title })

            if (!db_response) {
                let db_response = await Tools.create(req.body)
                return res.status(201).json(db_response)
            }

            return res.status(200).json(db_response)
        }
    }

    removeTool() {
        return async (req, res) => {
            console.log(`Removendo => ${JSON.stringify(req.params)}`)
            await customRedis.clearAll()
            await Tools.findByIdAndRemove(new ObjectId(req.params.id))
            return res.sendStatus(204)
        }
    }


}


module.exports = ToolControler