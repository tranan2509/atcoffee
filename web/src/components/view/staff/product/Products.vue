<template>
  <staff>
    <section-header :title="title">
      <div class="breadcrumb-item active">
        <router-link to="/admin">Trang chủ</router-link>
      </div>
      <div class="breadcrumb-item active">
        <router-link to="">Sản phẩm</router-link>
      </div>
      <div class="breadcrumb-item">
        Danh sách sản phẩm
      </div>
    </section-header>
    <div class="section-body">
      <products-item></products-item>
    </div>
  </staff>
</template>

<script>
import * as Constants from '../../../common/Constants'
import Staff from '../main/Staff.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'
import ProductsItem from '../common/ProductsItem.vue'

export default {
  name: Constants.COMPONENT_NAME_PRODUCTS_STAFF,

  components: {
    Staff,
    SectionHeader,
    ProductsItem
  },

  data() {
    return {
      title: 'Danh sách sản phẩm '
    }
  }
}
</script>

<style>

</style>