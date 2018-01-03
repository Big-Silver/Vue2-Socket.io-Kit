<template>
  <div id="search-header">
    <form @submit="goSearchPage" action="#" class="form-inline">
        <div class="form-group">
            <div class="form-control has-iconRight">
                <i class="icon-search form-iconRight u-mr-5" v-on:click="goSearchPage"></i>
                <input type="text" class="form-input" name="searchFilter" v-model="searchFilter" v-on:keyup.13="submit">
            </div>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'searchHeader',
    data: function () {
      return {
        searchFilter: localStorage.getItem('search')
      }
    },
    methods: {
      goSearchPage () {
        if (this.searchFilter !== '') {
          localStorage.setItem('search', this.searchFilter)
          this.$router.push('/search')
        }
      }
    }
  }
</script>
