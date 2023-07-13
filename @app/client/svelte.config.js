import adapter from '@sveltejs/adapter-auto';
import {vitePreprocess} from '@sveltejs/kit/vite';
import { Server } from 'socket.io'


const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

      io.on('connection', (socket) => {
        socket.on('socketClient', (message) => {
          socket.emit('eventFromServer', message);
        });
      })

  },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
  vitePlugins: [webSocketServer],
  // vitePlugins: [webSocketServer],
};

export default config;
