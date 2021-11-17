import * as MutationsName from "../../components/common/MutationsName";

const CartModule = {
  state() {
    return {
      carts: null,
      cart: null
    };
  },

  getters: {
    carts(state) {
      return state.carts;
    },

    cart(state) {
      return state.cart;
    }
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_CARTS](state, carts) {
      state.carts = carts;
    },

    [MutationsName.MUTATION_NAME_SET_CART](state, cart) {
      state.cart = cart;
    }
  },
};

export default CartModule;
