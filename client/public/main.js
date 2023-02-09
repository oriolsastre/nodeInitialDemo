const socket = io.connect(`http://localhost:3000`)

socket.on('connect', () => {
  console.log(`Tinc l'id ${socket.id} i m'he connectat`);
})

socket.on('received-credentials', (credentials) => {
  console.log(`M'he volgut registrar amb ${credentials}`);
})
