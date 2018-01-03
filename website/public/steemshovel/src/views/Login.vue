<template>
  <div class="l-app u-scroll">
    <div class="l-app__center">
      <div class="c-sign">
        <div class="c-sign__body u-pb-30">
          <h1 class="c-sign__title">Steemshovel</h1>
          <p class="c-sign__text">Sign in with your Account</p>
          <form @submit="submit" id="loginform" action="#" method="post" data-vv-scope="login-form">
              <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email"
                     name="loginEmail"
                     v-model="loginEmail"
                     v-validate="'required|email'" data-vv-as="email" placeholder="Email"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('login-form.loginEmail') }">
                  <small class="form-help u-color-danger" v-if="errors.has('login-form.loginEmail')">
                    {{ errors.first('login-form.loginEmail') }}
                  </small>
              </div>
              <!-- END .form-group -->
              <div class="form-group">
                  <label class="form-label">Password</label>
                  <input type="password"
                     name="loginPassword"
                     v-model="loginPassword"
                     v-validate="'required|min:6'" data-vv-as="password" placeholder="Password"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('login-form.loginPassword') }">
                  <small class="form-help u-color-danger" v-if="errors.has('login-form.loginPassword')">
                    {{ errors.first('login-form.loginPassword') }}
                  </small>
              </div>
              <!-- END .form-group -->
              <div class="form-group u-clearfix">
                  <!-- END .checkbox -->
                  <router-link to="/forgot" class="u-floatRight">Forgot Password?</router-link>
              </div>
              <!-- END .form-group -->
              <button type="submit" class="btn btn--primary btn--block">Sign in</button>
          </form>
        </div>
        <!-- END .c-sign__body -->
        <div class="c-sign__footer">
          <p class="u-textCenter">No account? Please go to <router-link to="/register">Register</router-link></p>
          <p class="u-textCenter u-textMuted u-fs-12">Steemshovel © 2017. All RIGHT RESERVED.</p>
        </div>
        <!-- END .c-sign__footer -->
      </div>
      <!-- END .c-sign -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoginView',
    data: function () {
      return {
        loginEmail: '',
        loginPassword: '',
        isLoggingIn: false,
        loginErrorMsg: ''
      }
    },
    methods: {
      submit () {
        if (event) event.preventDefault()
        this.$validator.validateAll('login-form').then(v => {
          if (v) {
            this.isLoggingIn = true
            this.$socket.emit('security/login', {
              method: 'post',
              email: this.loginEmail,
              password: this.loginPassword
            })
          }
        })
      },
      loginFail () {
        this.$notify({
          type: 'danger',
          title: 'Login Failed!',
          text: 'Email address or password is not correct!',
          closeable: true,
          timer: 5000
        })
      },
      loginSuccess () {
        this.$notify({
          type: 'success',
          title: 'Login Success!',
          text: 'Login Success!',
          closeable: true,
          timer: 5000
        })
      }
    },
    sockets: {
      'security/login': function (val) {
        console.log(val)
        if (val.body.user) {
          this.saveSession(val.body.user.user, 1)
          this.loginSuccess()
          this.$router.push('/')
        } else {
          this.loginErrorMsg = 'Email address or password is not correct!'
          this.loginFail()
        }
        this.isLoggingIn = false
      }
    },
    created: function () {
      if (this.isAuthenticated()) {
        this.$router.push('/')
      }
    }
  }
</script>
