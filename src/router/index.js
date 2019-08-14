import Vue from 'vue'
import Router from 'vue-router'
import item from '@/components/item'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'item',
      component: item
    }
  ]
})
