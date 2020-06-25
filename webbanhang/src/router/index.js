import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoryRoutes from '../router/category/category'
import ProductRoutes from '../router/product/product'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '',
    name: 'Home'
  },

  ...CategoryRoutes,

  ...ProductRoutes,


]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              name: 'Login',
              params: { nextUrl: to.fullPath }
          })
      } else {
            let is_admin = JSON.parse(localStorage.getItem('is_admin'))
            if(to.matched.some(record => record.meta.is_admin)) {
              if(is_admin){
                  
                next()
              }
              else{
                  next({ name: 'HomePage'})
              }
          }else {
              next()
          }
      }
  } else {
      next()
  }
})

export default router
