<template>
  <div>
    <side-bar />
    <navbar />
    <div class="section">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SideBar from '../common/SideBar.vue';
import Navbar from '../common/Navbar.vue'
import * as Constants from '../../common/Constants';
import LoginCommand from '../../command/LoginCommand'

export default {
  name: Constants.COMPONENT_NAME_DASHBOARD,

  components: {
    SideBar,
    Navbar
  },

  methods: {

    async authenticated () {
      const isAuth = await LoginCommand.authenticated(this.$store);
      if (isAuth != null) {
        console.log(isAuth);
      } else {
        this.$router.push({path: '/login'})
      }
    }
  },

  created(){
    this.authenticated();
  }
};
</script>

<style>

</style>
