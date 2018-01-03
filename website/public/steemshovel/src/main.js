// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import VeeValidate from 'vee-validate'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://localhost:8010')
Vue.use(VeeValidate)

Vue.mixin({
  data: function () {
    return {
      searchFilter: ''
    }
  },
  methods: {
    isAuthenticated () {
      if (localStorage.getItem('state')) { return true }
      return false
    },
    checkLoggined () {
      var needAuthenticate = true
      var path = this.$route.path
      var allowedPaths = ['/register', '/login', '/forgot', '/reset']
      // Check if the uri is in allowedPaths.
      if (allowedPaths.indexOf(path) >= 0) {
        needAuthenticate = false
      }
      if (path !== '/search') {
        localStorage.setItem('search', '')
      }
      if (!needAuthenticate) {
        return true
      }
      if (!this.isAuthenticated()) {
        router.replace({path: '/login'})
        return false
      }
      return true
    },
    saveSession (user, state) {
      localStorage.setItem('state', state)
      localStorage.setItem('userGUID', user.userGUID ? user.userGUID : '')
      localStorage.setItem('fullName', user.fullName ? user.fullName : '')
      localStorage.setItem('email', user.email ? user.email : '')
      localStorage.setItem('password', user.password ? user.password : '')
    },
    clearSession () {
      localStorage.clear()
    },
    logout: function (event) {
      if (event) event.preventDefault()
      this.clearSession()
      router.replace({path: '/login'})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
