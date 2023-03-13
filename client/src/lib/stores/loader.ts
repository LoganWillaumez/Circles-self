import { writable } from "svelte/store";

const initialLoader = {
    showLoader: false,
    popUp: {
        message: '',
        button: '',
        middleButton: '',
        type: '',
        onMiddle: (() => undefined),
        onClose: (() => undefined),
        onConfirm: (() => undefined)
    }
}

export const loader = writable(initialLoader);


export const setLoader = (showLoader: boolean, popUp? : {message: string, type: string, button?: string, middleButton?:string, onClose?:  (() => undefined), onConfirm?: (() => undefined), onMiddle?: (() => undefined)}): void => {
    resetLoader();
    loader.set({
        showLoader,
        popUp: {
            message: popUp?.message ?? '',
            type: popUp?.type ?? '',
            middleButton: popUp?.middleButton ?? '',
            button: popUp?.button ?? '',
            onMiddle: popUp?.onMiddle ?? (() => undefined),
            onClose: popUp?.onClose ?? (() => undefined),
            onConfirm: popUp?.onConfirm ?? (() => undefined)
        }
    });
}

export const resetLoader = (): void => {
    loader.set(initialLoader);
}