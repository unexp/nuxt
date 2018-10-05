import Vuex from 'vuex'
import axios from 'axios'
// import { stat } from 'fs'

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
      },

      addPost(state, post) {
        state.loadedPosts.push(post)
      },

      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )

        state.loadedPosts[postIndex] = editedPost
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

      // 坑爹的 firebase 接口超时，所以这里使用上面的静态数据
      // nuxtServerInit({ commit }, { req }) {
      //   return axios
      //     .get('https://nuxt-7de9c.firebaseio.com/posts.json')
      //     .then(res => {
      //       console.log('res', res)
      //       // 因为我们需要的是 [], 接口返回的是 {}, 所有这里做下转换
      //       const postsArray = []
      //       for (const key in res.data) {
      //         postsArray.push({ ...res.data[key], id: key })
      //       }

      //       commit('setPosts', postsArray)
      //     })
      // },

      // Nuxt 不知道为什么?! 好像是服务器超时（麻痹的真他妈吭 网络超时！）
      // nuxtServerInit(vuexContext, context) {
      //   return axios
      //     .get('https://nuxt-7de9c.firebaseio.com/posts.json')
      //     .then(res => {
      //       // 因为我们需要的是 [], 接口返回的是 {}, 所有这里做下转换
      //       const postsArray = []
      //       for (const key in res.data) {
      //         postsArray.push({ ...res.data[key], id: key })
      //       }

      //       vuexContext.commit('setPosts', postsArray)
      //     })
      //     .catch(e => {
      //       console.log(context.error(e))
      //     })
      // },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },

      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }

        // 为什么要 return, 我们添加 post 之后要跳回管理员页面
        // 但是这里是访问不到 this.$router 的，只能在页面去访问
        //
        // 在页面我们 dispatch('addPost', postdata).then(() => {
        // this.$router.push('/admin')
        // })
        return axios
          .post('https://nuxt-7de9c.firebaseio.com/posts.json', createdPost)
          .then(res => {
            // 每个 post 都有一个 id 对应，这里我们使用 firebase 提供的 name 当做 id
            vuexContext.commit('addPost', { ...createdPost, id: res.data.name })
          })
          .catch(err => {
            console.log(err)
          })
      },

      editPost(vuexContext, editedPost) {
        console.log('dddddddddd')
        console.log(editedPost)
        return axios
          .put(
            'https://nuxt-7de9c.firebaseio.com/posts/' +
              editedPost.id +
              '.json',
            editedPost
          )
          .then(res => {
            console.log(res)
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => {
            console.log(e)
          })
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
