/**
    path: api/login
 */
const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//End point para crear un usuario
router.post('/new', [
    //Eexpress-validator para validar campos
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario)

//End point para login
router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
], login);

//End point renovar token (validarJWT es el middleware)
router.get('/renew', validarJWT, renewToken);

module.exports = router;
