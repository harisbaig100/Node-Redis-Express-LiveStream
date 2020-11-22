import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000', {
  autoConnect: false
})

const subscribeEvent = (cb) => {
  socket.on('message', ({ message }) => {
    cb(JSON.parse(message));
  });
}

const startListening = () => {
  console.log('start');
  socket.open();
}

const stopListening = () => {
  console.log('stop');
  socket.close();
}

export {subscribeEvent, startListening, stopListening};
