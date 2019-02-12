import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})