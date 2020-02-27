const { Router } = require('express')
const ToolControler = require('../controllers/tools-controller')

const passport = require('passport')
require('../config/passport')
const jwtPassport = passport.authenticate('jwt', { session: false });

const router = Router()

const toolControler = new ToolControler()
const toolRotas = ToolControler.rotas()

router.route(toolRotas.home)
    .all(jwtPassport)
    .get(toolControler.getTools())
    .post(toolControler.addTool())

router.delete(toolRotas.remove, jwtPassport, toolControler.removeTool())

module.exports = router