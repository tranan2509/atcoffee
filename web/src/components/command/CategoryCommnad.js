import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common//Constants'
import * as MutationNames from '../common/MutationsName'

var CategoryCommand = {

  async findAll(store) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/info/category`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store.commit(MutationNames.MUTATION_NAME_SET_CATEGORIES, result);
      return result;
    }
    return null;
  }
}

export default CategoryCommand;