<template>
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name: 'books'}">Books</router-link>
        </li>

        <li v-if="store.token !== ''" class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle" id="navBarDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul class="dropdown-menu" aria-labelledby="navBarDropDown">
            <li>
              <router-link class="dropdown-item" :to="{name: 'users'}">Manage Users</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/admin/users/0">Add User</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" :to="{name: 'booksAdmin'}">Manage Books</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" :to="{name: 'bookEdit', params: {id: 0}}">Add a Book</router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link v-if="store.token == ''" class="nav-link" to="/login">Login</router-link>
          <a v-else href="javascript:void(0);" class="nav-link" @click="logout">Logout</a>
        </li>
      </ul>

      <span class="navbar-text">
        {{ store.user.first_name ?? '' }}
      </span>

    </div>
  </div>
</nav>
</template>

<script>
import { store } from './store';
import Security from './modules/security';

export default {
  data() {
    return {
      store
    }
  },

  methods: {
    logout() {
      const payload = {
        token: store.token
      }

      fetch(process.env.VUE_APP_API_URL + "/users/logout", Security.requestOptions(payload))
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          console.log(response.message)
        } else {
          store.token = ""
          store.user = {}
          document.cookie = '_site_data=; Path=/; '+
          'SameSite=Strict; Secure' +
          'Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

          this.$router.push("/login")
        }
      })
    }
  }
}
</script>