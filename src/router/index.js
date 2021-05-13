import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


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
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue')
  },

  {
    path: '/customers',
    name: 'Customers',
    component: () => import(/* webpackChunkName: "customers" */ '../views/Customers.vue'),
    
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import(/* webpackChunkName: "invoices" */ '../views/Invoices.vue')
  },
  {
    path: '/invoices/createinvoices',
    name: 'CreateInvoices',
    component: () => import(/* webpackChunkName: "Createinvoices" */ '../views/CreateInvoices.vue')
  },
  {
    path: '/customers/create',
    name: 'CreateCustomer',
    component: () => import(/* webpackChunkName: "CreateCustomer" */ '../views/CreateCustomer.vue'),
    meta: { transitionName: 'slide' },
  },

  {
    path: '/customers/:customerId/contacts',
    name: 'Contacts',
    component: () => import(/* webpackChunkName: "Contacts" */ '../views/Contacts.vue'),
    props: true
  },

  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
