import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/Login'
import RegisterView from '@/views/Register'
import ForgotView from '@/views/Forgot'
import ResetView from '@/views/Reset'
import DashView from '@/views/Dash'
import DashboardView from '@/views/Dashboard'
// import UsersView from '@/views/Users'
import SearchView from '@/views/Search'
import ProfileView from '@/views/Profile'
import NotFoundView from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetView
    },
    {
      path: '/',
      component: DashView,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'search',
          name: 'search',
          component: SearchView
        }
      ]
    },
    {
      path: '*',
      component: NotFoundView
    }
  ]
})
