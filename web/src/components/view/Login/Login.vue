<template>
  <div>
    <div class="alert alert-danger invisible" role="alert">
      Tên đăng nhập hoặc mật khẩu không đúng!
    </div>
    <form @submit.prevent="login({ username, password })">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"
          ><b-icon-person-fill
        /></span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="username"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping-2"
          ><b-icon-lock-fill
        /></span>
        <input
          type="text"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="addon-wrapping"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Primary</button>
      <!-- <b-icon-arrow-90deg-up />
      <b-icon-archive-fill /> -->
    </form>
  </div>
</template>

<script>
import * as Constants from "../../common/Constants";
// import {mapActions} from 'vuex'

export default {
  name: Constants.COMPONENT_NAME_LOGIN,

  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    // ...mapActions(['login']),

    /**
     * Function login
     */
    async login({ username, password }) {
      const result = await this.$store.dispatch("login", {
        username,
        password,
      });
      if (result) {
        window.location.href = "/";
      } else {
        alert();
      }
    },
  },

  created() {},
};
</script>

<style></style>
