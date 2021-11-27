import * as MutationsName from "../../components/common/MutationsName";
import * as Constants from '../../components/common/Constants'

const BillModule = {

  state() {
    return {
      billsNotification: null,
      bills: null,
      bill: null,
    };
  },

  getters: {

    bills(state) {
      return state.bills;
    },

    bill(state) {
      return state.bill;
    },

    billsSortByCode(state) {
      return state.bills.sort((a, b) => {
        if (a.code > b.code) {
          return 1;
        } else if (a.code < b.code) {
          return -1;
        }
        return 0;
      });
    },

    billsUnread(state) {
      return state.bills.filter(bill => !bill.read);
    },

    billsNotification(state) {
      return state.bills.slice(0, Constants.LIMIT_NOTIFICATION_SHOW);
    }
  },

  mutations: {

    [MutationsName.MUTATION_NAME_SET_BILLS](state, bills) {
      state.bills = bills.sort((a, b) => {
        if (a.code < b.code) {
          return 1;
        } else if (a.code > b.code) {
          return -1;
        }
        return 0;
      });
    },

    [MutationsName.MUTATION_NAME_SET_BILL](state, bill) {
      state.bill = bill;
    },

    [MutationsName.MUTATION_NAME_REMOVE_BILL](state, id) {
      state.bills = state.bills.filter(bill => bill.id != id);
    },

    [MutationsName.MUTATION_NAME_UPDATE_BILL](state, bill) {
      state.bills = state.bills.map(item => {
        if (bill.id == item.id) {
          item = bill;
        }
        return item;
      });
    },

    [MutationsName.MUTATION_NAME_SET_BILLS_NOTIFICATION](state, billsNotification) {
      state.billsNotification = billsNotification;
    },

    [MutationsName.MUTATION_NAME_UPDATE_BILL_NOTIFICATION](state, bill) {
      state.billsNotification = state.billsNotification.map(item => {
        if (bill.id == item.id) {
          item = bill;
        }
        return item;
      });
    }
  },
};

export default BillModule;
