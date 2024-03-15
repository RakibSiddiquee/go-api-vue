<template>
  <HeaderComponent />
  <div>
    <router-view 
      v-slot="{ Component }"
      :key="componentKey" 
      @error="error" 
      @success="success" 
      @warning="warning" 
      @forceUpdate="forceUpdate">
      <keep-alive include="BooksComponent">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue"
import FooterComponent from "./components/FooterComponent.vue"
import { store } from './components/store'
import notie from 'notie'

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data(){
    return {
      componentKey: 0,
      store
    }
  },

  beforeMount() {
    // Check for a cookie
    let data = getCookie("_site_data");

    if (data !== "") {
      let cookieData = JSON.parse(data)

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },

  methods: {
    forceUpdate(){
      this.componentKey++;
    },

    success(msg) {
      notie.alert({
        type: 'success',
        text: msg
      })
    },

    error(msg) {
      notie.alert({
        type: 'error',
        text: msg
      })
    },

    warning(msg) {
      notie.alert({
        type: 'warning',
        text: msg
      })
    },
  }
}
</script>

<style>

</style>
