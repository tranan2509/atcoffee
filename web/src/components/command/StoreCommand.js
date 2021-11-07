import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common//Constants'
import * as MutationsName from '../common/MutationsName'

var StoreCommand = {

  async findAll(store = null) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/info/store`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_STORES, result) : null;
      return result;
    }
    return null;
  },

  async findOne(id, store = null) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/info/store/${id}`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_STORE, result) : null;
      return result;
    }
    return null;
  }
}

export default StoreCommand;