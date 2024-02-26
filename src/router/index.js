import { createRouter, createWebHistory } from "vue-router"
import BodyComponent from './../components/BodyComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import BooksComponent from '../components/books/BooksComponent.vue'
import BookComponent from '../components/books/BookComponent.vue'
import BooksAdmin from '../components/books/BooksAdmin.vue'
import BookEdit from '../components/books/BookEdit.vue'
import UsersComponent from '../components/users/UsersComponent.vue'
import UserEdit from '../components/users/UserEdit.vue'

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
        component: BooksComponent,
    },

    {
        path: '/books/:bookName',
        name: 'book',
        component: BookComponent,
    },

    {
        path: '/admin/books',
        name: 'booksAdmin',
        component: BooksAdmin,
    },

    {
        path: '/admin/books/:bookId',
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
export default router