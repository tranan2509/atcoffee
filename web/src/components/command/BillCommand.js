import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common/Constants'
import * as MutationsName from '../common/MutationsName'

const BillCommand = {

  async save(bill, store = null) {

    const url = `${Constants.HOSTNAME_DEFAULT}/api/staff/bill`;
    let result = await ConnectServer.postData(url, bill);
    store != null ? store.commit(MutationsName.MUTATION_NAME_SET_BILL, result) : '';
    return result;
  }
}

export default BillCommand;