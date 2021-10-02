import { createRouter, createWebHistory } from "vue-router";

import Login from '../components/view/Login/Login.vue'
import DashBoard from '../components/view/Dashboard/Dashboard.vue'
import Error from '../components/view/Error/Error.vue'

const routes = [
  {path: '/', component: DashBoard},
  {path: '/login', component: Login},
  {path: '/:pathMatch(.*)', component: Error},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;