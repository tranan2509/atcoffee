<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Nhân viên</router-link>
        </div>
        <div class="breadcrumb-item">
          Danh sách nhân viên
        </div>
      </section-header>
      <div class="section-body">
        <table-stores @handleAdd="handleAdd"></table-stores>
      </div>
      <blank-popup :isBlankPopup="isBlankPopup">
        <action-store v-click-outside="handleHideBlank" @handleDone="handleDone"/>
      </blank-popup>
  </admin>
</template>

<script>
import * as Constants from '../../common/Constants'
import * as MutationsName from '../../common/MutationsName'
import StoreCommand from '../../command/StoreCommand'
import Admin from '../admin/Admin.vue'
import SectionHeader from '../common/SectionHeader.vue'
import TableStores from '../common/TableStores.vue'
import ActionStore from '../common/ActionStore.vue'
import BlankPopup from '../popup/BlankPopup.vue'
import vClickOutside from 'click-outside-vue3'

export default {
  name: Constants.COMPONENT_NAME_STORES,

  directives: {
      clickOutside: vClickOutside.directive
  },

  components: {
    Admin,
    SectionHeader,
    TableStores,
    ActionStore,
    BlankPopup
  },

  data() {
    return {
      title: 'Danh sách cửa hàng',
      isBlankPopup: false,
      flag: false
    }
  },

  methods: {
    
    handleHideBlank() {
      if (!this.flag) {
        this.isBlankPopup = false;
        this.flag = false;
      } else {
        if (this.isBlankPopup) {
          this.flag = false;
        }
      }
    },

    handleAdd() {
      this.flag = true;
      this.isBlankPopup = true;
    },

    async handleDone() {
      var currentPage = this.$route.query.page;
      if (typeof currentPage == 'undefined') {
        currentPage = 1;
      }
      await this.loadStores(currentPage, Constants.PAGE_SIZE_STORE);
      this.isBlankPopup = false;
    },

    async loadStores(page, size) {
      await StoreCommand.findAllByPagination(page, size, this.$store);
    },
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.store.value = true;
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