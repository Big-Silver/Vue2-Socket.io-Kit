<template>
  <div class="l-app">
    <div class="l-app__center">
      <div class="c-message">
        <div class="c-message__media">
          <h1 class="u-fs-128">404</h1>
        </div>
        <p class="c-message__title">OOPS!</p>
        <p class="c-message__content">
          Sorry! The page you are looking for doesn't exist.
        </p>
        <router-link to="/" class="btn btn--lg btn--smart btn--primary">Go Back!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundView'
  }
</script>
