module.exports = (socket) => {
  console.log( `S'ha connectat un client amb id ${socket.id}` );

  socket.on( 'chat-message', ( message ) => {
    console.log(message);
    socket.broadcast.emit('received-message', message) //Per emetre el missatge a tots els altres sockets excepte ell mateix.
  } );
};