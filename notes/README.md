### server rendering?

### What can you build

- Universal App
- Single Page App
- Static App

### Pages, Routing & Views

```js
pages/index.vue convert to
{
  path: '/',
  component: index.vue
}

file base: `pages/user.vue` convert to
folder base: 通常的写法是 `pages/users/index.vue`
各有各的好处
{
  path: '/user',
  component: user.vue
}
```

### 页面跳转（跳转其它页面）

```html
<!-- 会打开新的页面，向服务器请求这个页面 -->
<a href="/users">Users</a>

<!-- 单页跳转 -->
<nuxt-link to="/users">Nuxt-link to Users page</nuxt-link>

<!-- 程序跳转 -->
methods: {
  viewUser() {
    this.$router.push('/users/' + this.userId)
  }
}
```

### validate params

`/pages/xxx.vue`
可以访问 vue component 所有的 properties
同时 nuxt 还提供了一些其它的 properties

### nested route

```
创建一个 folder
  pages/users/index.vue
  pages/users/\_id.vue

创建一个和文件夹同名的 vue 文件
  pages/users.vue
  这文件里面需要加一跳命令来把 users/index.vue 当中 nested route 加载进来
  <nuxt-child />
```

## Layout

default.vue nuxt 预留 vue
error.vue nuxt 预留 (nuxt 提供了一个默认的 error layout, 你可以通过 layout/error.vue 来定义你自己的 error page)

// custom layout
user.vue

Nuxt 会创建一个 index.html(你看不到这个 html) 然后把 layout 引进去！
有点像你在写 Vue 的时候：

```html
<!DOCTYPE html>
<html><head></head><body>
  <div id="app">
    Layout will ben loaded here~
  </div>
</body></html>
```

如何指定页面使用哪个 Layout?
pages/admin/index.vue (注意，admin/下 每个页面都需要加上)
pages/admin/xx/xx.vue (注意，admin/下 每个页面都需要加上)

```js
export default {
  ...
  data() { return {} }
  ...

  layout: 'admin', // 指定用哪个 Layout/admin

  ...
}
```

## components

can use in components
can use in pages
can use layout

## styles in nuxt

`style in component`
`style in pages`
`style in layout`

`style in global` (in assest/ folder)
should loaded every pages:
go to "nuxt.config.js" find:

```
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css'
  ],
```

`inline style`
v-bind:style
v-bind:class

## Router

Nuxt use Vue-Router
in Nuxt just use vue-router as you know

## Handling Data & Vuex

## asyncData()

```js
  // callback base
  asyncData(context, callback) {
    // context 里面有哪些东西？

    // 第一个参数是 error, 第二个参数是返回的数据
    callback(null, {

    })

    // what if we asyncData fail?
    // Nuxt 会跳到 layout/error.vue 错误页面！
    callback(new Error(), {

    })
  }

  // promise base
  asyncData(context) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功
      resolve({
        loadedPost: {
          id: '1',
          author: 'Byer',

          // 注意在 asyncData `this.$route.params` 是不可以的
          // 因为 this 指向的不是 vue instance (asyncData 在 vue instance 创建之前就运行了)
          // 所以要用 `context.params`
          title: 'My awesome Post (ID: ' + context.route.params.id +')',

          updatedDate: new Date(),
          content: 'The command line is a user interface that doesn’t get enough attention in the world of JavaScript development. The reality is that most dev tools should have a CLI to be utilized by nerds like us, and the user experience should be on par with that of your meticulously-created web app. This includes a nice design, helpful menus, clean error messages and outputs, loading indicators and progress bars, and so on.',
          previewText: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack.',
          thumbnail: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
        }
      })

      // 失败
      // reject(new Error())
    }, 1000)
  }).then(data => {
    return data
  }).catch(e => {
    context.error(e)
  })
```

## Loaded Data in Store/Vuex

有些数据跨模块使用，我们不想每个模块/pages 都去加载，我们想把数据加载到 Store 里
Vuex in Nuxt.js

- Classic Mode
- Modules Mode

区别可以看一下 notes/images/vuex in nuxt

create `store/index.js` Nuxt 会帮我们注入到每个 component
然后你到一个 component 里就可以使用：

```js
  created() {
    // 因为Nuxt会把store注入每个 component, 所以这里我们可以直接用
    //
    // 但是，这并不是最好的方式！
    // we should loaded our store in the server first loaded pages
    // 而不是通过 asyncData 去取数据（虽然也是在服务端运行）
    this.$store.dispatch('setPosts', this.loadedPosts)
    console.log(this.$store)
  }
```

// 如上面的备注：我们想页面在服务端第一次加载的时候就 加载我们的 Store
// 我们使用 fetch() 代替 asyncData(), 然后在 then() 里把数据放到 store
// fetch() 和 asyncData() 一样是 Nuxt 提供的 property, 用法几乎一样
// 但是必须返回 Promise

// nuxtServerInit() 了解下

## fetch data on the server (our server)

nuxt run on the server

checkout firebase
使用 firebase 提供的 databse

## 注意一点！

尽管 Nuxt 可以在服务端渲染，但是它和 express 不一样！
所以，nuxt 我们不会直接去连接数据库、操作数据库！我们可以访问一些服务端的资源 例如 request 的参数等等
不能把 Nuxt 当中 backend!
它和普通的 SPA 是一样的，不同的是，Nuxt 可以在服务端（服务器上）去请求后端的接口（把数据拿回来）
然后把 index.html 渲染好再把 index.html 传给前端！

just do pre-render

## Nuxt Config, Plugins & Modules

Extending Functionality

```base
`nuxt.config.js` (render by nuxt)

nuxt.config.js

module.exports = {

}
```

## Middleware & Authentication

#### Middleware 使用常见有哪些？-- before you enter new route 需要执行的代码

**middleware are a function and run, before the route/page is loaded**
**if middleware function are async -- you should return Promise**
**if middleware function are sync -- you don't need to return anything**
**will run on the server in the first loaded, alose run on the client!**

need attached to our pages

```
xx.vue
export default {
  ...
  middleware: 'log'
}
```

````
// Need attached to our pages/layout (or to both)
// ```
// attach to pages/xx.vue
// export default {
//   ...
//   middleware: 'log'
// }
// ```
//
// attach to layout/xx.vue
// export default {
//   ...
//   middleware: 'log'
// }
// ```

// Also you can attach to nuxt.config.js => router: {}
// nuxt.config.js
// module.exports = {
//   router: {
//      middleware: 'log'
//   }
// }
// ```
````

### 使用 firebase 提供的 Authentication RESTFul API

https://firebase.google.com/docs/reference/rest/auth/

401 Unauthorized => error: "Permission denied"
