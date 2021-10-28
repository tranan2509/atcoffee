import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common//Constants'
import * as MutationsName from '../common/MutationsName'

var StoreCommand = {

  async findAll(store) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/info/store`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_STORES, result);
      return result;
    }
    return null;
  }
}

export default StoreCommand;