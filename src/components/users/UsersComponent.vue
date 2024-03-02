<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Users</h1>
            </div>

            <hr>

            <table v-if="!loading" class="table table-compact table-striped">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>
                            <router-link :to="{name: 'editUser', params: {userId: user.id}}">{{ user.last_name }}, {{ user.first_name }}</router-link>
                        </td>
                        <td>{{ user.email }}</td>
                        <td>
                            <span v-if="user.active === 1" class="badge bg-success">Active</span>
                            <span v-else class="badge bg-danger">Inactive</span>
                        </td>
                        <td v-if="user.token.id > 0">
                            <span class="badge bg-success" @click="logUserOut(user.id)">Logged in</span>
                        </td>
                        <td v-else>
                            <span class="badge bg-danger">Not logged in</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p v-else>Loading...</p>
        </div>
    </div>
</template>

<script>
import Security from '../modules/security';
import notie from 'notie';
import { store } from '../store';

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export default {
    data(){
        return {
            loading: true,
            users: [],
        }
    },

    beforeMount(){
        Security.requireToken();

        fetch(process.env.VUE_APP_API_URL + "/admin/users", Security.requestOptions(""))
        .then((response) => response.json())
        .then((response) => {
            if (response.error) {
                this.$emit('error', response.message)
            } else {
                // sleep(3000).then(() => {
                    this.users = response.data.users;
                    this.loading = false;
                // })
            }
        })
        .catch((error) => {
            this.$emit('error', error)
        })
    },

    methods: {
        logUserOut(id) {
            if (id !== store.user.id) {
                notie.confirm({
                    text: "Are you sure you want to log this user out?",
                    submitText: "Log Out",
                    submitCallback: function(){
                        fetch(`${process.env.VUE_APP_API_URL}/admin/log-user-out/${id}`, Security.requestOptions(""))
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.error) {
                                notie.alert({
                                    type: 'error',
                                    text: data.message,
                                })
                            } else {
                                notie.alert({
                                    type: 'success',
                                    text: data.message
                                })
                            }
                        })
                    }
                })
            } else {
                this.$emit('error', "'You can't log yourself out!");
            }
        }
    }
}
</script>