import { ToastOptionsType, ToastType } from "./types/types";
import toast from '@/toast.vue'
import { deepClone } from "./utils";
const deeps = [0, 1, 2, 3]
const positions = ['ct', 'rt', 'lt', 'cb', 'lb', 'rb']
const types = ['info', 'success', 'warn', 'error']
let toastEl: any;
const mountToast = () => {
    toastEl = new (toast as any)({
        el: document.createElement('div')
    })
    document.body.appendChild(toastEl.$el)
}
export default function (app: any, globalOptions: ToastOptionsType) {
    // 安装插件时初始化配置
    const _options: ToastOptionsType = deepClone(checkOptions(globalOptions)!, {
        deep: 1,
        close: false,
        showCount: 5,
        position: 'ct',
        type: "info",
        duration: 3000,
        colors: {
            success: '#4CAF50',
            info: '#00BCD4',
            warn: '#FF9800',
            error: '#FF5722',
        }
    })
    // 挂载组件
    mountToast()
    toastEl.setColors(_options.colors)
    const toast: ToastType = Object.create(null)
    // 新增show方法
    toast.show = (message: string, options: ToastOptionsType) => {
        const opt = Object.assign({}, _options, checkOptions(options))
        if (!message) return;
        toastEl.addMessage(message, opt)
    }
    // 新增info,error,success,warn
    for (const type of types) {
        (toast as any)[type] = (message: string, options: ToastOptionsType = {}) => {
            options.type = type as any;
            toast.show(message, options)
        }
    }
    // 将toast对象放到vue原型上
    app.prototype.$toast = toast;
}
// 用户配置校验
const checkOptions = (options: ToastOptionsType) => {
    if (!options) return {};
    if (options.showCount! < 0) delete options.showCount
    if (!deeps.includes(options.deep!)) options.deep = 1
    if (!positions.includes(options.position!)) options.position = 'ct'
    return options || {};
}

