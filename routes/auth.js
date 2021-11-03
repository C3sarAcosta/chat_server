/**
    path: api/login
 */
const { Router, response } = require('express');
const { crearUsuario } = require('../controllers/auth');

const router = Router();

//End point para crear un usuario
router.post('/new', crearUsuario)

module.exports = router;
