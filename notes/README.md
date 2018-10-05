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
