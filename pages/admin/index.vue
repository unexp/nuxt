<template>
  <div class="admin-page">
    <section class="new-post">
      <!-- normal button -->
      <!-- <button @click="$router.push('/admin/new-post')">Create Post</button> -->
      <!-- i want to use AppButton -->
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
      <AppButton @click.prevent="editPost">Edit Post</AppButton>
    </section>

    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList isAdmin :posts="loadedPosts"/>
    </section>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'

export default {
  layout: 'admin', // 指定用哪个 Layout/admin
  components: {
    PostList,
    AppButton
  },

  methods: {
    editPost(event) {
      console.log(event)
      this.$router.push('/admin/11')
    }
  },

  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

