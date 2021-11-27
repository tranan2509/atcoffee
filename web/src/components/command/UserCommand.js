import ConnectServer from "../server/ConnectServer";
import * as Constants from '../common/Constants';
import * as MutationsName from '../common/MutationsName'

const UserCommand = {

  async save(user) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/admin/user`;
    let res = await ConnectServer.postData(url, user);
    return res != null ? res : null;
  },

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

  async findAllByOrder(page, size, storeCode, roleName, state, keyword, store) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/admin/user?page=${page}&size=${size}&store=${storeCode}&role=${roleName}&state=${state}&keyword=${keyword}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store.commit(MutationsName.MUTATION_NAME_SET_USERS, res.users);
      store.commit(MutationsName.MUTATION_NAME_SET_SORT_USER, {page, store: storeCode, role: roleName, state: state, keyword, totalPage: res.totalPage});
      return res.users;
    }
    return null;
  },

  async findOne(id, store = null) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/staff/user/${id}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_USER, res) : null;
      return res;
    }
    return null;
  },

  async findOneByCode(code, store = null) {
    const url =  `${Constants.HOSTNAME_DEFAULT}/api/staff/user?code=${code}`;
    let res = await ConnectServer.getData(url);
    if (res != null) {
      store != null ? store.commit(MutationsName.MUTATION_NAME_SET_USER, res) : null;
      return res;
    }
    return null;
  },

  async validate(username, code, email, phone, identityCard) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/admin/user/validate?username=${username}&code=${code}&email=${email}&phone=${phone}&identity-card=${identityCard}`;
    let res = await ConnectServer.getData(url);
    return res;
  },

  async resetPassword(email) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/info/reset-password?email=${email}`;
    let res = await ConnectServer.getDataInfo(url);
    return res;
  }
}

export default UserCommand;