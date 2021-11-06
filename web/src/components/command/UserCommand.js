import ConnectServer from "../server/ConnectServer";
import * as Constants from '../common/Constants';
import * as MutationsName from '../common/MutationsName'

const UserCommand = {

  async updatePassword(user, oldPassword, newPassword, store) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/user/change-password`;
    const params = {user, oldPassword, newPassword};
    let result = await ConnectServer.putData(url, params);
    if(result != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_USER, result);
      return result;
    }
    return null;
  }
}

export default UserCommand;