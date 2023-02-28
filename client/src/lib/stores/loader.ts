import { writable } from "svelte/store";

const initialLoader = {
    showLoader: false,
    popUp: {
        message: '',
        button: '',
        type: '',
        onClose: null,
        onConfirm: null
    }
}

export const loader = writable(initialLoader);


export const setLoader = (showLoader: boolean, popUp? : {message: string, type: string, button?: string, onClose?: any, onConfirm?: any}): void => {
    resetLoader();
    loader.set({
        showLoader,
        popUp: {
            message: popUp?.message ?? '',
            type: popUp?.type ?? '',
            button: popUp?.button ?? '',
            onClose: popUp?.onClose ?? null,
            onConfirm: popUp?.onConfirm ?? null
        }
    });
}

export const resetLoader = (): void => {
    loader.set(initialLoader);
}