<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Danh sách phần thưởng</h4>
          <div class="card-header-form flex-row">
            <div class="empty-space"></div>
            <div class="form-group">
              <select v-model="stateSelected" class="form-custom" @change="handleChangeState">
                <option value="ALL">Tất cả các trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="expired">Đã hết hạn</option>
                <option value="upcoming">Sắp tới</option>
              </select>
            </div>
            <div class="empty-space"></div>
            <div class="form-group">
              <select v-model="objectSelected" class="form-custom" @change="handleChangeObject">
                <option value="ALL">Tất cả các đối tượng</option>
                <option v-for="type in $store.getters.types" :key="type.code" :value="type.code">{{type.name}}</option>
              </select>
            </div>
            <div class="empty-space"></div>
            <form @submit.prevent="handleSearch">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm" v-model="keyword">
                <div class="input-group-btn">
                  <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                </div>
              </div>
            </form>
            <div class="empty-space"></div>
            <button class="btn btn-success btn-medium" @click.capture="handleAdd">Thêm</button>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th class="text-center">SST</th>
                  <th class="text-center">Tên</th>
                  <th class="text-center">Số điểm</th>
                  <th class="text-center">Mức giảm</th>
                  <th class="text-center">Chi tiết</th>
                </tr>
                <tr v-for="(reward, index) in this.$store.getters.rewards" :key="reward.id">
                  <td class="text-center">{{number(index)}}</td>
                  <td class="text-center">{{reward.name}}</td>
                  <td class="text-center">{{reward.proviso}}</td>
                  <td class="text-center">{{reward.redution}}</td>
                  <td class="text-center"><i class="fas fa-info-circle" @click="handleInfo(reward.id)"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-right" v-if="this.$store.getters.sortPromotion.totalPage > 0">
          <pagination :currentPage="currentPage" @handleChange="handleChangePage" :totalPage="this.$store.getters.sortPromotion.totalPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'
import CommonUtils from '../../../common/CommonUtils'
import RewardCommand from '../../../command/RewardCommand'
import PromotionCommand from '../../../command/PromotionCommand'
import Pagination from '../../common/common/Pagination.vue'

export default {
  name: Constants.COMPONENT_NAME_TABLE_REWARDS,

  components: {
    Pagination
  },

  data() {
    return {
      promotions: [],
      currentPage: 1,
      stateSelected: 'ALL',
      objectSelected: '',
      keyword: ''
    }
  },

  methods: {

    init(){
      this.currentPage = this.$route.query.page;
      if (typeof this.currentPage == 'undefined') {
        this.currentPage = 1;
      }
      this.keyword = this.$route.query.keyword;
      if (typeof this.keyword == 'undefined') {
        this.keyword = '';
      }
      this.stateSelected = this.$route.query.state;
      if (typeof this.stateSelected == 'undefined') {
        this.stateSelected = 'ALL';
      }
      this.objectSelected = this.$route.query.object;
      if (typeof this.objectSelected == 'undefined') {
        this.objectSelected = 'ALL';
      }
    },

    number(index){
      return (this.currentPage - 1) * Constants.PAGE_SIZE_PROMOTION + index + 1;
    },

    formatDate(timeStamp) {
      return CommonUtils.formatDate(new Date(timeStamp));
    },

    formatPrice(price) {
      return CommonUtils.formatPrice(price);
    },

    handleInfo(id){
      this.$router.push({path: '/admin/promotion-info', query: {id}});
    },

    handleChangePage(page) {
      this.currentPage = page;
      const query = Object.assign({}, this.$route.query);
      this.$router.push({path: '/admin/promotions', query: {...query, page: this.currentPage}});
      this.loadPromotionsBySort(this.currentPage, Constants.PAGE_SIZE_PROMOTION);
    },

     handleSearch(){
      const query = Object.assign({}, this.$route.query);
      this.currentPage = 1;
      if (this.keyword.trim() == '') {
        delete query.keyword;
        this.$router.replace({ query });
      } else {
        this.$router.push({path: '/admin/promotions', query: {...query, page: this.currentPage, keyword: this.keyword}});
      }
      this.loadPromotionsBySort(this.currentPage, Constants.PAGE_SIZE_STAFF);
    },

    handleChangeState() {
      const query = Object.assign({}, this.$route.query);
      this.currentPage = 1;
      if (this.stateSelected == 'ALL') {
        delete query.state;
        this.$router.replace({ query });
      } else {
        this.$router.push({path: '/admin/promotions', query: {...query, page: this.currentPage, state: this.stateSelected}});
      }
      this.currentPage = 1;
      this.loadPromotionsBySort(this.currentPage, Constants.PAGE_SIZE_STAFF);
    }, 

    handleChangeObject() {
      const query = Object.assign({}, this.$route.query);
      this.currentPage = 1;
      if (this.objectSelected == 'ALL') {
        delete query.object;
        this.$router.replace({ query });
      } else {
        this.$router.push({path: '/admin/promotions', query: {...query, page: this.currentPage, object: this.stateSelected}});
      }
      this.currentPage = 1;
      this.loadPromotionsBySort(this.currentPage, Constants.PAGE_SIZE_STAFF);
    }, 

    handleAdd() {
      this.$emit('handleAdd');
    },

    processObject(object) {
      var type = this.$store.getters.types.find(item => item.code == object);
      return type.name;
    },

    async loadData() {
      await this.loadPromotionsBySort(this.currentPage, Constants.PAGE_SIZE_PROMOTION);
    },

    async loadPromotionsBySort(page, size) {
      var state = this.stateSelected == 'ALL' ? '' : this.stateSelected;
      var object = this.objectSelected == 'ALL' ? '' : this.objectSelected;
      var keyword = this.keyword;
      this.users = await PromotionCommand.findAllByOrder(page, size, state, object, keyword, this.$store);
    },
    
    async loadRewards(page, size) {
      console.log(page, size);
      let result = await RewardCommand.findAll(page, size,this.$store);
      this.promotions = result;
    }
  },

  created(){
    this.init();
    // this.loadData();
    this.loadRewards(1, 10);
  }
}
</script>

<style>

</style>