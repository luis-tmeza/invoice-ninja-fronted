<template>
  <layout :is="layout"></layout>
</template>
<script>
  import LoginLayout from './layouts/Login'
  import UserAdminLayout from './layouts/UserAdmin'
  export default {
    components: {LoginLayout, UserAdminLayout},
    data () {
      return {
        layout: 'UserAdmin-layout'
      }
    }
  }
</script>
