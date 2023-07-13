import {sveltekit} from '@sveltejs/kit/vite';
import type {UserConfig} from 'vite';
import {webSocketServer} from './plugins/websocketPluginVite'

const config: UserConfig = {
  plugins: [sveltekit(), webSocketServer],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;
