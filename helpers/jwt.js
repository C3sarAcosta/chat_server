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

const comprobarJWT = (token = '') => {
    try {
        //Validar token
        //extraer uid del payload del token
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}