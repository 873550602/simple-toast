### 介绍

一个简单且具有一定扩展性的toast工具。

### 安装

```javascript
npm install simp-toast -S
// or
yarn add simp-toast
```

### 使用

```javascript
import Vue from 'vue'
import simpToast from 'simp-toast'

Vue.use(simpToast,options)
```

### API

```javascript
// 在组件中使用
this.$toast.show(message, options)
this.$toast.info(message, options)
this.$toast.error(message, options)
this.$toast.success(message, options)
this.$toast.warn(message, options)

// 关闭方法
const id = this.$toast.show(message,options)
this.$toast.close(id)
```

#### 配置

**options**
| 属性      | 说明                                             |
| --------- | ----------------------------------------------- |
| close     | 是否显示关闭按钮 类型 boolean                      |
| deep      | 表示阴影的值， 可选值 [0,1,2,3]                    |
| showCount | 同时可展示的数量 类型 number                       |
| position  | 位置 可选值 ['ct', 'rt', 'lt', 'cb', 'lb', 'rb'] |
| type      | 类型 可选值 ['info', 'success', 'warn', 'error'] |
| duration  | 时长 单位：ms 当值<0时，弹框不会自动关闭             |
| colors    | 颜色配置，默认{success:'#4CAF50', info: '#00BCD4',warn: '#FF9800',error:'#FF5722', }|                                  


            
           
            
       
