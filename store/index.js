import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { stat } from 'fs'

// Why create a function, not just return an object?!
//
// **nuxt will auto inject in our all component**
const createStore = () => {
  return new Vuex.Store({
    // init state
    state: {
      loadedPosts: [],
      token: null
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
      },

      setToken(state, token) {
        console.log('calling setToken')
        state.token = token
      },

      clearToken(state) {
        state.token = null
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
      // 部署在 heroku 就没问题了 -_-
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
          // .post('https://nuxt-7de9c.firebaseio.com/posts.json', createdPost)

          // after attach Token
          .post('https://nuxt-7de9c.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
          .then(res => {
            // 每个 post 都有一个 id 对应，这里我们使用 firebase 提供的 name 当做 id
            vuexContext.commit('addPost', {
              ...createdPost,
              id: res.data.name
            })
          })
          .catch(err => {
            console.log(err)
          })
      },

      editPost(vuexContext, editedPost) {
        console.log('dddddddddd')
        console.log(editedPost)
        return (
          axios
            // .put('https://nuxt-7de9c.firebaseio.com/posts/' + editedPost.id + '.json', editedPost)

            // after attach Token
            .put('https://nuxt-7de9c.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
            .then(res => {
              console.log(res)
              vuexContext.commit('editPost', editedPost)
            })
            .catch(e => {
              console.log(e)
            })
        )
      },

      authenticateUser(vuexContext, authData) {
        const fbAPIKey = 'AIzaSyDHefltbDHfBLtO2Tc3__lHXxHp4wCwXWE'
        let URL =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          fbAPIKey
        if (!authData.isLogin) {
          URL =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            fbAPIKey
        }

        return axios
          .post(URL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            // 注意：
            // 服务器会给你一个JWT Token, 前端需要存起来！
            // 后面需要校验身份的请求需要把 Token 带过去！
            //
            // 带Token的方式有三种，看后端是实现方式：
            // 一种是放在请求头部 x-auth-token: ’youToken' (用的比较多)
            // 另外一种是附加在请求 body 里面 { ...otherReqParams, token: 'youToken' } (几乎不会用这种)
            // 还有就是在请求 API 上带参数： https://domain.com/api/name.json?auth=<ID_TOKEN> (用的比较多)
            // 例如：https://nuxt-7de9c.firebaseio.com/posts/-LO6TBp56IgH-0J4S7MI.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2OThjZmNlMTgzNWZjNDZmNWVhZWZjOGJmOTMwNjk0OGQ2OTFmMGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV4dC03ZGU5YyIsImF1ZCI6Im51eHQtN2RlOWMiLCJhdXRoX3RpbWUiOjE1Mzg3OTcyOTEsInVzZXJfaWQiOiIxT25QZnIxT2RNYUh6UDJoU0JMRWZrR0RVajczIiwic3ViIjoiMU9uUGZyMU9kTWFIelAyaFNCTEVma0dEVWo3MyIsImlhdCI6MTUzODc5NzI5MSwiZXhwIjoxNTM4ODAwODkxLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.HK5438CuUKNXkwBpNRtc8aKyoGgg1BuyK94Aqhk-XTdaIQqSGnE8ig2yKY2MGh-evinCEG3sQz4vxJldp_jJBUppXDdKYK6L3vMcgdoOV3KBOUq_LRIlv9d-LwVKfELKZ72w5Qh8hr8BO2DGA489636VXGblFTI5pclYhaFJ_6SqI_jBFXzOL1OFXna1g2HnzUJA_8vbw1Xb2PmYeFzssl8cWF_uVhDuhjN6fQHuXPnxcpgjqhcU7jP5gK6UODU3fU2Eb7MBvlyMMW6AJXaaiafpCNjmrihLj6zMqGL6rR3b30HwBnGohAfnEuxqNBXoptEc38Cv_mezxPs1vkMXpQ

            console.log(res)
            console.log(res.data.idToken)

            // Save Token -- Why save to store? not localStorage
            // 现在是把 Token 存起来的，但是还有问题！跨页面刷新的时候Token会消失了 
            // -- 通常SPA做法是把 Token 放到 localStorage, 当你 App 启动时候，先去检查 localStorage 里是否有 token
            // -- 再去交易它是否已经超时，然后再把放到 vuex store
            // -- 但是，现在我们是服务端渲染，页面刷新的时候会在 nuxtServerInit() 会在服务端执行，而且我们是在 nextServerInit()
            // -- 里初始化我们的 store, 所以在 nuxtServerInit() 还访问不到 client 端的 localStorage
            // -- 有两种方案：
            // -- 一种是在 Layout/xx.vue 里面做 dispatch('setToken') 把它放到 localStorage, 刷新的时候也是在 Layout/xx.vue
            // -- 里检查 token 的有效性，再把它放到 vuex store (因为App init 的时候相比其它vue instace, Layout 里的 Vue instance 会最先被执行到)
            // -- 另外一种方案是：
            // -- 创建一个特殊的 middleware (attach 需要 token 的 router), 我们在 middleware 里面检查 Token
            // -- 如果我们发现Token, 再把它放到 vuex store
            // 
            // 另外一个问题是，有些路由是需要身份校验后才可以进去，现在也还没有保护起来 -- 用 middleware (middleware/auth.js)
            // 
            // 还有一个问题是，Token 有时效（接口返回的是1小时），
            // 拿到 Token 之后，过一段时间，前端怎么知道 Token 超时了？ -- 第一次拿到 Token 后设置一个 Timer, Timer 超时后清掉 Token
            vuexContext.commit('setToken', res.data.idToken)

            // 不是说访问不到 localStorage 吗？-- 是的
            // 所以我们要检查运行环境（在服务器端，还是在客户的）
            // 在 middleware/check-auth.js 加下面的逻辑
            // if (process.client) {
            //   context.store.dispatch('initAuth')
            // }
            // 尽管这样做，还是解决不了完美解决跨页面刷新的问题，所以我们使用 cookie
            // Why cookie? 没问每个 GET 请求在HTTP头部都会自动带上 cookie:
            // 我们拿到Token之后，放在cookie里，这样页面刷新的时候会去服务器请求资源（GET请求）
            // 会把Cookie 放到请求头里，这样 nuxtServerInit() 在服务器执行的时候，可以访问到请求头 req
            // 发现里面有 token, 就拿到 Token 放到 vuex store 上（但是服务器端怎么判断Token是否超时了？）
            // 
            // npm install --save js-cookie
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + +res.data.expiresIn * 1000)

            // 所以，存一份在 localStorage, 同时也存一份在 Cookie
            Cookie.set('jwt', res.data.idToken)
            Cookie.set('expirationDate', new Date().getTime() + +res.data.expiresIn * 1000)

            // Token 超时，前端清掉 Token 做 Logout 动作
            // setTimeout 页面刷，如果同一个站点开两个Tab，会影响计算计算吗？
            // 统一在 initAuth action 里面做判断
            // vuexContext.dispatch('setLogoutTimer', res.data.expiresIn * 1000)
          })
          .catch(e => {
            console.log(e)
          })
      },

      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration)
      },

      initAuth(vuexContext, req) {
        let token = null
        let expirationDate = null

        if (req) {
          if (!req.headers.cookie) {
            return
          }

          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }

          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]

          console.log('=============')
          console.log('Set Token from Cookie')
          console.log('=============')
          // console.log('token in cookie ==> ', token)
          // console.log('expirationDate in cookie ==> ', expirationDate)
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')

          console.log('=============')
          console.log('Set Token from localStorage')
          console.log('=============')
          // console.log('token in localStorage ==> ', token)
          // console.log('expirationDate in localStorage ==> ', expirationDate)

          // if (new Date().getTime() > +expirationDate || !token) {
          //   console.log('Token Expired')
          //   return
          // }
        }

        // 因为我们在 localStorage、Cookie 都写入了超时时间
        // 所以我们发现超时了，就直接清掉 Token （这样我们只需要在一个地方来处理这个逻辑就好）
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')

          // 清掉 Token, 重新授权（middleware/auth.js 重定向到登录页面）
          // vuexContext.commit('clearToken')
          vuexContext.commit('logout')

          return
        }

        // vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
        vuexContext.commit('setToken', token)
      },

      logout(vuexContext) {
        // 移除掉 vuex store token 数据
        vuexContext.commit('clearToken')

        // 删除 cookie token 数据
        Cookie.remove('token')
        Cookie.remove('expirationDate')

        // 删除 localStorage token 数据
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },

      // 提供一个API让需要检查 Token 的地方去调，例如: router protected
      isAuthenticated(state) {
        return !!state.token
      }
    }
  })
}

export default createStore
