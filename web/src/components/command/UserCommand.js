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
  },

  async fineAllByOrder(page, size, storeCode, roleName, state, keyword, store) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/admin/user?page=${page}&size=${size}&store=${storeCode}&role=${roleName}&state=${state}&keyword=${keyword}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_USERS, res.users);
      store.commit(MutationsName.MUTATION_NAME_SET_SORT_USER, {page, store: storeCode, role: roleName, state: state, keyword, totalPage: res.totalPage});
      return res.users;
    }
    return null;
  }
}

export default UserCommand;