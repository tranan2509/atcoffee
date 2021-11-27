<template>
  <div class="row">
    <product-item v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'
import ProductCommand from '../../../command/ProductCommand'
import StoreCommand from '../../../command/StoreCommand'
import CategoryCommand from '../../../command/CategoryCommand'
import ProductItem from './ProductItem.vue'

export default {
  name: Constants.COMPONENT_NAME_PRODUCTS_ITEM,

  components: {
    ProductItem
  },

  data() {
    return {
      products: [],
      category: {},
      stroe: {},
      value: {
        countProducts: 0
      }
    }
  },

  methods: {

    async init() {
      var categoryId = this.$route.query.id;
      if (typeof categoryId == 'undefined') {
        categoryId = 1;
      }
      await this.loadCategoryById(categoryId);
      await this.countProductsByCategoryCode(this.category.code);
    },

    async loadData() {
      await this.loadStore(this.$store.getters.user.storeId);
      await this.loadProducts();
    },

    async loadCategoryById(id) {
      this.category = await CategoryCommand.findOne(id);
    },

    async countProductsByCategoryCode(categoryCode) {
      let result = await ProductCommand.countByCategoryCode(categoryCode);
      this.value.countProducts = result;
      return result;
    },

    async loadStore(id) {
      this.store = await StoreCommand.findOne(id);
    },

    async loadProducts() {
      this.products = await ProductCommand.findAllByOrder(1, 10000, this.store.code, '', '');
    }
  },

  created() {
    // this.init();
    this.loadData();
  }
}
</script>

<style>

</style>