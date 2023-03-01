import { writable } from "svelte/store";

const initialLoader = {
    showLoader: false,
    popUp: {
        message: '',
        button: '',
        type: '',
        onClose: (() => undefined),
        onConfirm: (() => undefined)
    }
}

export const loader = writable(initialLoader);


export const setLoader = (showLoader: boolean, popUp? : {message: string, type: string, button?: string, onClose?:  (() => undefined), onConfirm?: (() => undefined)}): void => {
    resetLoader();
    loader.set({
        showLoader,
        popUp: {
            message: popUp?.message ?? '',
            type: popUp?.type ?? '',
            button: popUp?.button ?? '',
            onClose: popUp?.onClose ?? (() => undefined),
            onConfirm: popUp?.onConfirm ?? (() => undefined)
        }
    });
}

export const resetLoader = (): void => {
    loader.set(initialLoader);
}