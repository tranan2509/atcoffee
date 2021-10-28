import * as MutationsName from "../../components/common/MutationsName";
import ProductCommand from "../../components/command/ProductCommand";

const productModule = {
  state() {
    return {
      products: null,
    };
  },

  getters: {
    products(state) {
      return state.products;
    },
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_PRODUCTS](state, products) {
      state.products = products;
    },
  },

  actions: {
    async saveProduct(product) {
      const result = await ProductCommand.saveProduct(product);
      return result;
    }
  }
};

export default productModule;
