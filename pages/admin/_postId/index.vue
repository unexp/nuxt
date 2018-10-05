<template>
  <div class="admin-post-page">
    <!-- 因为 new post page 和 edit post page 都用到这个form 所以把它抽成组件 -->
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>

</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin', // 指定用哪个 Layout/admin
  components: {
    AdminPostForm
  },

  data() {
    return {
      loadedPost: {
        author: 'Byer',
        title: 'My awesome Post',
        content: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
        thumbnailLink: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
      }
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>

