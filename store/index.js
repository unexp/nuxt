import Vuex from 'vuex'

// Why create a function, not just return an object?!
//
// **nuxt will auto inject in our all component**
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      }
    },
    actions: {
      // nuxtServerInit 会自动被 vuex dispatch
      // 一定要返回 Promise
      // 这里加载的数据也要注意，一般是多个模块都共用的数据！
      //
      // 每个页面自己分别去加载数据（asyncData、fetch）
      // 还是用 nuxtServerInit 加载数据这个需要在项目中去做选择！！
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          // 这里使用 store.commit 把数据放到 store 里
          vuexContext.commit('setPosts', [
            {
              id: '1',
              author: 'Byer',
              title: 'My awesome Post(Post Pages)',
              previewText:
                'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
              thumbnail:
                'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
            },
            {
              id: '2',
              author: 'Byer',
              title: 'My awesome Post(Post Pages)',
              previewText:
                'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
              thumbnail:
                'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
            }
          ])

          // 然后再 resolve
          resolve()
        })
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
