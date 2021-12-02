<template>
  <admin>
    <section-header :title="title">
      <div class="breadcrumb-item active">
        <router-link to="/admin">Trang chủ</router-link>
      </div>
      <div class="breadcrumb-item active">
        <router-link to="">Đơn hàng</router-link>
      </div>
      <div class="breadcrumb-item">
        Danh sách đơn hàng
      </div>
    </section-header>
    <div class="section-body">
      <table-order-statistics></table-order-statistics>
    </div>
  </admin>
</template>

<script>
import * as Constants from '../../../common/Constants'
import * as MutationsName from '../../../common/MutationsName'
import Admin from '../main/Admin.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'
import TableOrderStatistics from '../common/TableOrderStatistics.vue'

export default {
  name: Constants.COMPONENT_NAME_ORDER_STATISTICS,

  components: {
    Admin,
    SectionHeader,
    TableOrderStatistics
  },

  data() {
    return {
      title: 'Thống kê đơn hàng'
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.order_statistics.value = true;
  }
}
</script>

<style>

</style>