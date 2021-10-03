import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import store from './components/store'
// import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
// app.use(BootstrapIconsPlugin);
app.use(router);
app.use(store);
app.mount('#app')