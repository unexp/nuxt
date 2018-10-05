<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ msg }}
      </h1>

      <input type="text" v-model="userId">
      <button @click="onLoadUser">Load User</button>

      <div class="nested">
        <nuxt-child />
      </div>
      
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Header from '~/components/Header.vue'

export default {
  data() {
    return {
      msg: 'user page',
      userId: ''
    }
  },
  methods: {
    onLoadUser() {
      this.$router.push('/users/' + this.userId)
    }
  },
  components: {
    Logo,
    Header
  },

  // nuxt provide property
  layout: 'users'
}
</script>

<style lang="sass" scoped>
.nested
  border: 1px solid red
</style>

