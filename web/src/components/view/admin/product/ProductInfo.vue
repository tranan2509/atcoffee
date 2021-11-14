<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Sản phẩm</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link :to="linkBackProducts">Danh sách sản phẩm</router-link>
        </div>
        <div class="breadcrumb-item">
          Thông tin sản phẩm
        </div>
      </section-header>
      <div class="section-body">
        <basic-product-info :product="product" :type="type" @handleEdit="handleEdit" v-if="!isEdit"></basic-product-info>
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../../common/Constants'
import * as MutationsName from '../../../common/MutationsName'
import ProductCommand from '../../../command/ProductCommand'
import BasicProductInfo from '../common/BasicProductInfo.vue'
import Admin from '../main/Admin.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'

export default {
  name: Constants.COMPONENT_NAME_PRODUCT_INFO,

  components: {
    Admin,
    SectionHeader,
    BasicProductInfo
  },

  data() {
    return {
      title: 'Thông tin sản phẩm',
      product: {},
      type: 'info',
      productId: 0,
      isEdit: false
    }
  },

  computed: {
    linkBackProducts() {
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

  methods: {

    init() {
      this.productId = this.$route.query.id;
      if (typeof this.productId == 'undefined') {
        this.productId = -1;
      }
    },

    handleEdit() {
      this.isEdit = true;
    },

    async handleDone() {
      this.isEdit = false;
      await this.getProductById(this.productId);
    },

    async handleCancel() {
      this.isEdit = false;
      await this.getProductById(this.productId);
    },

    async getProductById(id) {
      this.product = await ProductCommand.findOne(id);
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.product.value = true;
    this.$store.getters.menu.product.submenu.products = true;
    this.init();
    this.getProductById(this.productId);
  }
}
</script>

<style>

.main-content {
  position: relative;
  background: #f4f6f9;
}

.section {
  position: absolute;
  top: 80px;
  width: calc(100vw - 60px - 250px);
  z-index: 1;
  margin-left: calc(30px + 250px);
  margin-right: 30px;
}

a {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  background: transparent;
}

a:hover {
  text-decoration: underline;
  color: var(--primary);
}
</style>