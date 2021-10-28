import * as MutationsName from "../../components/common/MutationsName";

const StoreModule = {
  state() {
    return {
      stores: null,
    };
  },

  getters: {
    stores(state) {
      return state.stores;
    },
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_STORES](state, stores) {
      state.stores = stores;
    },
  },

  actions: {
  }
};

export default StoreModule;
