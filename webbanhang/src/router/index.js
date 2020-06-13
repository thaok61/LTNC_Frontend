import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryRoutes from '../router/category/category'
import ProductRoutes from '../router/product/product'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  ...CategoryRoutes,
  ...ProductRoutes
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
