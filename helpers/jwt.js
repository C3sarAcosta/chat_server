const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    //Crear una promesa
    return new Promise((resolve, reject) => {
        //Generamos el payload
        const payload = {
            uid
        };

        //Firmamos el jwt
        jwt.sign(payload, process.env.JWT_KEY, {
            //Tiempo de expiracion
            expiresIn: '12h'
            //callback
        }, (err, token) => {
            if (err) {
                //no se pudo crear el tokrn
                reject('No se genero el JWT')
            } else {
                //token
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}