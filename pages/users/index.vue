<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ msg }}
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      msg: 'nested route -- users page child',
      userId: ''
    }
  }
}
</script>
