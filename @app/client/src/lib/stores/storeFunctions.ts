import {get, type Writable} from 'svelte/store';
import {loader} from './loader';

export const setStoreValue = <T>(
  store: Writable<{[key: string]: T}>,
  key: string,
  value: T
): void => store.set({...get(store), [key]: value});

export const setSingleValueStore = (
  store: Writable<string>,
  value: string
): void => {
  store.set(value);
};

export const getStoreValue = <T>(
  store: Writable<{[key: string]: T}>,
  key: string
): T | undefined => get(store)[key];

export const updateStoreValue = <T>(
  store: Writable<{[key: string]: T}>,
  key: string,
  updater: (value: T) => T
): void =>
  store.update(values => {
    return {
      ...values,
      [key]: updater(values[key])
    };
  });
