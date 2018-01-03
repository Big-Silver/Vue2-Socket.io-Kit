<template>
  <div id="app" class="l-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    this.$socket.emit('connection', {method: 'get'})
  },
  sockets: {
    'connection': function (val) {
      console.log('Socket Connected!', val)
    }
  },
  watch: {
    '$route': 'checkLoggined'
  }
}
</script>
