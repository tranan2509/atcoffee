import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common/Constants'
import * as MutationsName from '../common/MutationsName'

var ProductCommand = {

  async saveProduct(product) {
    try{
      const url = `${Constants.HOSTNAME_DEFAULT}/api/admin/product`;
      let res = await ConnectServer.postData(url, product);
      return res != null ? res : null;
    } catch (error) {
      return null;
    }
  },

  async fineOne(id) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/info/product/${id}`;
    let res = await ConnectServer.getData(url);
    return res;
  },

  async fineAll(page, size, store) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/info/product?page=${page}&size=${size}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_PRODUCTS, res.products);
      store.commit(MutationsName.MUTATION_NAME_SET_TOTAL_PAGE_PRODUCT, res.totalPage);
      store.commit(MutationsName.MUTATION_NAME_SET_CURRENT_PAGE_PRODUCT, 1);
      return res.products;
    }
    return null;
  },

  async findAllByOrder(page, size, storeCode, categoryCode, keyword, store) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/info/product?page=${page}&size=${size}&store=${storeCode}&category=${categoryCode}&keyword=${keyword}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_PRODUCTS, res.products);
      store.commit(MutationsName.MUTATION_NAME_SET_TOTAL_PAGE_PRODUCT, res.totalPage);
      store.commit(MutationsName.MUTATION_NAME_SET_SORT_PRODUCT, {page, store: storeCode, category: categoryCode, keyword, totalPage: res.totalPage});
      return res.products;
    }
    return null;
  }
}

export default ProductCommand;