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

  // 我们定义了 computed, 所以这里不需要
  // data() {
  //   return {
  //     loadedPosts: []
  //   }
  // },

  /*
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
  */
  
  // 我们想页面在服务端第一次加载的时候就把数据放到 Store 里 （pre init store)
  // 所以我们使用 fetch(), 代替 asyncData() -- 两种都是 Nuxt 提供的，用法差不多
  // 但是 fetch() 必须返回 Promise, 在 resolve 状态，把数据放到 Store
  // 
  // 思考一个问题：posts.vue 和 index.vue 都用到这些数据，而且都是通过 fetch() 从服务器取的
  // 而且都把它放到 store 里面，所以这里你需要对加载之前需要检查 store 是否已经有了这些数据！
  // 如果 index.vue 已经加载了，理论上我 page.vue 就不需要再加载一遍了（而且这部分逻辑每个页面都有实现一次）：
  // 
  // 那么有没有办法，我这些数据在服务端只加载一次！并且把它放到 store 里呢？
  // 可以使用 nextServerInti() -- 写在 store/index.js => actions: {} 里
  // 这个方法只会在服务端执行一次！
  // 
  // 使用 nextServerInti() 后，下面 fetch() 可以备注掉了，
  // 模板的数据 直接在 computed:{} 里从 store 里面取过来
  /*
  fetch(context) {
    // 检查 store 是否已经加载了数据了
    if (context.store.state.loadedPosts.length > 0) {
      return null
    }

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
      // asyncData 这里是把 data 返回
      // return data

      // fetch 这里是把 data 放到 store
      context.store.commit('setPosts', data.loadedPosts)
    }).catch(e => {
      context.error(e)
    })
  },
  */

  created() {
    // 因为Nuxt会把store注入每个 component, 所以这里我们可以直接用
    // 
    // 但是，这并不是最好的方式！
    // we should loaded our store in the server first loaded pages
    // 而不是通过 asyncData 去取数据（虽然也是在服务端运行）
    // 
    // this.$store.dispatch('setPosts', this.loadedPosts)
    // console.log(this.$store)
  },

  computed: {
    // 因为我们的模板初始化的时候需要这个变量，
    // 但是我们上面我们使用 fetch 把值放到store里，所以这里要从 Store 取过来
    //
    // 通过 nuxtServerInit 加载数据之后
    // 从首页切换到 /pages/post.vue 看看速度是不是快了很多，没有加载状态了！ 
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
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

