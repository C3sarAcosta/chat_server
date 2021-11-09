const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

//Sobreescribiendo el metodo toJSON
UsuarioSchema.method('toJSON', function () {
    /*Extraemos __v, _id, password
    ... (Operador rest) y le decimos que todo lo que sobra lo ponemos en el object
    le agregamos la propiedad uid
    retornamos object
    */
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);