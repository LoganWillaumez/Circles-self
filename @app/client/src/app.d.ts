// See https://kit.svelte.dev/docs/types#app

import type { CustomerDatas } from "@circles-self/circles/interfaces";

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: CustomerDatas | null; // Your type here
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageData {
      flash?: { type: 'success' | 'error'; message: string };
    }
    // interface Platform {}
  }
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}

type Theme = 'system' | 'light' | 'dark';

export {};