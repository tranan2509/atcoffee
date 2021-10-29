import * as MutationsName from "../../components/common/MutationsName";

const productModule = {
  state() {
    return {
      products: null,
      totalPageProduct: 0
    };
  },

  getters: {
    products(state) {
      return state.products;
    },
    totalPageProduct(state) {
      return state.totalPageProduct;
    }
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_PRODUCTS](state, products) {
      state.products = products;
    },

    [MutationsName.MUTATION_NAME_SET_TOTAL_PAGE_PRODUCT](state, totalPageProduct) {
      state.totalPageProduct = totalPageProduct;
    },
  }
};

export default productModule;
