const mongoose = require('mongoose')

const dbConeccion = async () => {
    try {
        console.log('init db');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConeccion
}