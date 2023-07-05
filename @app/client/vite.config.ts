import {sveltekit} from '@sveltejs/kit/vite';
import type {UserConfig} from 'vite';

import { Server } from 'socket.io'

const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server: any) {
    const io = new Server(server.httpServer)

      io.on('connection', (socket) => {
        socket.on('socketClient', (message) => {
          socket.emit('eventFromServer', message);
        });
      })

  },
}

const config: UserConfig = {
  plugins: [sveltekit(), webSocketServer],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;
