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

                fetch("http://localhost:8081/users/login", requestOptions)
                .then((response) => response.json())
                .then((response) => {
                    if (response.error) {
                        console.log("Error:", response.message);
                    } else {
                        console.log("Token", response.data.token.token);
                        store.token = response.data.token.token;
                        this.$router.push("/");
                    }
                })
            }
        }
    }
</script>