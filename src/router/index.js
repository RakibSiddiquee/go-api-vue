import { createRouter, createWebHistory } from "vue-router"
import BodyComponent from './../components/BodyComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import BooksComposition from '../components/books/BooksComposition.vue'
import BookComponent from '../components/books/BookComponent.vue'
import BooksAdmin from '../components/books/BooksAdmin.vue'
import BookEdit from '../components/books/BookEdit.vue'
import UsersComponent from '../components/users/UsersComponent.vue'
import UserEdit from '../components/users/UserEdit.vue'
import Security from "@/components/modules/security"

const routes = [
    {
        path: '/',
        name: 'home',
        component: BodyComponent,
    },

    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
    },

    {
        path: '/books',
        name: 'books',
        component: BooksComposition,
    },

    {
        path: '/books/:slug',
        name: 'book',
        component: BookComponent,
    },

    {
        path: '/admin/books',
        name: 'booksAdmin',
        component: BooksAdmin,
    },

    {
        path: '/admin/books/:id',
        name: 'bookEdit',
        component: BookEdit,
    },

    {
        path: '/admin/users',
        name: 'users',
        component: UsersComponent,
    },

    {
        path: '/admin/users/:userId',
        name: 'editUser',
        component: UserEdit,
    },
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach(() => {
    Security.checkToken();
})

export default router