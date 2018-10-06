export default function(context) {
  console.log('[Middleware] The Auth Middleware is running')
  // 如果没有 Token
  console.log('isAuthenticated', context.store.getters.isAuthenticated)

  if (!context.store.getters.isAuthenticated) {
    console.log('isAuthenticated', context.store.getters.isAuthenticated)
    context.redirect('/admin/auth')
  }
}


// 把这个 middleware 添加到需要做校验身份的路由
// admin/index.vue
// admin/xx/x.vue (需要校验身份的路由都要添加)