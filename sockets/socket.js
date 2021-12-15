const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    //console.log(valido, uid);
    if (!valido) {
        return client.disconnect();
    }

    //console.log('cliente autenticado');
    usuarioConectado(uid);

    //Ingresar al usuario a un chat entre los 2 usuarios
    client.join(uid);

    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', (payload) => {
        console.log(payload);
        //Emitir mensaje a un canal
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
