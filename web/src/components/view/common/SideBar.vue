<template>
  <div id="sidebar-wrapper">
    <div class="sidebar-brand">
      <a>A&#38;T Coffee</a>
      <!-- <a href="#"><img src="../../../assets/logo.png" alt="logo"></a> -->
    </div>
    <ul class="sidebar-menu">
      <li class="menu-header">DASHBOARD</li>
      <li class="nav-item dropdown" :class="menu.dashboard.value ? 'active' : ''">
        <router-link to="" class="nav-link has-dropdown" @click="handleDropdown(menu.dashboard)">
          <i class="fas fa-fire"></i>
          <span>Dashboard</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
        <ul class="dropdown-menu" :class="menu.dashboard.value ? 'visible' : ''">
          <li :class="menu.dashboard.submenu.general ? 'active': ''" @click="handleLink(menu.dashboard, 'general')">
            <router-link to="/admin" class="nav-link">General Dashboard</router-link>
          </li>
          <li :class="menu.dashboard.submenu.ecommerce ? 'active': ''" @click="handleLink(menu.dashboard, 'ecommerce')">
            <router-link to="/admin/statistics" class="nav-link">Ecommerce Dashboard</router-link>
          </li>
        </ul>
      </li>
      <li class="menu-header">STATER</li>
      <li class="nav-item dropdown" :class="menu.layout.value ? 'active' : ''">
        <router-link to="" class="nav-link has-dropdown" @click="handleDropdown(menu.layout)">
          <i class="fas fa-fire"></i>
          <span>Layout</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
        <ul class="dropdown-menu" :class="menu.layout.value ? 'visible' : ''">
          <li :class="menu.layout.submenu.default ? 'active': ''">
            <router-link to="/admin/statistics" class="nav-link">Default Layout</router-link>
          </li>
          <li :class="menu.layout.submenu.advance ? 'active': ''">
            <router-link to="#" class="nav-link">Advance Layout</router-link>
          </li>
        </ul>
      </li>
      <li class="menu-header">QUẢN LÝ</li>
      <li class="nav-item dropdown" :class="menu.product.value ? 'active' : ''">
        <router-link to="" class="nav-link has-dropdown" @click="handleDropdown(menu.product)">
          <i class="fas fa-coffee"></i>
          <span>Sản phẩm</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
        <ul class="dropdown-menu" :class="menu.product.value ? 'visible' : ''">
          <li :class="menu.product.submenu.products ? 'active': ''" @click="handleLink(menu.product, 'products')">
            <router-link to="/admin/products?page=1" class="nav-link" >Danh sách sản phẩm</router-link>
          </li>
          <li :class="menu.product.submenu.add_product ? 'active': ''" @click="handleLink(menu.product, 'add_product')">
            <router-link to="/admin/add-product" class="nav-link">Thêm sản phẩm</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown" :class="menu.staff.value ? 'active' : ''">  
        <router-link to="" class="nav-link has-dropdown" @click="handleDropdown(menu.staff)">
          <i class="fas fa-users"></i>
          <span>Nhân viên</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
        <ul class="dropdown-menu" :class="menu.staff.value ? 'visible' : ''">
          <li :class="menu.staff.submenu.staffs ? 'active': ''" @click="handleLink(menu.staff, 'staffs')">
            <router-link to="/admin/staffs?page=1" class="nav-link" >Danh sách nhân viên</router-link>
          </li>
          <li :class="menu.staff.submenu.add_staff ? 'active': ''" @click="handleLink(menu.staff, 'add_staff')">
            <router-link to="/admin/add-staff" class="nav-link">Thêm nhân viên</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown" :class="menu.store.value ? 'active' : ''">  
        <router-link to="/admin/stores?page=1" class="nav-link" @click="handleDropdown(menu.store)">
          <i class="fas fa-store"></i>
          <span>Cửa hàng</span>
        </router-link>
      </li>
      <li class="nav-item dropdown" :class="menu.category.value ? 'active' : ''">  
        <router-link to="/admin/categories?page=1" class="nav-link" @click="handleDropdown(menu.category)">
          <i class="fas fa-box-open"></i>
          <span>Loại sản phẩm</span>
        </router-link>
      </li>
      <li class="menu-header">HỒ SƠ</li>
      <li class="nav-item dropdown" :class="menu.profile.value ? 'active' : ''">
        <router-link to="" class="nav-link has-dropdown" @click="handleDropdown(menu.profile)">
          <i class="fas fa-user"></i>
          <span>Hồ sơ</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
        <ul class="dropdown-menu" :class="menu.profile.value ? 'visible' : ''">
          <li :class="menu.profile.submenu.profile ? 'active': ''" @click="handleLink(menu.profile, 'profile')">
            <router-link to="/admin/profile" class="nav-link" >Thông tin cá nhân</router-link>
          </li>
          <li :class="menu.profile.submenu.change_password ? 'active': ''" @click="handleLink(menu.profile, 'change_password')">
            <router-link to="/admin/profile/change-password" class="nav-link">Đổi mật khẩu</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import * as Constants from "../../common/Constants";
