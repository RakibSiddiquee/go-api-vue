import { store } from '../store'
import router from '@/router'

let Security = {
    // make sure user is authenticated
    requireToken: function() {
        if (store.token === '') {
            router.push({name: "login"});
            return false;
        }
    },

    // Create request options and send them back
    requestOptions: function(payload) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + store.token)

        return {
            method: "POST",
            body: JSON.stringify(payload),
            headers: headers,
        }
    },

    // check token
    checkToken: function() {
        if (store.token !== ""){
            const payload = {
                token: store.token
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            let requestOptions = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: headers
            }

            fetch(`${process.env.VUE_APP_API_URL}/validate-token`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    if (!response.data) {
                        store.token = "";
                        document.cookie = '_site_data=; Path=; '
                            + 'SameSite=strict; Secure; '
                            + 'Expires=Thu 01 Jan 1970 00:00:01 GMT;'
                    }
                }
            })
        }
    }
}

export default Security;