import * as MutationsName from "../../components/common/MutationsName";

const ProductModule = {
  state() {
    return {
      products: null,
      totalPageProduct: 0,
      currentPageProduct: 1
    };
  },

  getters: {
    products(state) {
      return state.products;
    },
    totalPageProduct(state) {
      return state.totalPageProduct;
    },
    currentPageProduct(state) {
      return state.currentPageProduct;
    }
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_PRODUCTS](state, products) {
      state.products = products;
    },

    [MutationsName.MUTATION_NAME_SET_TOTAL_PAGE_PRODUCT](state, totalPageProduct) {
      state.totalPageProduct = totalPageProduct;
    },

    [MutationsName.MUTATION_NAME_SET_CURRENT_PAGE_PRODUCT](state, currentPageProduct) {
      state.currentPageProduct = currentPageProduct;
    },
  }
};

export default ProductModule;
