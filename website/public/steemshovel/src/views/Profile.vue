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
                        <router-link to="/users" class="c-breadcrumb__link">Profile</router-link>
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
        <!-- END .l-row -->
        <div class="l-row">
            <div class="l-col-4@md l-col-4@lg">
                <section class="c-panel">
                    <div class="c-panel__body">
                        <div class="u-textCenter">
                            <div class="avatar avatar--xl u-mb-10">
                                <i class="icon-user-tie u-fs-128"></i>
                            </div>
                            <div class="u-fs-16">{{fullName}}</div>
                            <div>{{email}}</div>
                            <div class="meta u-mb-15">184 Malta Street, Neibert, West Virginia, 7480</div>
                        </div>
                        <hr class="u-mb-10 u-mt-20">
                        <div class="l-level">
                            <div class="l-level__item">
                                <div class="u-fs-16">38</div>
                                <span class="meta">REVIEWS</span>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">54</div>
                                <span class="meta">CLIENTS</span>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">86</div>
                                <span class="meta">PROJECTS</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-3@lg -->
            <div class="l-col-8@md l-col-8@lg">
                <tabs active-key="general" type="cards">
                    <tab-pane label="General" name="general">
                        <form @submit="submit" id="profileForm" action="#" method="post" data-vv-scope="profile-form" class="form-horizontal">
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220">Full Name</label>
                                <div class="form-content l-col@md">
                                    <input  type="text"
                                            name="fullName"
                                            v-model="fullName"
                                            v-validate="'required'" data-vv-as="full name" placeholder="Full Name"
                                            v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('profile-form.fullName') }">
                                    <small class="form-help u-color-danger" v-if="errors.has('profile-form.fullName')">
                                        {{ errors.first('profile-form.fullName') }}
                                    </small>
                                </div>
                            </div>
                            <!-- END .form-group -->
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220">Email Address</label>
                                <div class="form-content l-col@md">
                                    <input  type="email"
                                            name="email"
                                            v-model="email"
                                            v-validate="'required|email'" data-vv-as="email" placeholder="Email"
                                            v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('profile-form.email') }">
                                    <small class="form-help u-color-danger" v-if="errors.has('profile-form.email')">
                                        {{ errors.first('profile-form.email') }}
                                    </small>
                                </div>
                            </div>
                            <!-- END .form-group -->
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220">Current Password</label>
                                <div class="form-content l-col@md">
                                    <input  type="password"
                                            name="currentPassword"
                                            v-model="currentPassword"
                                            v-validate="'required|min:6'" data-vv-as="currentPassword" placeholder="Current Password"
                                            v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('profile-form.currentPassword') }">
                                    <small class="form-help u-color-danger" v-if="errors.has('profile-form.currentPassword')">
                                        {{ errors.first('profile-form.currentPassword') }}
                                    </small>
                                </div>
                            </div>
                            <!-- END .form-group -->
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220">New Password</label>
                                <div class="form-content l-col@md">
                                    <input  type="password"
                                            name="newPassword"
                                            v-model="newPassword"
                                            v-validate="'required|min:6'" data-vv-as="newPassword" placeholder="New Password"
                                            v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('profile-form.newPassword') }">
                                    <small class="form-help u-color-danger" v-if="errors.has('profile-form.newPassword')">
                                        {{ errors.first('profile-form.newPassword') }}
                                    </small>
                                </div>
                            </div>
                            <!-- END .form-group -->
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220">Repeat Password</label>
                                <div class="form-content l-col@md">
                                    <input  type="password"
                                            name="confirmPassword"
                                            v-model="confirmPassword"
                                            v-validate="'required|min:6|confirmed:newPassword'" data-vv-as="confirmPassword" placeholder="Repeat Password"
                                            v-bind:class="{ 'form-input' : true, 'is-danger': errors.has('profile-form.confirmPassword') }">
                                    <small class="form-help u-color-danger" v-if="errors.has('profile-form.confirmPassword')">
                                        {{ errors.first('profile-form.confirmPassword') }}
                                    </small>
                                </div>
                            </div>
                            <!-- END .form-group -->
                            <div class="form-group l-row">
                                <label class="form-label l-col-12 l-col-fixed@md u-w-220"></label>
                                <div class="form-content l-col@md">
                                    <button v-bind:class="{ 'btn btn--primary btn--smart' : true, 'is-loading': isUpdate }" >Update</button>
                                </div>
                            </div>
                            <!-- END .form-group -->
                        </form>
                    </tab-pane>
                    <tab-pane label="Payment" name="payment"></tab-pane>
                </tabs>
            </div>
        </div>
        <!-- END .l-row -->
      </div>
    </main>
  </div>
</template>

<script>
    import SearchHeader from '../components/SearchHeader.vue'

    export default {
      name: 'ProfileView',
      components: {
        searchHeader: SearchHeader
      },
      data: function () {
        return {
          userGUID: localStorage.getItem('userGUID'),
          fullName: localStorage.getItem('fullName'),
          email: localStorage.getItem('email'),
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          errorMsg: '',
          isUpdate: false
        }
      },
      methods: {
        submit () {
          if (event) event.preventDefault()
          this.$validator.validateAll('profile-form').then(v => {
            if (v) {
              this.isUpdate = true
              this.$socket.emit('users/updateProfile', {
                method: 'post',
                userGUID: this.userGUID,
                fullName: this.fullName,
                email: this.email,
                password: this.currentPassword,
                newPassword: this.newPassword
              })
            }
          })
        },
        updateFail (msg) {
          this.$notify({
            type: 'danger',
            title: 'Update Failed!',
            text: msg,
            closeable: true,
            timer: 5000
          })
        },
        updateSuccess () {
          this.$notify({
            type: 'success',
            title: 'Update Success!',
            text: 'Profile Updating was successed!',
            closeable: true,
            timer: 5000
          })
        }
      },
      sockets: {
        'users/updateProfile': function (val) {
          if (val.body.err === null) {
            localStorage.setItem('fullName', this.fullName)
            localStorage.setItem('email', this.email)
            localStorage.setItem('password', this.newPassword)
            this.currentPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
            this.errorMsg = ''
            this.errors.clear('profile-form')
            this.saveSession(val.body.user.user, 1)
            this.updateSuccess()
          } else {
            this.errorMsg = val.body.err
            this.updateFail(this.errorMsg)
          }
          this.isUpdate = false
        }
      }
    }
</script>
