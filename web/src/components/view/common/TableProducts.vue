<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Danh sách sản phẩm</h4>
          <div class="card-header-form">
            <form>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm">
                <div class="input-group-btn">
                  <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th class="text-center">ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá sản phẩm</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                  <th>Chi tiết</th>
                </tr>
                <tr v-for="product in products" :key="product.id">
                  <td class="text-center">{{product.id}}</td>
                  <td>{{product.name}}</td>
                  <td class="text-center">
                    <img :src="product.image" alt="image">
                  </td>
                  <td class="text-center">{{product.sizes[1].price}} vnd</td>
                  <td class="text-center">Dang ban</td>
                  <td class="text-center">Them</td>
                  <td class="text-center"><i class="fas fa-info-circle" @click="handleEdit(product.id)"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-right">
          <nav class="d-inline-block">
            <ul class="pagination mb-0">
              <li class="page-item disable">
                <router-link to="/" class="page-link"><i class="fas fa-chevron-left"></i></router-link>
              </li>
              <li class="page-item active">
                <router-link to="/" class="page-link">1</router-link>
              </li>
              <li class="page-item">
                <router-link to="/" class="page-link">2</router-link>
              </li>
              <li class="page-item">
                <router-link to="/" class="page-link">3</router-link>
              </li>
              <li class="page-item">
                <router-link to="/" class="page-link"><i class="fas fa-chevron-right"></i></router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Constants from '../../common/Constants'
import ProductCommand from '../../command/ProductCommand'

export default {
  name: Constants.COMPONENT_NAME_TABLE_PRODUCTS,

  data() {
    return {
      products: [],
    }
  },

  methods: {

    async loadProducts() {
      this.products = await ProductCommand.fineAll(this.$store);
    },

    handleEdit(id){
      this.$router.push({path: '/admin/edit-product', query: {id}});
    }
  },

  created(){
    this.loadProducts();
  }
}
</script>

<style>

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  border-radius: 3px;
  border: none;
  position: relative;
  margin-bottom: 30px;
}

.card .card-header {
  border-bottom-color: #f9f9f9;
  line-height: 30px;
  align-self: center;
  width: 100%;
  min-height: 70px;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  background: transparent;
}

.card .card-header h4 {
  font-size: 16px;
  line-height: 28px;
  color: var(--primary);
  padding-right: 10px;
  margin-bottom: 0;
  font-weight: 700;
  margin-top: 0;
  border-radius: 30px 0 0 30px !important;
}

.card .card-header .card-header-form {
  margin-left: auto;
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.card .card-header .card-header-form .input-group .form-control {
  border-radius: 30px 0 0 30px !important;
}

.card .card-header .form-control {
  height: 31px;
  font-size: 13px;
}

.form-control:not(.form-control-sm):not(.form-control-lg) {
  padding: 10px 15px;
}

.input-group .form-control {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-group .form-control:focus {
  border-radius: 1px;
  box-shadow: none;
  border-color: var(--primary);
}

.form-control { 
  background: #fdfdfd;
  border-color: #e4e6fc;
  display: block;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

input {
  overflow: visible;
}

.input-group .btn {
  border-radius: 0 30px 30px 0 !important;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: .5px;
  margin-top: -1px;
  padding: 2px 15px;
}

.card-header-form .btn {
  padding-left: 13px !important;
  padding-right: 13px !important;
}

.btn-primary {
  background: #7EBDA2 !important;
  box-shadow: 0 2px 6px var(--lightGreen2) !important;
  border-color: #7EBDA2 !important;
  color: #fff;
}


.btn-primary:hover{
  background-color: var(--primary) !important;
  box-shadow: 0 2px 6px var(--lightGreen2) !important;
  border-color: var(--primary) !important;
}

.card .card-body {
  background: transparent;
}

.table-reponsive {
  display: block;
  width: 100%;
}

.table {
  width: 100%;
  color: inherit;
  margin-bottom: 1rem;
}

.table tr td img {
  height: 44px;
  width: 44px;
  border-radius: 3px;
  cursor: pointer;
}

table {
  border-collapse:collapse;
}

.table-striped tbody tr:nth-of-type(2n+1) {
  --bs-table-accent-bg: rgba(0, 0, 0, 0.03);
}

.table td, .table:not(.table-bordered) th {
  border-top: none;
}

.table:not(.table-sm):not(.table-md):not(.dataTable) td, .table:not(.table-sm):not(.table-md):not(.dataTable) th {
  padding: 0 25px;
  height: 60px;
  vertical-align: middle;
}

th {
  text-align: center;
}

th, tr, td {
  border: 1px solid #f6f6f6;
}

.card .card-footer {
  background: transparent;
  border: none;
  padding: 20px 25px;
  width: 100%;
  text-align: right;
}

ul {
  margin-top: 0;
}

ul:not(.list-unstyled) {
  line-height: 28px;
}

.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: .25rem;
}

.page-item .page-link {
  border-color: transparent;
  background: #f9fafe;
  color: var(--primary);
  opacity: 0.9;
  border-radius: 3px;
  margin: 0 3px;
}

.page-link {
  font-weight: 600;
  position: relative;
  display: block;
  padding: .5rem .75rem;
  line-height: 1.25;
  border: 1px solid #dee2e6;
}

.page-item a {
  text-decoration: none !important;
}

.page-item.disable .page-link:hover {
  border-color: transparent !important;
  background: #f9fafe !important;
  color: var(--primary) !important;
}

.page-item.active .page-link {
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  z-index: 1;
  color: #fff;
}

.page-item .page-link:hover {
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  z-index: 1;
  color: #fff;
}

</style>