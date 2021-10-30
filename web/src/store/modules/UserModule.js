import * as MutationsName from "../../components/common/MutationsName";
import Jwt from "../../components/common/Jwt";

const UserModule = {
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

};

export default UserModule;
