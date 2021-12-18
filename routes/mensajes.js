/*
    Path: /api/mensajes
*/

const { Router, response } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwwt');

const router = Router();

router.get('/:de', validarJWT, obtenerChat);

module.exports = router;
