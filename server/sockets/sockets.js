module.exports = (socket) => {
  console.log( socket.id );
  console.log( 'Cliente conectado' );

  socket.on( 'message', ( message, nickname ) => {
    // Envío al resto de clientes conectados
    socket.broadcast.emit( 'message', {
      body: message,
      from: nickname
    } );
  } );
};