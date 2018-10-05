<template>
  <div class="posts-page">
    <!-- 
      你会发现这里的 "post-list" 和首页的 "featured-posts" 结构和样式都一模一样 
      所以可以把这一部分抽成一个组件 components/Post/PostList.vue
    -->
    <!-- <section class="post-list">
      <PostPreview 
        id="1"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="Hello There!"
        previewText="This my first post!"
      />
      <PostPreview 
        id="2"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="Hello There again!"
        previewText="This my second post!"
      />
      <PostPreview 
        id="3"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="GoodBye!"
        previewText="This my third post!"
      />
    </section> -->


    <!-- 所以把这一部分抽成组件之后 -->
    <PostList />

  </div>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview.vue'
import PostList from '~/components/Posts/PostList.vue'

export default {
  components: {
    PostPreview,
    PostList
  }
}
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

