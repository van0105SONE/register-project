// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'LogIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/LogIn.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/class/:id',
        name: 'Class',
        component: () => import('@/views/Students.vue')
      },
      {
        path: '/create',
        name: 'Create',
        component: () => import('@/views/FormCreate.vue')
      },
      {
        path: '/myroom',
        name: 'MyRoom',
        component: () => import('@/views/MyRoom.vue')
      },
      {
        path: '/list/:id',
        name: 'List',
        component: () => import('@/views/DetailList.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
