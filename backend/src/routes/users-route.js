const { Router } = require('express')
const passport = require('passport')
require('../config/passport')
const router = Router()

const UserControlador = require('../controllers/user-controller') 
const userRotas = UserControlador.rotas();

const userControlador = new UserControlador();
const localPassport = passport.authenticate('local', { session: false });
const jwtPassport = passport.authenticate('jwt', { session: false });

router.post(userRotas.cadastrar, userControlador.cadastrar())
router.post(userRotas.logar, localPassport, userControlador.logar())
router.delete(userRotas.userId, jwtPassport, userControlador.remover())


module.exports = router

