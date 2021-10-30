<template>
  <admin>

  </admin>
</template>

<script>
import Admin from '../admin/Admin.vue'
import * as Constants from '../../common/Constants';
import * as MutationsName from '../../common/MutationsName'

export default {
  name: Constants.COMPONENT_NAME_DASHBOARD,

  components: {
    Admin
  },

  methods: {
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.dashboard.value = true;
    this.$store.getters.menu.dashboard.submenu.general = true;
  }
};
</script>

<style>

</style>
