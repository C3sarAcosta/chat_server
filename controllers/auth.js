const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

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

        //Generar un JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            //Se manda a llamar el metodo que sobreescribimos
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Validar email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        //Validar password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto"
            });
        }

        //Generamos el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            //Se manda a llamar el metodo que sobreescribimos
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
    /*return res.json({
        ok: true,
        msg: 'login'
    })*/
}

module.exports = {
    crearUsuario,
    login
}