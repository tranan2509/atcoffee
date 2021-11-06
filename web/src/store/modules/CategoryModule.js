import * as MutationsName from "../../components/common/MutationsName";

const CategoryModule = {
  state() {
    return {
      categories: null,
    };
  },

  getters: {
    categories(state) {
      return state.categories;
    },
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
  },

  actions: {
  }
};

export default CategoryModule;
