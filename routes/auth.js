/**
    path: api/login
 */
const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth');

const router = Router();

//End point para crear un usuario
router.post('/new', [
    //Eexpress-validator para validar campos
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], crearUsuario)

module.exports = router;
