import * as MutationsName from "../../components/common/MutationsName";
import Jwt from "../../components/common/Jwt";
import LoginCommand from "../../components/command/LoginCommand";

const userModule = {
  state() {
    return {
      user: null,
    };
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    [MutationsName.MUTATION_LOGIN](state, { user, jwt }) {
      Jwt.setJWT(jwt);
      state.user = user;
    },

    [MutationsName.AUTHENTICATED](state, user) {
      state.user = user;
    },

    [MutationsName.MUTATION_NAME_LOGOUT](state) {
      state.user = null;
    }
  },

  actions: {
    /**
     * Function login
     * @param {*} username
     * @param {*} password
     */
    async login({ commit }, user) {
      try {
        const res = await LoginCommand.login(user);
        if (res.status === 200) {
          commit(MutationsName.MUTATION_LOGIN, {
            user: res.data.user,
            jwt: res.data.jwt,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },

    /**
     * Function authenticated
     * @returns
     */
    async authenticated({ commit }) {
      const res = await LoginCommand.authenticated();

      if (res != null) {
        commit(MutationsName.AUTHENTICATED, res);
        return true;
      }
      return false;
    },

    logout({commit}) {
      commit(MutationsName.MUTATION_NAME_LOGOUT);
    }
  },
};

export default userModule;