import {mapGetters} from 'vuex'

export default {
  name: Constants.COMPONENT_NAME_SIDE_BAR,

  computed: {
    ...mapGetters(['menu'])
  },

  methods: {

    handleDropdown(menuItem){
      if (menuItem.value){
        this.setFalseMenuItem(menuItem);
      } else {
        for (var key in this.menu) {
          this.setFalseMenuItem(this.menu[key]);
        }
        menuItem.value = true;
      }
    },

    handleLink(menuItem, keySubmenu) {
      this.setFalseSubmenu(menuItem.submenu);
      menuItem.submenu[keySubmenu] = true;
    },

    setFalseMenuItem(menuItem) {
      menuItem.value = false;
      this.setFalseSubmenu(menuItem.submenu);
    },

    setFalseSubmenu(submenu) {
      for (var key in submenu){
        submenu[key] = false;
      }
    }
  },

};
</script>

<style scoped>
#sidebar-wrapper {
  position: fixed;
  display: block;
  font-weight: 400;
  color: #6c757d;
  text-align: left;
  line-height: 21px;
  width: 250px;
  height: 100vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}

#sidebar-wrapper .sidebar-brand {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 250px;
}

#sidebar-wrapper .sidebar-brand a {
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
  color: #000;
}

#sidebar-wrapper ul {
  list-style-type: none;
}

#sidebar-wrapper .sidebar-menu {
  line-height: 28px;
  padding: 0;
  margin: 0;
}

#sidebar-wrapper .sidebar-menu .menu-header {
  font-size: 10px;
  color: #a1a8ae;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 600;
  padding: 3px 15px;
}

#sidebar-wrapper .sidebar-menu li.active a {
  color: var(--primary);
  background-color: #f8fafb;
  font-weight: 600;
}

#sidebar-wrapper .sidebar-menu li a {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  width: 100%;
  color: #78828a;
  letter-spacing: 0.3px;
  text-decoration: none;
}

#sidebar-wrapper .sidebar-menu .nav-link:hover {
  background: #f8fafb;
  cursor: pointer;
}

#sidebar-wrapper .sidebar-menu li.active a.has-dropdown .fa-chevron-right {
  transform: translate(0, -50%) rotate(90deg);
}

#sidebar-wrapper .sidebar-menu li a.has-dropdown .fa-chevron-right {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  font-size: 14px;
  transition: all 0.5s;
  margin: 0;
}

#sidebar-wrapper .sidebar-menu li a i {
  width: 28px;
  margin-right: 20px;
  text-align: center;
}

#sidebar-wrapper .sidebar-menu li a span {
  margin-top: 3px;
  width: 100%;
}

#sidebar-wrapper .sidebar-menu li.active ul.dropdown-menu {
  background-color: #f8fafb;
}

#sidebar-wrapper .sidebar-menu li ul.dropdown-menu {
  display: none;
  position: static;
  float: none;
  width: 100%;
  margin: 0;
  padding: 0;
  box-shadow: none;
  min-width: 10rem;
  transition: all .3s;
}

#sidebar-wrapper .sidebar-menu li ul.dropdown-menu.visible {
  display: block;
}

#sidebar-wrapper .sidebar-menu li ul.dropdown-menu.invisible {
  display: none;
}

#sidebar-wrapper .sidebar-menu li.active ul.dropdown-menu li.active > a {
  color: var(--primary);
  font-weight: 600;
}

#sidebar-wrapper .sidebar-menu li ul.dropdown-menu li a {
  color: #868e96;
  height: 35px;
  padding-left: 65px;
  font-weight: 400;
}

#sidebar-wrapper .sidebar-menu li ul.dropdown-menu li a:hover {
  color: var(--primary);
}

ul:not(.list-unstyled) {
  line-height: 28px;
}

.dropdown-menu {
  border: none;
}

.dropdown-menu a {
  font-size: 13px;
}

.fas {
  display: inline-block;
  font-size: 13px;
  font-weight: 900;
  margin-left: 4px;
}

/* a {
  -webkit-transition: all 0.5s ease;
} */

.fa-fire::before {
  content: "\f06d";
}
</style>
