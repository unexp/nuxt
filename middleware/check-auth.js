export default function(context) {
  console.log('[Middleware] Check Auth')

  // nuxtServerInit() 在服务端运行时候访问不到 localStorage
  // 所以我们要检查运行环境（在服务器端，还是在客户的）
  // 在 middleware/check-auth.js 加下面的逻辑
  // if (process.client) {
  //   context.store.dispatch('initAuth')
  // }

  // 加入 Cookie, 服务端需要拿到 cookie，所以要传请求头 context.req
  // if (process.client) {
  //   context.store.dispatch('initAuth', null)
  // } else {
  //   context.store.dispatch('initAuth', context.req)
  // }

  context.store.dispatch('initAuth', context.req)
}


// 把这个 middleware 添加到需要做校验身份的路由
// admin/index.vue
// admin/xx/x.vue (需要校验身份的路由都要添加)