<template>
  <admin>
    <section-header :title="title">
    </section-header>
    <dashboard-statistics></dashboard-statistics>
  </admin>
</template>

<script>
import Admin from '../main/Admin.vue'
import * as Constants from '../../../common/Constants';
import * as MutationsName from '../../../common/MutationsName'
import SectionHeader from '../../common/common/SectionHeader.vue'
import DashboardStatistics from '../common/DashboardStatistics.vue'

export default {
  name: Constants.COMPONENT_NAME_DASHBOARD,

  components: {
    Admin,
    SectionHeader,
    DashboardStatistics

  },

  data() {
    return {
      title: 'Trang chủ'
    }
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
