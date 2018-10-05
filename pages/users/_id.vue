<template>
  <section class="container">
    <div>
      <h1 class="title">
        _.vue page, with ID: {{ $route.params.id }}
      </h1>
      <p>
        {{ msg }}
      </p>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      msg: 'lorem'
    }
  },
  
  validate(data) {
    // console.log('nuxt provide validate property')
    // console.log(data)

    // validate userId as number
    return /^\d+$/.test(data.params.id)
  },

  components: {
    Logo
  }
}
</script>
