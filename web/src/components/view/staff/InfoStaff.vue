<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Nhân viên</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link :to="linkBackStaffs">Danh sách nhân viên</router-link>
        </div>
        <div class="breadcrumb-item">
          Thông tin nhân viên
        </div>
      </section-header>
      <div class="section-body">
        <personal-info :user="user" :type="type" @handleEdit="handleEdit" @handleLock="handleLock" v-if="!isEdit"></personal-info>
        <action-staff v-if="isEdit" @handleCancel="handleCancel" @handleDone="handleDone"></action-staff>
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../common/Constants'
import * as MutationsName from '../../common/MutationsName'
import Admin from '../admin/Admin.vue'
import SectionHeader from '../common/SectionHeader.vue'
import PersonalInfo from '../common/PersonalInfo.vue'
import UserCommand from '../../command/UserCommand'
import ActionStaff from '../common/ActionStaff.vue'

export default {
  name: Constants.COMPONENT_NAME_INFO_STAFF,

  components: {
    Admin,
    SectionHeader,
    PersonalInfo,
    ActionStaff
  },

  data() {
    return {
      title: 'Thông tin nhân viên',
      user: {},
      type: 'info',
      userId: 0,
      isEdit: false
    }
  },

  computed: {
    linkBackStaffs() {
      var sortUser = this.$store.getters.sortUser;
      var urlStore = '', urlRole = '', urlState = '', urlKeyword = '';
      if (sortUser.store != '') {
        urlStore += '&store=' + sortUser.store;
      }
      if (sortUser.role != '') {
        urlRole += '&role=' + sortUser.role;
      }
      if (sortUser.state != '') {
        if (sortUser.state) {
          sortUser.state = 'active'
        } else {
          sortUser.state = 'lock'
        }
        urlState += '&state=' + sortUser.state;
      }
      if (sortUser.keyword != '') {
        urlKeyword += '&keyword=' + sortUser.keyword;
      }
      return `/admin/staffs?page=${this.$store.getters.sortUser.page + urlStore + urlRole + urlState + urlKeyword}`;
    }
  },

  methods: {

    init() {
      this.userId = this.$route.query.id;
      if (typeof this.userId == 'undefined') {
        this.userId = -1;
      }
    },

    handleEdit() {
      this.isEdit = true;
    },

    async handleLock(isLock) {
      let result = await UserCommand.findOne(this.userId);
      result['state'] = !isLock;
      this.$router.push({path: '/admin/info-staff', query: {id: this.userId}});
      this.formData = new FormData();
      this.formData.append('user', JSON.stringify(result));
      await UserCommand.save(this.formData);
      await this.getUserById(this.userId);
    },

    async handleDone() {
      this.isEdit = false;
      await this.getUserById(this.userId);
    },

    async handleCancel() {
      this.isEdit = false;
      await this.getUserById(this.userId);
    },

    async getUserById(id) {
      this.user = await UserCommand.findOne(id);
    }
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.staff.value = true;
    this.$store.getters.menu.staff.submenu.staffs = true;
    this.init();
    this.getUserById(this.userId);
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