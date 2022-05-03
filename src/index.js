import toast from './toast.vue'
import { deepClone } from "./utils";
const deeps = [0, 1, 2, 3]
const positions = ['ct', 'rt', 'lt', 'cb', 'lb', 'rb']
const types = ['info', 'success', 'warn', 'error']
let toastEl;
const mountToast = () => {
    toastEl = new toast({
        el: document.createElement('div')
    })
    document.body.appendChild(toastEl.$el)
}
export default function (app, globalOptions) {
    // 安装插件时初始化配置
    const _options = deepClone(checkOptions(globalOptions), {
        close: false,
        deep: 1,
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
    const toast = Object.create(null)
    // 新增show方法
    toast.show = (message, options) => {
        const opt = Object.assign({}, _options, checkOptions(options))
        if (!message) return;
        toastEl.addMessage(message, opt)
    }
    // 新增info,error,success,warn
    for (const type of types) {
        (toast)[type] = (message, options = {}) => {
            options.type = type;
            toast.show(message, options)
        }
    }
    // 将toast对象放到vue原型上
    app.prototype.$toast = toast;
}
// 用户配置校验
const checkOptions = (options = {}) => {
    if (typeof options.close !== 'boolean') delete options.close
    if (typeof options.showCount !== 'number' || options.showCount < 0) delete options.showCount
    if (!deeps.includes(options.deep)) delete options.deep
    if (!positions.includes(options.position)) delete options.position
    if (!types.includes(options.type)) delete options.type
    if (typeof duration === 'number') delete options.duration
    return options;
}

