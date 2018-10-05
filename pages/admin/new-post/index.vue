<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <!-- 因为 new post page 和 edit post page 都用到这个form 所以把它抽成组件 -->
      <AdminPostForm />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin', // 指定用哪个 Layout/admin
  components: {
    AdminPostForm
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


