<template>
  <section class="post-list">
    <!-- <PostPreview 
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
      title="Hello There!"
      previewText="This my first post!"
    />
    <PostPreview 
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
      title="Hello There again!"
      previewText="This my second post!"
    />
    <PostPreview 
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
      title="GoodBye!"
      previewText="This my third post!"
    /> -->
    <PostPreview 
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :is-admin="isAdmin"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :previewText="post.previewText"
    />
  </section>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview.vue'

export default {
  components: {
    PostPreview
  },

  props: {
    isAdmin: {
      type: Boolean,
      defaule: false
    },

    // 需要动态的展示 List
    posts: {
      type: Array,
      require: true
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

