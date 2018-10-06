<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <!-- 因为 new post page 和 edit post page 都用到这个form 所以把它抽成组件 -->
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin', // 指定用哪个 Layout/admin
  middleware: ['check-auth', 'auth'], // middleware/check-auth.js, middleware/auth.js
  components: {
    AdminPostForm
  },

  methods: {
    onSubmitted(postData) {
      console.log(postData)
      // axios.post('https://nuxt-7de9c.firebaseio.com/posts.json', { ...postData, updatedDate: new Date() })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

      // 我们用 store 里面的 action
      this.$store.dispatch('addPost', postData).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>


