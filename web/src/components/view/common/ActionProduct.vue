<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="alert alert-danger" role="alert" v-if="error != ''">
            {{error}}
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSave">
            <div class="row">
              <div class="col-8">
                 <div class="form-group">
                  <label for="code">Mã sản phẩm</label>
                  <input type="text" class="form-control" id="code" v-model="product.code" required>
                </div>
                <div class="form-group">
                  <label for="name">Tên sản phẩm</label>
                  <input type="text" class="form-control" id="name" v-model="product.name" required>
                </div>
                <div class="form-group">
                  <label for="category">Loại</label>
                  <div class="form-group-horizontal" id="category">
                    <div class="chip"
                      v-for="category in categories" :key="category.code"
                      :class="category.selected ? 'selected' : ''" @click="handleSelectedCategory(category)">
                      <span>{{category.name}}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">Mô tả sản phẩm</label>
                  <textarea class="form-control" id="description" rows="4" v-model="product.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="price">Giá sản phẩm</label>
                  <div class="form-group-horizontal price">
                    <div class="form-group horizontal">
                      <label for="size-s">Size S</label>
                      <input type="number" class="form-control " id="size-s" v-model="sizes[0].price" placeholder="0" min="0" required>
                    </div>
                    <div class="form-group horizontal">
                      <label for="size-m">Size M</label>
                      <input type="number" class="form-control " id="size-m" v-model="sizes[1].price" placeholder="0" min="0" required>
                    </div>
                    <div class="form-group horizontal">
                      <label for="size-l">Size L</label>
                      <input type="number" class="form-control " id="size-l" v-model="sizes[2].price" placeholder="0" min="0" required>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="discount">Giảm giá</label>
                  <input type="number" class="form-control" id="discount" min="0" required max="100" v-model="product.discount">
                </div>
              </div>
              <div class="col-4">
                <div class="img-content">
                  <img :src="url" alt="Image" @click="$refs.file.click()">
                  <input type="file" accept="image/*" ref="file" name="file" :required="this.$route.path.includes('add-product')" @change="handleSelectedImage" class="invisible"/>
                </div>
              </div>
            </div>
             <div class="form-group">
                  <label for="store">Cửa hàng áp dụng</label>
                  <div class="form-group-horizontal" id="store">
                    <div class="chip"
                      v-for="store in stores" :key="store.id"
                      :class="store.selected ? 'selected' : ''" @click="handleSelectedStore(store)">
                      <span>{{store.address}}</span>
                    </div>
                  </div>
                </div>
            <div class="action">
              <input type="submit" :value="this.$route.path.includes('add-product') ? 'Thêm' : 'Cập nhật'" class="btn btn-success">
            </div>
          </form>
        </div>
      </div>
    </div>
    <spinner :isSpinner="isSpinner">Đang xử lý...</spinner>
  </div>
</template>

<script>
import * as Constants from '../../common/Constants'
import ProductCommand from '../../command/ProductCommand'
import CategoryCommand from '../../command/CategoryCommnad'
import StoreCommand from '../../command/StoreCommand'
import Spinner from '../popup/Spinner.vue'

