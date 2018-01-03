<template>
  <div class="l-app u-scroll">
    <div class="l-app__center">
      <div class="c-sign">
        <div class="c-sign__body u-pb-30">
          <h1 class="c-sign__title">Steemshovel</h1>
          <p class="c-sign__text">Sign up to your App Account</p>
          <form @submit="submit" id="registerForm" action="#" method="post" data-vv-scope="register-form">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text"
                     name="regFullName"
                     v-model="regFullName"
                     v-validate="'required'" data-vv-as="full name" placeholder="Full Name"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('register-form.regFullName') }">
              <small class="form-help u-color-danger" v-if="errors.has('register-form.regFullName')">
                {{ errors.first('register-form.regFullName') }}
              </small>
            </div>
            <!-- END .form-group -->
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email"
                     name="regEmail"
                     v-model="regEmail"
                     v-validate="'required|email'" data-vv-as="email" placeholder="Email"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('register-form.regEmail') }">
              <small class="form-help u-color-danger" v-if="errors.has('register-form.regEmail')">
                {{ errors.first('register-form.regEmail') }}
              </small>
            </div>
            <!-- END .form-group -->
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password"
                     name="regPassword"
                     v-model="regPassword"
                     v-validate="'required|min:6'" data-vv-as="password" placeholder="Password"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('register-form.regPassword') }">
              <small class="form-help u-color-danger" v-if="errors.has('register-form.regPassword')">
                {{ errors.first('register-form.regPassword') }}
              </small>
            </div>
            <!-- END .form-group -->
            <div class="form-group">
              <label class="form-label">Repeat Password</label>
              <input type="password"
                     name="regConfirmPassword"
                     v-model="regConfirmPassword"
                     v-validate="'required|min:6|confirmed:regPassword'" data-vv-as="confirm password" placeholder="Confirm Password"
                     v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('register-form.regConfirmPassword') }">
              <small class="form-help u-color-danger" v-if="errors.has('register-form.regConfirmPassword')">
                {{ errors.first('register-form.regConfirmPassword') }}
              </small>
            </div>
            <!-- END .form-group -->
            <button type="submit" class="btn btn--primary btn--block">Sign up</button>
          </form>
        </div>
        <!-- END .c-sign__body -->
        <div class="c-sign__footer">
          <p class="u-textCenter">Already have an account? <router-link to="/login">Sign in</router-link></p>
          <p class="u-textCenter u-textMuted u-fs-12">Steemshovel © 2017. All RIGHT RESERVED.</p>
        </div>
      </div>
      <!-- END .c-sign -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RegisterView',
    data: function () {
      return {
        regFullName: '',
        regEmail: '',
        regPassword: '',
        regConfirmPassword: '',
        isRegistering: false,
        registerErrorMsg: ''
      }
    },
    methods: {
      submit () {
        if (event) event.preventDefault()
        this.$validator.validateAll('register-form').then(v => {
          if (v) {
            this.isRegistering = true
            this.$socket.emit('users/registerUser', {
              method: 'post',
              fullName: this.regFullName,
              email: this.regEmail,
              password: this.regPassword
            })
          }
        })
      },
      registeFail (msg) {
        this.$notify({
          type: 'danger',
          title: 'Register Failed!',
          text: msg,
          closeable: true,
          timer: 5000
        })
      },
      registeSuccess () {
        this.$notify({
          type: 'success',
          title: 'Register Success!',
          text: 'Register was successed!',
          closeable: true,
          timer: 5000
        })
      }
    },
    sockets: {
      'users/registerUser': function (val) {
        console.log('registerUser', val)
        this.isRegistering = false
        this.saveSession(val.body.user.user, 1)
        this.$router.push('/')
        this.registeSuccess()
      }
    }
  }
</script>
