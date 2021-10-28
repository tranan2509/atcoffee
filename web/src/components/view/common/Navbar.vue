<template>
  <div class="navbar-bg"></div>  
  <nav class="navbar navbar-expand-lg main-navbar">
    <ul class="navbar-nav navbar-right">
      <li class="dropdown" v-click-outside="handleHide">
        <router-link to="" class="nav-link dropdown-toggle nav-link-lg nav-link-user" data-toggle="dropdown" aria-expanded="false" @click="handleShow(navbar)">
          <img src="../../../assets/avatar-3.png" alt="avatar" class="rounded-circle mr-1">
          <div class="d-sm-none d-lg-inline-block">
            Trần Văn Ân
          </div>
        </router-link>
        <div class="dropdown-menu dropdown-menu-right" :class="navbar.dropdown ? 'show' : ''">
          <div class="dropdown-title">Thông tin</div>
            <router-link to="/admin" class="dropdown-item has-icon">
              <i class="far fa-user"></i> Hồ sơ
            </router-link>
            <router-link to="/admin" class="dropdown-item has-icon">
              <i class="fas fa-bolt"></i> Hoạt động
            </router-link>
            <router-link to="/admin" class="dropdown-item has-icon">
              <i class="fas fa-cog"></i> Cài đặt
            </router-link>  
            <div class="dropdown-divider"></div>
            <router-link to="/login" class="dropdown-item has-icon text-danger" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i> Đăng xuất
            </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import * as Constants from '../../common/Constants'
import vClickOutside from 'click-outside-vue3'

export default {
  name: Constants.COMPONENT_NAME_NAVBAR,

  data() {
    return {
      navbar: {
        dropdown: false
      }
    }
  },

  directives: {
      clickOutside: vClickOutside.directive
  },

  methods: {

    handleShow(navbar) {
      navbar.dropdown = !navbar.dropdown;
    },

    handleHide() {
      this.navbar.dropdown = false;
    },

    handleLogout() {
      localStorage.clear();
      this.$store.dispatch('logout');
      this.$router.push({path: '/login'});
    },
  }
}
</script>

<style scoped>

ul {
  list-style-type: none;
}

.navbar-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-left: 250px;
  width: calc(100vw - 250px);
  height: 115px;
  background: var(--primary);
  z-index: 0;
}

.navbar {
  position: absolute;
  transition: all .5s;
  align-items: center;
  height: 70px;
  right: 5px;
  top: 5px;
  z-index: 890;
  background: transparent;
  display: flex;
  padding: 0.5rem 1rem;
}

.navbar-expand-lg {
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.navbar-expand-lg .navbar-nav{
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.navbar .nav-link {
  display: block;
  padding-left: 15px !important;
  padding-right: 15px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  height: 100%;
}

.dropdown-toggle {
  white-space: nowrap;
}

.dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255rem;
  content: "";
  border-top: 0.3rem solid;
  border-right: 0.3rem solid transparent;
  border-bottom: 0;
  border-left: 0.3rem solid transparent;
}

.navbar .nav-link.nav-link-user {
  color: #fff;
  font-weight: 600;
}

.navbar .nav-link.nav-link-user img {
  width: 30px;
}

.mr-1 {
  margin-right: 0.25rem !important;
}

.navbar .navbar-link.nav-link-lg {
  margin-top: 3px;
}

.d-lg-inline-block {
  display: inline-block !important;
}

.navbar-expand-lg .navbar-nav .dropdown-menu {
  position: absolute;
  float:none;
  box-shadow: 0 10px 40px 0 rgba(51, 73, 94, 0.15);
  border: none;
  width: 200px;
  top: 100%;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: all 0.3s;
}

.dropdown-menu.show {
  display: block !important;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}

.dropdown-menu .dropdown-title{
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1.5px;
  font-weight: 700;
  color: #191d21 !important;
  padding: 10px 20px;
  line-height: 20px;
}

.dropdown-menu a {
  font-size: 13px;
  text-decoration: none;
}

.dropdown-item {
  display: block;
  width: 100%;
  clear: both;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background: transparent;
  border: 0;
}

a.dropdown-item {
  padding: 10px 20px;
  font-weight: 500;
  line-height: 1.2;
}

.dropdown-item.has-icon i {
  margin-top: -1px;
  font-size: 13px;
  text-align: center;
  width: 15px;
  float: left;
  margin-right: 10px;
}

</style>