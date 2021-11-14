// import UserEntity from "../../components/entities/userEntity";
import * as MutationsName from "../../components/common/MutationsName";
// import Jwt from "../../components/common/Jwt";
// import Login from "../../components/command/Login";

const SystemModule = {
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
        },
        staff: {
          value: false,
          submenu: {
            staffs: false,
            add_staff: false
          }
        },
        store: {
          value: false
        },
        category: {
          value: false
        },
        profile: {
          value: false,
          submenu: {
            profile: false,
            change_password: false
          }
        }
      },
      menuStaff: {
        product: {
          value: false
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
        if (state.menu[key].menu != null) {
          Object.keys(state.menu[key].submenu).forEach(subkey => {
            state.menu[key].submenu[subkey] = false;
          })
        } 
      })
    }
  },

  actions: {

  }
};

export default SystemModule;
