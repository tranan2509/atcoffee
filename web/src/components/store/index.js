import { createStore } from "vuex";

//Import modules
import userModule from "./modules/userModule";

const store = createStore({

  modules: {
    userModule,
  },
});

export default store;
