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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>
                            <router-link :to="{name: 'editUser', params: {userId: user.id}}">{{ user.last_name }}, {{ user.first_name }}</router-link>
                        </td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>

            <p v-else>Loading...</p>
        </div>
    </div>
</template>

<script>
import Security from '../modules/security';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
                sleep(3000).then(() => {
                    this.users = response.data.users;
                    this.loading = false;
                })
            }
        })
        .catch((error) => {
            this.$emit('error', error)
        })
    }
}
</script>