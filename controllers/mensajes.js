//const req = require('express/lib/request');
const Mensajes = require('../models/mensaje');

const obtenerChat = async (req, res) => {
    const miId = req.uid;
    const mensjaesDe = req.params.de;

    /*const desde = Number(req.query.desde) || 0;

    const usuarios = await Usuario
        .find()
        .sort('-online')
        .skip(desde)
        .limit(20); */

    //const desde = Number(req.query.desde) || 0;
    const mens = await Mensajes.find({
        $or: [{ de: miId, para: mensjaesDe }, { de: mensjaesDe, para: miId }]
    })
        .sort({ createdAt: 'desc' })
        .limit(30);



    res.json({
        ok: true,
        mensajes: mens
    })
}

module.exports = {
    obtenerChat
}