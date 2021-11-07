<template>
  <admin>
    <section-header :title="title">
      <div class="breadcrumb-item active">
        <router-link to="/admin">Trang chủ</router-link>
      </div>
      <div class="breadcrumb-item active">
        <router-link to="">Sản phẩm</router-link>
      </div>
      <div class="breadcrumb-item active" v-if="this.$route.path.toString().includes('edit-product')">
        <router-link :to="linkBackProducts">Danh sách sản phẩm</router-link>
      </div>
      <div class="breadcrumb-item">
        {{title}}
      </div>
    </section-header>
    <div class="section-body">
      <action-product/>
    </div>
  </admin>
</template>

<script>
import * as Constants from '../../common/Constants'
import * as MutationsName from '../../common/MutationsName'
import Admin from '../admin/Admin.vue'
import SectionHeader from '../common/SectionHeader.vue'
import ActionProduct from '../common/ActionProduct.vue'

export default {
  name: Constants.COMPONENT_NAME_ADD_PRODUCT,

  data(){
    return {
      title: 'Thêm sản phẩm',
    }
  },

  components: {
    Admin,
    SectionHeader,
    ActionProduct
  },

  computed: {
    linkBackProducts(){
      var sortProduct = this.$store.getters.sortProduct;
      var urlStore = '', urlCategory = '', urlKeyword = '';
      if (sortProduct.store != '') {
        urlStore += '&store=' + sortProduct.store;
      }
      if (sortProduct.category != '') {
        urlCategory += '&category=' + sortProduct.category;
      }
      if (sortProduct.keyword != '') {
        urlKeyword += '&keyword=' + sortProduct.keyword;
      }
      return `/admin/products?page=${this.$store.getters.sortProduct.page + urlStore + urlCategory + urlKeyword}`;
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    const currentPath = this.$route.path;
    if (currentPath.indexOf('add-product') > 0){
      this.$store.getters.menu.product.submenu.add_product = true;
    } else if (currentPath.indexOf('edit-product') > 0) {
      this.title = 'Chỉnh sửa sản phẩm';
      this.$store.getters.menu.product.submenu.products = true;
    }
    this.$store.getters.menu.product.value = true;

  }
}
</script>

<style>
</style>