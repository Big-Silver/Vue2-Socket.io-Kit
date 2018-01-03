<template>
  <div class="l-app">   
    <sidebar class="u-hiddenUp@md">
      <ul class="c-menu c-menu--dark" v-menu slot="content">
        <li class="c-menu__item">
            <router-link to="/" class="c-menu__link">
              <div class="c-menu__icon">
                    <i class="icon-lab"></i>
              </div>
              <div class="c-menu__text">Dashboard</div>
              <div class="c-menu__after"></div>
            </router-link>
        </li>
        <li class="c-menu__item">
            <router-link to="/users" class="c-menu__link">
              <div class="c-menu__icon">
                    <i class="icon-files-empty"></i>
              </div>
              <div class="c-menu__text">Pages</div>
              <div class="c-menu__after"></div>
            </router-link>
        </li>
      </ul>
    </sidebar> 
    <div class="l-app__content">
        <dash-header></dash-header>
        <div class="l-app__body">
            <router-view></router-view>
        </div>
        <dash-footer></dash-footer>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import router from '../router'

  export default {
    name: 'DashView',
    components: {
      dashHeader: Header,
      dashFooter: Footer
    },
    created: function () {
      if (!this.isAuthenticated()) {
        router.replace({path: '/login'})
      }
    }
  }
</script>
