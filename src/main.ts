import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import axios from "axios";
import Particles from 'particles.vue3';
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/css/iconfont/iconfont.css'
import * as echarts from 'echarts';//引入echarts
import 'highlight.js/styles/monokai-sublime.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus,{
    locale:zhCn
})
app.use(store)
app.use(router)
app.use(Particles)
app.mount('#app')
app.config.globalProperties.$axios = axios;
axios.defaults.withCredentials = true
app.config.globalProperties.$echarts = echarts;//全局使用


