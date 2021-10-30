import * as MutationsName from "../../components/common/MutationsName";

const BillModule = {
  state() {
    return {
      bills: null,
    };
  },

  getters: {
    bills(state) {
      return state.bills;
    },

    billsReverse(state) {
      return state.bills.reverse();
    },
  },

  mutations: {
    [MutationsName.MUTATION_NAME_SET_BILLS](state, bills) {
      state.bills = bills;
    },

    [MutationsName.MUTATION_NAME_REMOVE_BILL](state, id) {
      state.bills = state.bills.filter(bill => bill.id != id);
    },

    [MutationsName.MUTATION_NAME_SET_BILL](state, bill) {
      state.bills = state.bills.map(item => {
        if (bill.id == item.id) {
          item = bill;
        }
        return item;
      });
    },
  },
};

export default BillModule;
