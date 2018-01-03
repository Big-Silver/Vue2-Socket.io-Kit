<template>
  <div>
    <div class="c-toolbar u-mb-0">
      <div class="l-container">
        <div class="l-level">
            <div class="l-level__left">
                <ol class="c-breadcrumb">
                    <li class="c-breadcrumb__item">
                        <a href="#" class="c-breadcrumb__link">Home</a>
                    </li>
                    <li class="c-breadcrumb__item">
                        <router-link to="/users" class="c-breadcrumb__link">Users</router-link>
                    </li>
                </ol>
            </div>
            <div class="l-level__right">
                <div class="l-level__item">
                    <search-header></search-header>
                </div>
            </div>
        </div>
      </div>
    </div>
    <main class="l-app__main" role="main">
      <div class="l-container"> 
        <alert type="info">Your are in users.</alert>
      </div>
    </main>
  </div>
</template>

<script>
  import SearchHeader from '../components/SearchHeader.vue'

  export default {
    name: 'UsersView',
    components: {
      searchHeader: SearchHeader
    }
  }
</script>
