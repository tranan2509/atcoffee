<template>
  <div class="col-custom">
    <div class="card card-product-1" @click="handleShowSelect">
      <div class="card-check">
        <input type="checkbox"/>
      </div>
      <div class="card-icon">
        <img :src="'https://res.cloudinary.com/tranan2509/image/upload/v1635663070/bigz85fkvyomeq2tcnr0.jpg'"/>
      </div>
      <div class="card-wrap">
        <div class="card-header">
          <h4>Name name name name</h4>
        </div>
        <div class="card-body flex">
          <!-- {{formatPrice(product.sizes[0].price)}} -->
          <span>25.000d</span> &emsp;
          <span> x2</span> &emsp;
          <span> M</span>
          <span class="flex-1 text-right"> 50.000d</span>
        </div>
      </div>
    </div>
    <select-popup :isSelectPopup="isSelectPopup" :quantity="quantity" :size="size" class="select-popup-item"
    @handleHide="handleHideSelect" @handleChange="handleChangeQuantity" @handleChangeSize="handleChangeSize" @handleSubmit="handleSubmit"></select-popup>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'
import SelectPopup from '../popup/SelectPopup.vue'

export default {
  name: Constants.COMPONENT_NAME_CART_POPUP_ITEM,

  props: ['cart'],

  components: {
    SelectPopup
  },

  data(){
    return {
      isSelectPopup: false,
      quantity: 1,
      size: 'S'
    }
  },

  methods: {

    handleHideSelect() {
      this.isSelectPopup = false;
      this.quantity = 1;
      this.size = 'S';
    },

    handleShowSelect() {
      this.isSelectPopup = true;
    },

    handleChangeQuantity(quantity) {
      this.quantity = quantity;
    },

    handleChangeSize(size) {
      this.size = size;
    },

    handleSubmit() {
      //TODO: submit quantity to bill
      this.handleHideSelect();
    },

    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
    },

    processPrice(price) {
      return `<span class="decoration-line">${this.formatPrice(price)}</span>`
    }
  }
}
</script>

<style scoped>
.col-custom {
  position: relative;
  cursor: pointer;
  /* max-width: auto; */
  min-width: 280px;
}

.card.card-product-1 {
  display: inline-block;
  width: 100%;
}

.card.card-product-1 .card-check {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 24px;
  margin-left: 4px;
}

.card.card-product-1 .card-icon{
  width: 40px;
  height: 40px;
  margin: 4px;
  border-radius: 3px;
  text-align: center;
  float: left;
  margin-right: 15px;
}

.card.card-product-1 .card-icon img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px;
  margin-left: 0px;
}

.card.card-product-1 .card-header {
  border-color: transparent;
  height: auto;
  min-height: auto;
  display: block;
  padding-top: 4px;
  padding-bottom: 4px;
}

.card.card-product-1 .card-header h4 {
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .5px;
  line-height: 1.2;
  color: #37A372;
}

.card.card-product-1 .card-body {
  font-weight: 700;
  color: #34395e;
  padding-bottom: 0px;
  padding-top: 0px;
  font-size: 14px;
}

.card.card-product-1 .card-body.flex {
  display: flex !important;
  justify-content: left;
  padding: 0;
}

.card.card-product-1 .card-body.flex .decoration-line{
  text-decoration: line-through;
  color: lightcoral;
  margin-right: 8px;
}

#triangle-right {
  position: absolute;
  top: 0px;
  right: 0px;
	width: 0;
  height: 0;
  border-top-right-radius: .25rem;
  border-top: 40px solid orange;
  border-left: 40px solid transparent;
}

#triangle-right span {
  position: absolute;
  font-size: 14px;
  top: -36px;
  right: 0px;
  color: #fff;
  transform: rotateZ(45deg);
}

.select-popup-item {
  position: absolute;
  top: -20px;
  right: 40px;
}

.flex-1 {
  flex: 1 !important;
}

.text-right {
  text-align: right;
  padding-right: 20px;
}
</style>