<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>

    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PostPreview from '~/components/Posts/PostPreview.vue'
import PostList from '~/components/Posts/PostList.vue'

export default {
  components: {
    Logo,
    PostPreview,
    PostList
  },

  
  data() {
    return {
      // 我们定义了 computed, 所以这里不需要
      // loadedPosts: []
    }
  },

  created() {
  },

  // 我们用 asyncData() 来从服务器取数据（而不是在create() 里面请求服务器API取数据）
  // asyncData 只会页面第一次加载时候在服务器端运行！（例如：第一次访问、刷新、从别的页面跳回来URL发生变更）
  // 
  // 注意 `asyncData()` 里面 this 不是指向 vue instance
  // 因为 `asyncData()` run before vue instance create
  // asyncData 是个异步操作，所以我们要知道什么时候它完成了，有两种方式：
  // 一种是：return Promise Object: 
  // asyncData() { return new Promise(function(resolve, reject) {...}) }
  // 另外一种是：使用 callback, 如下：

  // 数据从 store 里取，就不在页面去加载了
  // 在 store/index.vue => actions: { nuxtServerInit } 把数据加载到 store 了
  /*
  asyncData(context, callback) {
    console.log('asyncData is excuted!')
    console.log(context)
    
    setTimeout(() => {
      // 一旦 asyncData 回调执行完了, 返回的数据变成我们的 data，我们的 template 就可以访问到这些数据了
      callback(null, {
        loadedPosts: [
          {
            id: '1',
            author: 'Byer',
            title: 'My awesome Post',
            previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
            thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
          },
          {
            id: '2',
            author: 'Byer',
            title: 'My awesome Post',
            previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
            thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
          }
        ]
      })
    }, 1500)
  }
  */

  // 通过 nuxtServerInit 加载数据之后
  // 从首页切换到 /pages/post.vue 看看速度是不是快了很多，没有加载状态了！
 computed: {
   loadedPosts() {
     return this.$store.getters.loadedPosts
   }
 }

}
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
