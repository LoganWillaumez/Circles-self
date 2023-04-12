import {get, writable} from 'svelte/store';
import {browser} from '$app/environment';

const getInitialTheme = () => {
  if (browser) {
    const themeFromStorage = localStorage.getItem('theme');
    return (
      themeFromStorage ||
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    );
  } else {
    return 'light';
  }
};

const theme = writable(getInitialTheme());

const setTheme = (value: 'dark' | 'light') => {
  theme.set(value);
  localStorage.setItem('theme', value);
};

export {theme, setTheme};
