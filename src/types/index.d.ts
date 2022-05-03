import Vue from "vue";
export declare type ToastOptionsType = {
    deep?: 0 | 1 | 2 | 3
    close?: boolean
    showCount?: number,
    position?: 'ct' | 'rt' | 'lt' | 'cb' | 'lb' | 'rb',
    type?: 'success' | 'info' | 'warn' | 'error',
    duration?: number
    colors?: ColorsType
}
export declare type ColorsType = {
    [key: string]: string
}
export declare type ToastType = {
    show: (message: string, options: ToastOptionsType) => void;
    success: (message: string, options: ToastOptionsType) => void;
    info: (message: string, options: ToastOptionsType) => void;
    warn: (message: string, options: ToastOptionsType) => void;
    error: (message: string, options: ToastOptionsType) => void;
}


export declare function simpToast(app: typeof Vue, options: ToastOptionsType): void


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

declare module "simp-toast"