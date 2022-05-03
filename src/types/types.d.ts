export declare type ToastOptionsType = {
    deep?: 0 | 1 | 2 | 3
    close?: boolean
    showCount?: number,
    position?: 'ct' | 'rt' | 'lt' | 'cb' | 'lb' | 'rb',
    type?: 'success' | 'info' | 'warn' | 'error',
    duration?: number
    colors?: colorsType
}
export declare type colorsType = {
    [key: string]: string
}
export declare type ToastType = {
    show: (message: string, options: toastOptionsType) => void;
    success: (message: string, options: toastOptionsType) => void;
    info: (message: string, options: toastOptionsType) => void;
    warn: (message: string, options: toastOptionsType) => void;
    error: (message: string, options: toastOptionsType) => void;
}

export module toast {

}

declare module 'simp-toast' {

}
declare module 'vue/types/vue' {
    interface Vue {
        $toast: {
            show: (message: string, options?: ToastOptionsType) => string
            info: (message: string, options?: ToastOptionsType) => string
            success: (message: string, options?: ToastOptionsType) => string
            warn: (message: string, options?: ToastOptionsType) => string
            error: (message: string, options?: ToastOptionsType) => string
        }
    }
}