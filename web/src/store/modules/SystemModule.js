// import UserEntity from "../../components/entities/userEntity";
import * as MutationsName from "../../components/common/MutationsName";
// import Jwt from "../../components/common/Jwt";
// import Login from "../../components/command/Login";

const systemModule = {
  state() {
    return {
      menu: {
        dashboard: {
          value: false,
          submenu: {
            general: false,
            ecommerce: false
          }
        },
        layout: {
          value: false,
          submenu: {
            default: false,
            ecommerce: false
          }
        },
        product: {
          value: false,
          submenu: {
            products: false,
            add_product: false,
          }
        }
      }
    };
  },

  getters: {
    menu(state) {
      return state.menu;
    }
  },

  mutations: {
    [MutationsName.MUTATION_NAME_RESET_MENU] (state) {
      Object.keys(state.menu).forEach(key => {
        state.menu[key].value = false;
        Object.keys(state.menu[key].submenu).forEach(subkey => {
          state.menu[key].submenu[subkey] = false;
        })
      })
    }
  },

  actions: {

  }
};

export default systemModule;
