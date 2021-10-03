<template>
  <div class="login container-fluid center">
    <section class="section">
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
          >
            <div class="text-center">
              <img
                src="../../../assets/logo.png"
                alt="logo"
                width="200"
                class="shadow-light rounded-circle circle"
              />
            </div>
            <div
              :class="['alert', 'alert-danger', incorrect ? 'flex' : '']"
              role="alert"
            >
              Tên đăng nhập hoặc mật khẩu không khớp!
            </div>
            <div class="card card-primary">
              <div class="card-header"><h4>Đăng nhập</h4></div>

              <div class="card-body">
                <form
                  class="needs-validation"
                  @submit.prevent="login({ username, password })"
                >
                  <div class="form-group">
                    <label for="username">Tên đăng nhập</label>
                    <input
                      id="username"
                      type="text"
                      class="form-control"
                      tabindex="1"
                      required
                      autofocus
                      v-model="username"
                    />
                    <div class="invalid-feedback">
                      Vui lòng điền tên đăng nhập
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="d-flex justify-content-between">
                      <label for="password" class="control-label"
                        >Mật khẩu</label
                      >
                      <div class="float-right">
                        <a href="/forgot-password" class="text-small">
                          Quên mật khẩu?
                        </a>
                      </div>
                    </div>
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      tabindex="2"
                      required
                      v-model="password"
                    />
                    <div class="invalid-feedback">
                      Vui lòng điền mật khẩu
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                      tabindex="4"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as Constants from "../../common/Constants";
// import COLORS from '../../common/CommonColors'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: Constants.COMPONENT_NAME_LOGIN,

  data() {
    return {
      username: "",
      password: "",
      incorrect: false,
    };
  },

  computed: {

    ...mapGetters(['user']),
  },

  methods: {

    ...mapActions(['authenticated']),

    /**
     * Function login
     */
    async login({ username, password }) {
      const result = await this.$store.dispatch("login", {
        username,
        password,
      });
      if (result) {
        this.$router.push('/admin')
      } else {
        this.incorrect = true;
      }
    },

    /**
     * Function: authenticated
     */
    async isAuthenticated() {
      const isAuth = await this.authenticated();
      if (isAuth && this.user.roleName === Constants.ROLE_ADMIN){
        this.$router.push('/admin')
      }
    },
  },

  created() {
    this.isAuthenticated();
  },
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  background: #f4f6f9;
  padding-top: 4%;
}

.login .alert {
  display: none;
  transition: 0.5s ease-in-out;
}

.login .flex {
  display: flex;
}

.login .card-header {
  background: #fff;
}

.login .card-header h4 {
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  color: #37a372;
  padding: 0px;
  margin: 12px 0px 12px 10px;
}

.login .card.card-primary {
  border: none;
  border-top: 2px solid #37a372;
  border-radius: 4px;
}

.login .card-body {
  padding: 12px 16px;
}

.login .card-body form {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5;
}

.login .card-body form .form-group {
  padding: 12px 0px 12px 10px;
}

.login .card-body form .form-group label {
  padding: 4px 0px;
  letter-spacing: 0.5px;
}

.login .card-body form .form-group input {
  font-size: 14px;
  height: 42px;
}

.login .card-body form .form-group a {
  color: #37a372;
  text-decoration: none;
  font-weight: 500;
}

.login .card-body form .form-group a:hover {
  text-decoration: underline;
}

.login .btn-lg {
  width: 100%;
  background: #37a372;
  border: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 12px 12px;
  margin-bottom: 20px;
}
</style>
