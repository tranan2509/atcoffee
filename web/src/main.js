import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import store from './store'
// import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import vClickOutside from 'click-outside-vue3'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
// app.use(BootstrapIconsPlugin);
app.use(router).use(store);
app.use(vClickOutside);
app.mount('#app')