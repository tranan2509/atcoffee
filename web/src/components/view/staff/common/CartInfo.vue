<template> 
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header">
          <h4>Danh sách sản phẩm</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col">
              <cart-popup-item v-for="(cart, index) in $store.getters.carts" :key="index"
                :cart="cart"
              ></cart-popup-item>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h4>Thông tin thanh toán</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 col">
              <div class="row-custom">
                <span>Tổng tiền tạm tính</span>
                <span>{{formatPrice(amount)}}</span>
              </div>
              <div class="row-custom">
                <span>Giảm giá</span>
                <span>{{formatPrice(discount)}}</span>
              </div>
              <div class="row-custom">
                <span>Tổng tiền</span>
                <span>{{formatPrice(amount - discount)}}</span>
              </div>
              <div class="row-custom">
                <span>Mã giảm giá</span>
                <input type="text" class="form-control" v-model="promotion" @input="handleChangePromotion">
              </div>
              <div class="row-custom">
                <span>Sử dụng điểm</span>
                <div class="row-custom-2">
                  <span>{{user != null ? user.currentPoints : 0}}</span>
                  <input type="checkbox" v-model="isUsePoint">
                </div>
              </div>
              <div class="row-custom">
                <span>Phương thức thanh toán</span>
                <select v-model="payment" class="form-control">
                  <option v-for="item in payments" :value="item.code" :key="item.code">{{item.name}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'
import PaymentCommand from '../../../command/PaymentCommand'
import CartPopupItem from './CartPopupItem.vue'

export default {
  name: Constants.COMPONENT_NAME_CART_INFO_STAFF,

  props: ['user'],

  components: {
    CartPopupItem
  },

  data() {
    return {
      payments: [],
      payment: 'CASH',
      isUsePoint: false,
      promotion: '',
      discount: 0
    }
  },

  computed: {

    amount() {
      var total = 0;
      this.$store.getters.carts.forEach(cart => {
        total += cart.amount;
      });
      return total;
    },
  },

  methods: {

    handleChangePromotion() {
      this.promotion = this.promotion.toUpperCase();
    },

    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
    },

    async loadPayments() {
      this.payments = await PaymentCommand.findAll();
    }
  },

  created() {
    this.loadPayments();
  }
}
</script>

<style scoped>
.row-custom {
  display: flex;
  padding: 4px 0;
}

.row-custom span:nth-child(1) {
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  color: #6a6a6a;
  display: inline-block;
  display: flex;
  align-items: center;
}

.row-custom span:nth-child(2) {
  font-size: 16px;
}

.row-custom input {
  text-align: right;
  padding: 2px 4px !important;
  max-width: 150px !important;
  flex: 1;
}

.row-custom select{
  text-align: right;
  padding: 2px 4px !important;
  max-width: 150px !important;
}

.row-custom-2 {
  display: flex;
}

.row-custom-2 span {
  font-size: 16px;
  margin-right: 8px;
  font-weight: 500 !important;
}

.row-custom-2 input[type="checkbox"] {
  width: 24px;
  height: 24px;
  border: 0.5px solid #444 !important;
  border-radius: 50%;
}
</style>