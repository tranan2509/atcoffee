<template>
  <div>
    <side-bar />
    <navbar />
  </div>
</template>

<script>
import SideBar from '../common/SideBar.vue';
import Navbar from '../common/Navbar.vue'
import * as Constants from '../../common/Constants';
import * as MutationsName from '../../common/MutationsName'

import {mapActions} from 'vuex'

export default {
  name: Constants.COMPONENT_NAME_DASHBOARD,

  components: {
    SideBar,
    Navbar
  },

  methods: {
    ...mapActions(['authenticated']),

    async isAuthenticated () {
      const isAuth = await this.authenticated();
      if (isAuth) {
        console.log(isAuth);
      } else {
        this.$router.push({path: '/login'})
      }
    }
  },

  created() {
    this.isAuthenticated();
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.dashboard.value = true;
    this.$store.getters.menu.dashboard.submenu.general = true;
  }
};
</script>

<style>

</style>
