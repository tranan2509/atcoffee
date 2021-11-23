<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Cửa hàng</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link :to="linkBackStores">Danh sách cửa hàng</router-link>
        </div>
        <div class="breadcrumb-item">
          Thông tin cửa hàng
        </div>
      </section-header>
      <div class="section-body">
        <basic-store-info :store="store" @handleEdit="handleEdit" @handleLock="handleLock" v-if="!isEdit"></basic-store-info>
        <action-store v-if="isEdit" @handleCancel="handleCancel" @handleDone="handleDone"></action-store>
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../../common/Constants'
import * as MutationsName from '../../../common/MutationsName'
import StoreCommand from '../../../command/StoreCommand'
import Admin from '../main/Admin.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'
import BasicStoreInfo from '../common/BasicStoreInfo.vue'
import ActionStore from '../common/ActionStore.vue'

export default {
  name: Constants.COMPONENT_NAME_STAFF_INFO,

  components: {
    Admin,
    SectionHeader,
    BasicStoreInfo,
    ActionStore
  },

  data() {
    return {
      title: 'Thông tin cửa hàng',
      store: {},
      storeId: 0,
      isEdit: false
    }
  },

  computed: {
    linkBackStores() {
      return `/admin/stores?page=${this.$store.getters.sortStore.page}`;
    }
  },

  methods: {

    init() {
      this.storeId = this.$route.query.id;
      if (typeof this.storeId == 'undefined') {
        this.storeId = -1;
      }
    },

    handleEdit() {
      this.isEdit = true;
    },

    async handleLock(isLock) {
      let result = await StoreCommand.findOne(this.storeId);
      result['state'] = !isLock;
      this.formData = new FormData();
      this.formData.append('store', JSON.stringify(result));
      await StoreCommand.save(this.formData);
      let query = {};
      query.page = this.$store.getters.sortStore.page;
      this.$router.push({path: '/admin/stores', query: query});
    },

    async handleDone() {
      this.isEdit = false;
      await this.getStoreById(this.storeId);
    },

    async handleCancel() {
      this.isEdit = false;
      await this.getStoreById(this.storeId);
    },

    async getStoreById(id) {
      this.store = await StoreCommand.findOne(id);
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.store.value = true;
    this.init();
    this.getStoreById(this.storeId);
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

.fas.fa-info-circle {
  cursor: pointer;
}
</style>