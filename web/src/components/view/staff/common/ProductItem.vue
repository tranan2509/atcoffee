<template>
  <div class="col-lg-2 col-md-6 col-sm-6 col-12 col-custom">
    <div class="card card-product-1">
      <div class="card-icon">
        <img :src="product.image"/>
      </div>
      <div class="card-wrap">
        <div class="card-header">
          <h4>{{product.name}}</h4>
        </div>
        <div class="card-body" v-if="product.discount == 0">
          {{formatPrice(product.sizes[0].price)}}
        </div>
        <div class="card-body flex" v-else>
          <div id="triangle-right">
              <span>{{product.discount}}%</span>
          </div>
          <span v-html="processPrice(product.sizes[0].price)"></span>
          {{formatPrice(product.sizes[0].price * (1 - product.discount / 100))}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Constants from '../../../common/Constants'

export default {
  name: Constants.COMPONENT_NAME_PRODUCTS_ITEM,

  props: ['product'],

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
    },

    processPrice(price) {
      return `<span class="decoration-line">${this.formatPrice(price)}</span>`
    }
  }
}
</script>

<style>
.col-lg-2.col-custom {
  cursor: pointer;
  flex: 0 0 20%;
  /* max-width: auto; */
  min-width: 280px;
}

.card.card-product-1 {
  display: inline-block;
  width: 100%;
}

.card.card-product-1 .card-icon{

  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 3px;
  text-align: center;
  float: left;
  margin-right: 15px;
}

.card.card-product-1 .card-icon img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 3px;
  margin-left: 0px;
}

.card.card-product-1 .card-header {
  border-color: transparent;
  height: auto;
  min-height: auto;
  display: block;
  padding-top: 25px;
  padding-bottom: 4px;
}

.card.card-product-1 .card-header h4 {
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .5px;
  line-height: 1.2;
  color: #37A372;
}

.card.card-product-1 .card-body {
  font-weight: 700;
  color: #34395e;
  padding-bottom: 0px;
  padding-top: 0px;
  font-size: 16px;
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

</style>