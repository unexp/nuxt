// middleware are a function and run, before the route/page is loaded
// if middleware function are async -- you should return Promise
// if middleware function are sync -- you don't need to return anything
// will run on the server in the first loaded, alose run on the client!

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

export default function(context) {
  console.log('[Middleware] The Log Middleware is running')
}
