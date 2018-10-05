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
    <PostList :posts="loadedPosts"/>

  </div>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview.vue'
import PostList from '~/components/Posts/PostList.vue'

export default {
  components: {
    PostPreview,
    PostList
  },
  data() {
    return {
      loadedPosts: []
    }
  },

  asyncData(context) {
    return new Promise((resolve, reject) => {
      resolve({
        loadedPosts: [
          {
            id: '1',
            author: 'Byer',
            title: 'My awesome Post(Post Pages)',
            previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
            thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
          },
          {
            id: '2',
            author: 'Byer',
            title: 'My awesome Post(Post Pages)',
            previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
            thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
          }
        ]
      })

      // reject(new Error())
    }).then(data => {
      return data
    }).catch(e => {
      context.error(e)
    })
  },

  created() {
    // 因为Nuxt会把store注入每个 component, 所以这里我们可以直接用
    // 
    // 但是，这并不是最好的方式！
    // we should loaded our store in the server first loaded pages
    // 而不是通过 asyncData 去取数据（虽然也是在服务端运行）
    this.$store.dispatch('setPosts', this.loadedPosts)
    console.log(this.$store)
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

