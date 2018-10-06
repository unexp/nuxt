const pkg = require('./package')

// https://nuxtjs.org/guide/configuration
module.exports = {
  mode: 'universal', // spa、universal

  /*
  ** Headers of the page 
  ** will added to every render pages
  **
  ** 如果某个页面想要特别的 head 怎么处理？
  ** 在 pages/XX.vue, 用 head property 来做overwrite
  ** export default {
  **  ...
  **  head: {
  **   title: 'A Blog Post',
  **   meta: [] 
  **   ...
  ** }
  }
  */
  head: {
    title: pkg.name, // package.json => name
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet'
        // href: 'https://fonts.googleapis.com/css?family=Montserrat'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  ** 
  ** 如果你不想要，loading: false
  ** 其它 properties: height: '4px', duration: 5000, failedColor: blue
  */
  loading: { color: '#fff' },

  /*
  ** 如果 mode: 'spa', 还可以加这个
  **
  */
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#fa923f'
  // },

  /*
  ** Global CSS
  ** will inject to erery render pages
  */
  css: [
    // '~assets/css/main.css',
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  ** 什么时候、场景可以用？
  ** 可以帮你在 App mounting 之前，加载执行一些功能（函数）/执行一些代码 (you can run any JS code)
  ** 例如一些：多个模块都使用到的 UI component, 或者使用频率很高的 utils
  */
  plugins: [
    // 例如一些多模块都用到的 components
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  ** 理解为可以为你的Nuxt 添加方便性，例如：可以加入很多第三方的模块（bootstrap, axios...）
  ** added utities function in our App
  **
  ** https://github.com/nuxt-community/awesome-nuxt#modules
  ** 
  ** 例如 nuxtjs/axios 因为与 nuxt.js 整合了，所以使用上会提供一下方便
  ** 通常你使用 axios 模块，你需要：
  ** import axios from 'axios'
  ** axios.get/post(...).then(res => console.log(res)) ==> 注意：普遍axios返回数据是放到 res.data 里
  **
  ** 如果使用 nuxtjs/axios 模块，你可以
  ** 不再需要 import axios from 'axios'了
  ** 在 vue instance 里可以：this.$axios.get/post(...) ==> 注意：nuxtjs/axios 返回的数据你可以直接用 data (帮你取出来了)
  ** 在 nuxt 提供的一些property 里，例如 asyncData(vueContext, callback) { vueContext.app.$axios.get/post() }
  */
  modules: ['@nuxtjs/axios'],

  // with use axios module you can add axios config on your nuxt.config.js file
  axios: {
    // proxyHeaders: false,
    //
    // baseURL: process.env.BASE_URL || 'https://nuxt.firebaseio.com',
    // 当你使用的时候 `this.$axios.get('api/user.json') {...}` baseURL 都不用提供了
    //
    // 如果使用的 RESTFul API, 是不需要带 cookie 的
    // credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  },

  // dev: false
  // 这一项会被 package.json => scripts: 覆盖掉！
  // "dev": "nuxt", --运行这个时候会设为 false
  // "build": "nuxt build",
  // "start": "nuxt start", --运行这个时候会设为 false

  env: {
    // reference global variable via here
    // baseUrl: process.env.BASE_URL || 'https://nuxt.firebaseio.com'
    // 使用 process.env.BASE_URL(这类的变量也叫系统环境变量) 的好处是：
    // 你不用改动你的代码，只需要在服务器上设置一下系统变量就可以了 export BASE_URL=https://api.mydomain.com
  },

  // static site generate settings
  // generate: {}

  // setting Nuxt server living
  // nuxt where to look you file,
  // default is set to '/'
  //
  // rootDir: '/'

  // overwire setting vue-router
  // 如果你想覆盖 nuxt 默认提供的 router 功能 (一般你都不会去设置它)
  // 可设置的 property 和 vue-router 一样！
  router: {
    // base: '/my-app/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: '*',
    //     component: resolve(__diranme, 'pages/index.vue')
    //   })
    // },
    // linkActiveClass: 'active'
  },

  // Nuxt 帮你生成路由的时候使用哪个目录下的文件，默认是 "./pages/"
  // 如果你设置 './client-app/', 那么就要用到这个设置（但是没事别瞎改，没什么卵用，尽量保持和社区一样）
  // srcDir: 'client-app/'

  // page transition animation during route change
  // transition: 'page' // css class-name - string
  //
  // 也可以是 object
  transition: {
    name: 'fade', // fade 使我们定义的 css class-name (在assets/styles/main.css), 去看一下页面间跳转有啥变化
    mode: 'out-in'
  }
}
