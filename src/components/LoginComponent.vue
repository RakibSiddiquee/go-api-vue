<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt5">Login</h1>
                <hr>
                
                <Form-tag @myevent="submitHandler" name="myform" event="myevent">
                    <text-input 
                        v-model="email"
                        label="Email" 
                        type="email" 
                        name="email" 
                        required="true" />

                    <text-input 
                        v-model="password"
                        label="Password" 
                        type="password" 
                        name="password" 
                        required="true" />

                    <hr>
                    <input type="submit" class="btn btn-primary" value="Login">
                </Form-tag>
            </div>
        </div>
    </div>
</template>

<script>
    import TextInput from './forms/TextInput.vue';
    import FormTag from './forms/FormTag.vue';
    import { store } from './store';
    import notie from 'notie'

    export default {
        name: "LoginComponent",
        components: {
            FormTag,
            TextInput
        },

        data(){
            return {
                email: "",
                password: "",
                store
            }
        },

        methods: {
            submitHandler() {
                console.log('submit')
                const payload = {
                    email: this.email,
                    password: this.password
                }

                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(payload)
                }

                fetch(process.env.VUE_APP_API_URL + "/users/login", requestOptions)
                .then((response) => response.json())
                .then((response) => {
                    if (response.error) {
                        console.log("Error:", response.message);
                        notie.alert({
                            type: 'error',
                            text: response.message,
                            // stay: true,
                            // position: 'bottom',
                        })
                    } else {
                        console.log("Token", response.data.token.token);
                        store.token = response.data.token.token;

                        store.user = {
                            id: response.data.user.id,
                            first_name: response.data.user.first_name,
                            last_name: response.data.user.last_name,
                            email: response.data.user.email,
                        }

                        // Save info to cookie
                        let date = new Date();
                        let expDays = 1;
                        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
                        const expires = "expires=" + date.toUTCString();

                        // Set the cookie
                        document.cookie = "_site_data="
                        + JSON.stringify(response.data)
                        + "; "
                        + expires
                        + "; path=/; SameSite=strict; Secure;"


                        this.$router.push("/");
                    }
                })
            }
        }
    }
</script>