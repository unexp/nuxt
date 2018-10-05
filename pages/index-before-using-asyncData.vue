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
      // hardcode data (现实项目中通常会在 create() 请求 API 拉数据回来)
      // loadedPosts: [
      //   {
      //     id: '1',
      //     author: 'Byer',
      //     title: 'My awesome Post',
      //     previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
      //     thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
      //   },
      //   {
      //     id: '2',
      //     author: 'Byer',
      //     title: 'My awesome Post',
      //     previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
      //     thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
      //   }
      // ]

      loadedPosts: []
    }
  },

  created() {
    // 模拟接口请求数据
    // (现实项目中通常会在 create() 请求 API 拉数据回来)
    // 这会有什么问题？--弱网络的时候会有白屏延迟
    // 
    // 对于用户的话：
    // 当然你可以加一些 Loading 动画来过渡白屏, 或者加一些 Placeholder (占位图片)
    // 但是对于 搜索引擎呢：
    // 搜索引擎去抓你的 index.html 发现里面什么东西都没有！只有一个空的类似 `<div id="app"></div>`
    // 
    // 想一下：如果我们能让服务器在给前端传回 index.html 之前就把数据加载完了渲染好了（服务端渲染）
    // 那么用户就需要等待白屏，并且搜索引擎也可以抓到数据
    // 
    // Nuxt 提供了一个 property 可以提供这个服务: asyncData() -- execute on the server
    // 注意 这个 property 只能写在 pages/ 里面的 vue 文件才会起作用
    setTimeout(() => {
      this.loadedPosts = [
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
    }, 1500)
  },

  // 用 asyncData() 代替 data() 
  // 注意 asyncData() 里面 this 不是指向 vue instance
  // 因为 asyncData() run before vue instance create
  // asyncData 是个异步操作，所以我们要知道什么时候它完成了，有两种方式：
  // 一种是：return Promise Object: 
  // asyncData() { return new Promise(function(resolve, reject) {...}) }
  // 另外一种是：使用 callback, 如下：
  asyncData(context, callback) {
    setTimeout(() => {
      // 不能直接返回，而是要通过 callback 回调
      // return {
      //   loadedPosts = [
      //     {
      //       id: '1',
      //       author: 'Byer',
      //       title: 'My awesome Post',
      //       previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
      //       thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
      //     },
      //     {
      //       id: '2',
      //       author: 'Byer',
      //       title: 'My awesome Post',
      //       previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
      //       thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
      //     }
      //   ]
      // }

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
