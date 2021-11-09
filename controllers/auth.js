const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    //Destructurar body
    const { email, password } = req.body;

    try {
        //Buscar en la base de datos si el correo existe
        const existeEmail = await Usuario.findOne({ email: email });

        //Mandamos el error en caso de que el correo exista
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }

        //Crear instancia del modelo
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        //Generamos numeros aleatorios
        const salt = bcrypt.genSaltSync();
        //encriptamos
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardarlo en la base de datos
        await usuario.save();

        res.json({
            ok: true,
            //Se manda a llamar el metodo que sobreescribimos
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }


}

module.exports = {
    crearUsuario
}