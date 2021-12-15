const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        //Viene de base de datos
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para: {
        //Viene de base de datos
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Sobreescribiendo el metodo toJSON
MensajeSchema.method('toJSON', function () {
    /*Extraemos __v, _id, password
    ... (Operador rest) y le decimos que todo lo que sobra lo ponemos en el object
    le agregamos la propiedad uid
    retornamos object
    */
    const { __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Mensaje', MensajeSchema);