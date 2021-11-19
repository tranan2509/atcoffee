import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

//Import modules
import UserModule from './modules/UserModule';
import SystemModule from './modules/SystemModule'
import CategoryModule from './modules/CategoryModule'
import StoreModule from "./modules/StoreModule";
import RoleModule from "./modules/RoleModule";
import ProductModule from './modules/ProductModule'
import BillModule from "./modules/BillModule";
import CartModule from "./modules/CartModule";

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    UserModule,
    SystemModule,
    CategoryModule,
    StoreModule,
    RoleModule,
    ProductModule,
    BillModule,
    CartModule
  },
});

export default store;
