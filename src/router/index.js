import { createRouter, createWebHistory } from "vue-router"
import BodyComponent from './../components/BodyComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: BodyComponent,
    },

    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
    },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router