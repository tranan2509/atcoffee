import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common/Constants'
import * as MutationsName from '../common/MutationsName'

var ProductCommand = {

  async saveProduct(product) {
    try{
      const url = `${Constants.HOSTNAME_DEFAULT}/api/admin/product`;
      let result = await ConnectServer.postData(url, product);
      return result != null && result.data !== null ? result.data : null;
    } catch (error) {
      return null;
    }
  },

  async fineOne(id) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/info/product/${id}`;
    let result = await ConnectServer.getData(url);
    return result;
  },

  async fineAll(store) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/info/product`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_PRODUCTS, result);
      return result;
    }
    return null;
  }
}

export default ProductCommand;