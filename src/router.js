import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Auth from '@okta/okta-vue'

import Hello from './components/HelloWorld'

Vue.use(Auth, {
  issuer: 'https://dev-923564.okta.com/oauth2/default',
  client_id: '0oa11617ua0dhaQTQ357',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router