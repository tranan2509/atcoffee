import * as Constants from '../common/Constants'
import * as MutationsName from '../common/MutationsName'
import ConnectServer from '../server/ConnectServer'

const RewardCommand = {

  async findAll(page, size, store = null) {
    const url = `${Constants}/api/staff/reward?page=${page}&size=${size}`;
    let result = await ConnectServer.getData(url);
    if (result != null) {
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_REWARDS, result.rewards) : null;
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_SORT_REWARD, {page, totalPage: result.totalPage}) : null;
    }
    return null;
  }
}

export default RewardCommand;