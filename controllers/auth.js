const { response } = require("express");
const Usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {

    //Crear instancia del modelo
    const usuario = new Usuario(req.body);
    //Guardarlo en la base de datos
    await usuario.save();

    res.json({
        ok: true,
        msg: 'Creando usuario'
    });
}

module.exports = {
    crearUsuario
}