export default {
  name: Constants.COMPONENT_NAME_TABLE_ACTION_PRODUCT,

  components: {
    Spinner
  },

  data() {
    return {
      url: 'https://res.cloudinary.com/tranan2509/image/upload/v1633099012/logo_transparent_rerp84.png',
      formData: null,
      product: {
        code: '',
        name: '',
        description: '',
        discount: 0,
        categories: [], 
        stores: [],
        sizes: []
      },
      categories: [],
      stores: [],
      sizes: [{
        size: 'S',
        price: ''
      }, 
      {
        size: 'M',
        price: ''
      },
      {
        size: 'L',
        price: ''
      }],
      error: '',
      isSpinner: false
    }
  },

  methods: {

    handleSelectedImage() {
      let file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(file);
    },

    async handleSave() {
      let file = typeof this.$refs.file.files[0] == 'undefined' ? null : this.$refs.file.files[0];
      let categories = this.processCategories();
      let stores = this.processStores();
      if (categories != null && stores != null) {
        this.formData = new FormData();
        this.formData.append('file', file);
        this.product.categories = categories;
        this.product.stores = stores;
        this.product.sizes = this.sizes;
        this.formData.append('product', JSON.stringify(this.product));
        this.isSpinner = true;
        let result = await ProductCommand.saveProduct(this.formData);
        this.isSpinner = false;
        console.log(result);
        result != null && this.$route.path.includes('add-product') ? this.clearData() : '';
      } else {
        this.error = categories == null ? 'Vui lòng chọn loại đồ uống!' : 'Vui lòng chọn cửa hàng muốn thêm sản phẩm!';
      }
    },

    handleSelectedCategory(category){
      this.error = '';
      this.categories = this.categories.map(item => {
        if (item.id == category.id) {
          item.selected = !item.selected;
        }
        return item;
      })
    },

    handleSelectedStore(store){
      this.error = '';
      this.stores = this.stores.map(item => {
        if (store.id == 0 && item.id != 0) {
          item.selected = false;
        }
        if (store.id != 0 && item.id == 0) {
            item.selected = false;
          }
        if (item.id == store.id) {
          item.selected = !item.selected;
        }
        return item;
      })
    },

    processCategories() {
      var categories = this.categories.filter(category => category.selected);
      return categories.length > 0 ? categories : null;
    },

    processStores() {
      let stores = null;
      if (this.stores[0].selected) {
        stores = this.stores.filter(store => store.id > 0);
      } else {
        stores = this.stores.filter(store => store.selected);
      }
      return stores.length > 0 ? stores : null;
    },

    clearData() {

      this.url = 'https://res.cloudinary.com/tranan2509/image/upload/v1633099012/logo_transparent_rerp84.png';
      this.formData = null;
      this.product = {
        code: '',
        name: '',
        description: '',
        discount: 0,
        categories: [],
        stores: [],
        sizes: []
      };
      this.sizes = [{
        size: 'S',
        price: ''
      },
      {
        size: 'M',
        price: ''
      },
      {
        size: 'L',
        price: ''
      }],
      this.$refs.file.value = '';
      this.error = '',
      this.loadCategories();
      this.loadStores();
    },

    async loadData() {
      this.isSpinner = true;
      var categories = await this.loadCategories();
      var stores = await this.loadStores();
      if(this.$route.path.includes('edit-product')) {
        await this.loadProduct(categories, stores, this.$route.query.id);
      }
      this.isSpinner = false;
    },

    async loadCategories() {
      let result = await CategoryCommand.findAll(this.$store);
      this.categories = result.map(category => {
        category.selected = false;
        return category;
      });
      return this.categories;
    },
    
    async loadStores() {
      let result = await StoreCommand.findAll(this.$store);
      this.stores = result.map(store => {
        store.selected = false;
        return store;
      });
      this.stores.unshift({id: 0, address: 'Tất cả', selected: false});
      return this.stores;
    },

    async loadProduct(categories, stores, id) {
      let result = await ProductCommand.fineOne(id);
      this.product = {...result};
      this.sizes = [...result.sizes];
      this.url = result.image;
      this.categories = categories.map(category => {
        for (var categoryResult of result.categories) {
          if (category.id == categoryResult.id) {
            category.selected = true;
          }
        }
        return category;
      });
      if (stores.length - 1 == result.stores.length) {
        this.stores[0].selected = true;
      } else {
        this.stores = stores.map(store => {
          for (var storeResult of result.stores) {
            if (store.id == storeResult.id) {
              store.selected = true;
            }
          }
          return store;
        });
      }
      return result;
    }
  },

  created(){
    this.loadData();
  }
}
</script>

<style scoped>


input:focus {
  box-shadow: none;
  border: 1px solid var(--primary);
}

textarea:focus {
  box-shadow: none;
  border: 1px solid var(--primary);
}

form .form-group {
  margin-top: 10px;
}

.card .card-body {
  padding: 15px 25px;
}

.row {
  display: flex;
}

.row .col-8 {
  flex: 1;
}

.row .col-4 {
  min-width: 440px;
}

.form-group-horizontal {
  display: flex;
  overflow-x: auto;
  margin-top: 4px;
}

.form-group-horizontal .chip {
  height: 32px;
  min-width: 120px;
  padding: 5px 20px;
  border: 1px solid var(--primary);
  border-radius: 50px;
  margin-right: 10px;
  color: #212529;
  text-align: center;
}

.form-group.horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
}

.form-group.horizontal label{
  margin-right: 8px;
}


.form-group.horizontal input {
  flex: 1;
  margin-right: 8px;
}

.form-group.horizontal input[type="number"] {
  text-align: right;
}

input[type="number"] {
  text-align: right;
}


.form-group-horizontal .chip:hover {
  background: var(--primary);
  color: #fff;
  cursor: pointer;
}

.form-group-horizontal .chip.selected {
  background: var(--primary);
  color: #fff;
}

.img-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.img-content img{
  width: 400px;
  height: 400px;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 8px;
}

.alert.alert-danger {
  margin: 4px !important;
  transition: all .3s;
}

form .action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.btn.btn-success {
  width: 200px;
  margin: 20px auto;
}

.invisible {
  display: none;
}
</style>