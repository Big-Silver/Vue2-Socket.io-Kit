<template>
  <div class="l-app u-scroll">
    <div class="l-app__center">
      <div class="c-sign">
        <div class="c-sign__body">
          <h1 class="c-sign__title u-fs-24">Forgot Your Password ?</h1>
          <p class="c-sign__text">Input your registered email to reset your password</p>
          <form @submit="submit" class="u-mt-30">
            <div class="form-group u-mb-30">
              <div class="form-control has-icon">
                <i class="icon-envelop3 form-icon"></i>
                <input type="email" class="form-input" placeholder="Your Email address">
              </div>
            </div>
            <!-- END .form-group -->
            <button type="submit" class="btn btn--danger btn--block">Send Reset Link</button>
          </form>
        </div>
        <!-- END .c-sign__body -->
        <div class="c-sign__footer">
          <p class="u-textCenter u-textMuted u-fs-12">Steemshovel © 2017. All RIGHT RESERVED.</p>
        </div>
      </div>
      <!-- END .c-sign -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ForgotView',
    methods: {
      submit () {
        this.$router.push('/')
      }
    }
  }
</script>
