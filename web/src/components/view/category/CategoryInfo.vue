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
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../common/Constants'
import * as MutationsName from '../../common/MutationsName'
import Admin from '../admin/Admin.vue'
import SectionHeader from '../common/SectionHeader.vue'
import BasicCategoryInfo from '../common/BasicCategoryInfo.vue'
import ActionCategory from '../common/ActionCategory.vue'
import CategoryCommand from '../../command/CategoryCommand'

export default {
  name: Constants.COMPONENT_NAME_STAFF_INFO,

  components: {
    Admin,
    SectionHeader,
    BasicCategoryInfo,
    ActionCategory
  },

  data() {
    return {
      title: 'Thông tin cửa hàng',
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
      console.log(isLock);
      //TODO: lock category
      // let result = await StoreCommand.findOne(this.categoryId);
      // result['state'] = !isLock;
      // this.$router.push({path: '/admin/staff-info', query: {id: this.categoryId}});
      // this.formData = new FormData();
      // this.formData.append('user', JSON.stringify(result));
      // await StoreCommand.save(this.formData);
      // await this.getCategoryById(this.categoryId);
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