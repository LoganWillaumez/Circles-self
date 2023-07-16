import adapter from '@sveltejs/adapter-auto';
import { Server } from 'socket.io'
import preprocess from 'svelte-preprocess';


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
  preprocess: preprocess(),
  kit: {
    adapter: adapter()
  },
  vitePlugins: [webSocketServer],
  // vitePlugins: [webSocketServer],
};

export default config;
