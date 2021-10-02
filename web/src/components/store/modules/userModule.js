import UserEntity from "../../entities/userEntity";
import * as MutationsName from "../../common/MutationsName";
import Jwt from "../../common/Jwt";
import Login from "../../command/Login";

const userModule = {
  state() {
    return {
      user: new UserEntity(),
    };
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    [MutationsName.MUTATION_LOGIN](state, {user, jwt}) {
      Jwt.setJWT(jwt);
      state.user = user;
    },
  },

  actions: {
    /**
     * Function login
     * @param {*} username
     * @param {*} password
     */
    async login({ commit }, user) {
      try {

        const res = await Login.login(user);
        if (res.status === 200) {
          commit(MutationsName.MUTATION_LOGIN, {user: res.data.user, jwt: res.data.jwt});
          return true;
        }else{
          return false;
        }
      } catch (error) {
        return false;
      }
    },
  },
};

export default userModule;
