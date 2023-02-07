const { Models } = require('../database/initModels')
module.exports = (socket) => {
  console.log( `S'ha connectat un client amb id ${socket.id}` );

  socket.on( 'login-user', ( credentials ) => {
    console.log(credentials);
    socket.emit('received-credentials', credentials) //Per emetre el missatge a tots els altres sockets excepte ell mateix.
  });

  socket.on('checkUsername', async username => {
    const checkUsername = await Models.User.findOne({where: {name: username}})
    if(checkUsername !== null){socket.emit('username-exists', false)}
    else{socket.emit('username-exists', true)}
  });

  socket.on('register-user', (userData) => {
    
  });
};