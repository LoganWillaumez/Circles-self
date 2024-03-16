import {writable} from 'svelte/store';

const initialLoader = {
  showLoader: false,
  popUp: {
    message: '',
    button: '',
    middleButton: '',
    type: '',
    verticalMiddle: false,
    onMiddle: () => {},
    onClose: () => {},
    onConfirm: () => {}
  }
};

export const loader = writable(initialLoader);

export const setLoader = (
  showLoader: boolean,
  popUp?: {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    button?: string;
    middleButton?: string;
    verticalMiddle?: boolean;
    onClose?: () => void | Promise<void> | undefined;
    onConfirm?: () => void | Promise<void> | undefined;
    onMiddle?: () => void | Promise<void> | undefined;
  }
): void => {
  resetLoader();
  loader.set({
    showLoader,
    popUp: {
      message: popUp?.message ?? '',
      type: popUp?.type ?? '',
      middleButton: popUp?.middleButton ?? '',
      verticalMiddle: popUp?.verticalMiddle ?? false,
      button: popUp?.button ?? '',
      onMiddle: popUp?.onMiddle ?? (() => undefined),
      onClose: popUp?.onClose ?? (() => undefined),
      onConfirm: popUp?.onConfirm ?? (() => undefined)
    }
  });
};

export const resetLoader = (): void => {
  loader.set(initialLoader);
};
