const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se mando ningun token'
        });
    }

    try {
        //Validar token
        //extraer uid del payload del token
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //Obtener uid en cualquier parte de la app
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

}

module.exports = {
    validarJWT
}