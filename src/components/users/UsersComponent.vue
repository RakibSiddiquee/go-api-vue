<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Users</h1>
            </div>

            <hr>

            <table class="table table-compact table-striped">
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
        </div>
    </div>
</template>

<script>
import Security from '../modules/security';
import notie from 'notie';

export default {
    data(){
        return {
            users: []
        }
    },

    beforeMount(){
        Security.requireToken();

        fetch(process.env.VUE_APP_API_URL + "/admin/users", Security.requestOptions(""))
        .then((response) => response.json())
        .then((response) => {
            if (response.error) {
                notie.alert({
                    type: "error",
                    text: response.message
                })
            } else {
                this.users = response.data.users;
            }
        })
        .catch((error) => {
            console.log('err', error)
            notie.alert({
                type: "error",
                text: error,
            })
        })
    }
}
</script>