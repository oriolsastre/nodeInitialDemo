module.exports = (socket) => {
  console.log( `S'ha connectat un client amb id ${socket.id}` );

  socket.on( 'login-user', ( credentials ) => {
    console.log(credentials);
    socket.emit('received-credentials', credentials) //Per emetre el missatge a tots els altres sockets excepte ell mateix.
  } );
};