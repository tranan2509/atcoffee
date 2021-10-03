import { createRouter, createWebHistory } from "vue-router";

import Login from '../components/view/Login/Login.vue'
import DashBoard from '../components/view/Dashboard/Dashboard.vue'
import Error from '../components/view/Error/Error.vue'

const routes = [
  {path: '/admin', name: 'admin', component: DashBoard, meta: {title: 'A&T Coffee | Trang chủ'}},
  {path: '/login', component: Login, meta: {title: 'A&T Coffee | Đăng nhập'}},
  {path: '/:pathMatch(.*)', component: Error, meta: {title: 'A&T Coffee | Lỗi'}},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  next()
});

export default router;