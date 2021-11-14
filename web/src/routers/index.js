import { createRouter, createWebHistory } from "vue-router";

import Login from '../components/view/common/login/Login.vue'
import DashBoard from '../components/view/admin/dashboard/Dashboard.vue'
import Statistics from '../components/view/admin/statistics/Statistics'
import Products from '../components/view/admin/product/Products.vue'
import AddProduct from '../components/view/admin/product/AddProduct.vue'
import ProductInfo from '../components/view/admin/product/ProductInfo.vue'
import Staffs from '../components/view/admin/staff/Staffs.vue'
import AddStaff from '../components/view/admin/staff/AddStaff.vue'
import StaffInfo from '../components/view/admin/staff/StaffInfo.vue'
import Stores from '../components/view/admin/store/Stores.vue'
import StoreInfo from '../components/view/admin/store/StoreInfo'
import Categories from '../components/view/admin/category/Categories.vue'
import CategoryInfo from '../components/view/admin/category/CategoryInfo.vue'
import Profile from '../components/view/admin/profile/Profile.vue'
import ChangePassword from '../components/view/admin/profile/ChangePassword.vue'
import Error from '../components/view/admin/error/Error.vue'

const routes = [
  {path: '/login', component: Login, meta: {title: 'A&T Coffee | Đăng nhập'}},
  {path: '/admin', name: 'admin', component: DashBoard, meta: {title: 'A&T Coffee | Trang chủ'}},
  {path: '/admin/statistics', name: 'statistics', component: Statistics, meta: {title: 'A&T Coffee | Thống kê'}},
  {path: '/admin/products', name: 'products', component: Products, meta: {title: 'A&T Coffee | Danh sách sản phẩm'}},
  {path: '/admin/add-product', name: 'add-product', component: AddProduct, meta: {title: 'A&T Coffee | Thêm sản phẩm'}},
  {path: '/admin/product-info', name: 'product-info', component: ProductInfo, meta: {title: 'A&T Coffee | Thông tin sản phẩm'}},
  {path: '/admin/edit-product', name: 'edit-product', component: AddProduct, meta: {title: 'A&T Coffee | Chỉnh sửa sản phẩm'}},
  {path: '/admin/staffs', name: 'staffs', component: Staffs, meta: {title: 'A&T Coffee | Danh sách nhân viên'}},
  {path: '/admin/add-staff', name: 'add-staff', component: AddStaff, meta: {title: 'A&T Coffee | Thêm nhân viên'}},
  {path: '/admin/edit-staff', name: 'edit-staff', component: AddStaff, meta: {title: 'A&T Coffee | Chỉnh sửa nhân viên'}},
  {path: '/admin/staff-info', name: 'staff-info', component: StaffInfo, meta: {title: 'A&T Coffee | Thông tin nhân viên'}},
  {path: '/admin/stores', name: 'stores', component: Stores, meta: {title: 'A&T Coffee | Danh sách cửa hàng'}},
  {path: '/admin/store-info', name: 'store-info', component: StoreInfo, meta: {title: 'A&T Coffee | Thông tin cửa hàng'}},
  {path: '/admin/categories', name: 'categories', component: Categories, meta: {title: 'A&T Coffee | Danh sách loại sản phẩm'}},
  {path: '/admin/category-info', name: 'category-info', component: CategoryInfo, meta: {title: 'A&T Coffee | Thông tin loại sản phẩm'}},
  {path: '/admin/profile', name: 'profile', component: Profile, meta: {title: 'A&T Coffee | Thông tin cá nhân'}},
  {path: '/admin/profile/change-password', name: 'change-password', component: ChangePassword, meta: {title: 'A&T Coffee | Đổi mật khẩu'}},
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