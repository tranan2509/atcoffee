import * as MutationsName from "../../components/common/MutationsName";

const StoreModule = {
  state() {
    return {
      stores: null,
      store: null
    };
  },

  getters: {
    stores(state) {
      return state.stores;
    },
    store(state) {
      return state.store;
    }
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_STORES](state, stores) {
      state.stores = stores;
    },
    [MutationsName.MUTATION_NAME_SET_STORE](state, store) {
      state.store = store;
    },
  },

  actions: {
  }
};

export default StoreModule;
