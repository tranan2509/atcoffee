<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Loại sản phẩm</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link :to="linkBackCategories">Danh sách loại sản phẩm</router-link>
        </div>
        <div class="breadcrumb-item">
          Thông tin loại sản phẩm
        </div>
      </section-header>
      <div class="section-body">
        <basic-category-info :category="category" @handleEdit="handleEdit" @handleLock="handleLock" v-if="!isEdit"></basic-category-info>
        <action-category v-if="isEdit" @handleCancel="handleCancel" @handleDone="handleDone"></action-category>
        <category-statistics/>
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../../common/Constants'
import * as MutationsName from '../../../common/MutationsName'
import CategoryCommand from '../../../command/CategoryCommand'
import Admin from '../main/Admin.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'
import BasicCategoryInfo from '../common/BasicCategoryInfo.vue'
import ActionCategory from '../common/ActionCategory.vue'
import CategoryStatistics from '../common/CategoryStatistics.vue'

export default {
  name: Constants.COMPONENT_NAME_STAFF_INFO,

  components: {
    Admin,
    SectionHeader,
    BasicCategoryInfo,
    ActionCategory,
    CategoryStatistics
  },

  data() {
    return {
      title: 'Thông tin loại sản phẩm',
      category: {},
      categoryId: 0,
      isEdit: false
    }
  },

  computed: {
    linkBackCategories() {
      return `/admin/categories?page=${this.$store.getters.sortCategory.page}`;
    }
  },

  methods: {

    init() {
      this.categoryId = this.$route.query.id;
      if (typeof this.categoryId == 'undefined') {
        this.categoryId = -1;
      }
    },

    handleEdit() {
      this.isEdit = true;
    },

    async handleLock(isLock) {
      let result = await CategoryCommand.findOne(this.categoryId);
      result['state'] = !isLock;
      this.formData = new FormData();
      this.formData.append('category', JSON.stringify(result));
      await CategoryCommand.save(this.formData);
      let query = {};
      query.page = this.$store.getters.sortCategory.page;
      this.$router.push({path: '/admin/categories', query: query});
    },

    async handleDone() {
      this.isEdit = false;
      await this.getCategoryById(this.categoryId);
    },

    async handleCancel() {
      this.isEdit = false;
      await this.getCategoryById(this.categoryId);
    },

    async getCategoryById(id) {
      this.category = await CategoryCommand.findOne(id);
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.category.value = true;
    this.init();
    this.getCategoryById(this.categoryId);
  }
}
</script>

<style>

</style>