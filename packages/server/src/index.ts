import { router } from './lib/server.js';
import { createServer } from 'http';

import './routes';
import { io } from './lib/socket.js';
import { App } from 'uWebSockets';

// Api
createServer(router).listen(3003, () => {
  console.log('Server listening at http://localhost:3003');
});


// Websocket
const wss = App();
io.attachApp(wss);

wss.listen(3004, () => {
  console.info(`WSS is listening on http://localhost:3004`);
});
