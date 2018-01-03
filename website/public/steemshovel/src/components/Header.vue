<template>
    <header class="l-app__topbar">
        
        <div class="l-container">
            <nav class="c-navbar c-navbar--light u-bg-primary">
                <div class="c-navbar__center">
                 <a class="c-navbar__item u-hiddenDown@md"><img src="/static/images/steems-logo.svg" width="50"></a>
                </div>
                <div class="c-navbar__left">
                   
                    <a role="button" class="c-navbar__item u-hiddenUp@md" v-toggle:sidebar>
                        <i class="i-menu i-menu--light"></i>
                    </a>                    
                    <router-link to="/" class="c-navbar__item u-hiddenDown@sm"><i class="icon-grid u-mr-5"></i>Dashboard</router-link>
                    <router-link to="/profile" class="c-navbar__item u-hiddenDown@sm"><i class="icon-user u-mr-5"></i>Profile</router-link>
                </div>
                <div class="c-navbar__right">
                    <drop class="c-navbar__item">
                        <a role="button" class="c-navbar__item u-m-0" slot="trigger">
                            <div class="u-pr-5"><i class="icon-user"></i></div>
                            <div class="c-menu__text">{{fullName}} <i class="i-arrowDown i-arrowDown--light u-ml-5"></i></div>                            
                        </a>
                        <drop-content slot="content">
                            <ul class="c-nav c-nav--menus">
                                <li class="c-nav__item">
                                    <router-link to="/profile" class="c-menu__link">
                                        <div class="c-menu__text">Profile</div>
                                    </router-link>
                                </li>
                                <li class="c-nav__item">
                                    <router-link to="/reset" class="c-menu__link">
                                        <div class="c-menu__text">Reset</div>
                                    </router-link>
                                </li>
                                <li class="c-nav__item">
                                    <a href="#" v-on:click="logout" class="c-menu__link">
                                        <div class="c-menu__text">Logout</div>
                                    </a>
                                </li>
                            </ul>
                        </drop-content>
                    </drop>
                </div>
            </nav>
        </div>
    </header>

</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      fullName: localStorage.getItem('fullName')
    }
  }
}
</script>

<style scoped>
    .c-navbar .router-link-exact-active {
        color: white;
        font-weight: 700;
    }
</style>
