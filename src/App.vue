<template>
  <HeaderComponent />
  <div>
    <router-view />
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue"
import FooterComponent from "./components/FooterComponent.vue"
import { store } from './components/store'

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data(){
    return {
      store
    }
  }
}
</script>

<style>

</style>
