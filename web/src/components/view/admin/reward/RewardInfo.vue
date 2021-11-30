<template>
  <admin>
    <section-header :title="title">
        <div class="breadcrumb-item active">
          <router-link to="/admin">Trang chủ</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link to="">Phần thưởng</router-link>
        </div>
        <div class="breadcrumb-item active">
          <router-link :to="linkBackRewards">Danh sách phần thưởng</router-link>
        </div>
        <div class="breadcrumb-item">
          Thông tin phần thưởng
        </div>
      </section-header>
      <div class="section-body">
        <basic-reward-info :reward="reward" @handleEdit="handleEdit" @handleLock="handleLock" v-if="!isEdit"></basic-reward-info>
        <action-reward v-if="isEdit" @handleCancel="handleCancel" @handleDone="handleDone"></action-reward>
      </div>
  </admin>
</template>

<script>
import * as Constants from '../../../common/Constants'
import * as MutationsName from '../../../common/MutationsName'
import RewardCommand from '../../../command/RewardCommand'
import Admin from '../main/Admin.vue'
import SectionHeader from '../../common/common/SectionHeader.vue'
import BasicRewardInfo from '../common/BasicRewardInfo.vue'
import ActionReward from '../common/ActionReward.vue'

export default {
  name: Constants.COMPONENT_NAME_REWARD_INFO,

  components: {
    Admin,
    SectionHeader,
    BasicRewardInfo,
    ActionReward
  },

  data() {
    return {
      title: 'Thông tin phần thưởng',
      reward: {},
      type: {},
      rewardId: 0,
      isEdit: false
    }
  },

  computed: {
    linkBackRewards() {
      var sortReward = this.$store.getters.sortReward;
      var urlKeyword = '';
      if (sortReward.keyword != '') {
        urlKeyword += '&keyword=' + sortReward.keyword;
      }
      return `/admin/rewards?page=${this.$store.getters.sortReward.page + urlKeyword}`;
    }
  },

  methods: {

    init() {
      this.rewardId = this.$route.query.id;
      if (typeof this.rewardId == 'undefined') {
        this.rewardId = -1;
      }
    },

    handleEdit() {
      this.isEdit = true;
    },

    async handleLock(isLock) {
      let result = await RewardCommand.findOne(this.rewardId);
      result['state'] = !isLock;
      await RewardCommand.update(result);
      let query = {};
      query.page = this.$store.getters.sortReward.page;
      if (this.$store.getters.sortReward.keyword != '') {
        query.keyword = this.$store.getters.sortReward.keyword;
      }
      this.$router.push({path: '/admin/rewards', query: query});
    },

    async handleDone() {
      this.isEdit = false;
      await this.getRewardById(this.rewardId);
    },

    async handleCancel() {
      this.isEdit = false;
      await this.getRewardById(this.rewardId);
    },

    async getRewardById(id) {
      this.reward = await RewardCommand.findOne(id);
    },
  },

  created() {
    this.$store.commit(MutationsName.MUTATION_NAME_RESET_MENU);
    this.$store.getters.menu.reward.value = true;
    this.init();
    this.getRewardById(this.rewardId);
  }
}
</script>

<style>

</style>