<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Danh sách đơn hàng</h4>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th class="text-center">SST</th>
                  <th class="text-center">Mã</th>
                  <th class="text-center">Tên</th>
                  <th class="text-center">Địa chỉ</th>
                  <th class="text-center">Thời gian mở cửa</th>
                  <th class="text-center">Thời gian đóng cửa</th>
                  <th class="text-center">Chi tiết</th>
                </tr>
                <tr v-for="(store) in this.$store.getters.stores" :key="store.id">
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"><i class="fas fa-info-circle"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-right" v-if="this.$store.getters.sortStore.totalPage > 0">
          <pagination :currentPage="currentPage" @handleChange="handleChangePage" :totalPage="this.$store.getters.sortStore.totalPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'
import Pagination from '../../common/common/Pagination.vue'

export default {
  name: Constants.COMPONENT_NAME_TABLE_ORDERS_STAFF,

  components: {
    Pagination
  },

  methods: {
    
    async loadBills() {
      
    }
  }
}
</script>

<style>

</style>