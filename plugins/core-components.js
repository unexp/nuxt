import Vue from 'vue'

import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
import PostList from '@/components/UI/PostList'

Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)

// 注意：因为你在这里注入成全局的组件了
// 所以，你在页面使用的时候就不需要在 import

// 没有注入为全局组件前
//
// xx.vue
// import AppButton from '@/components/UI/AppButton'

// exoprt default {
//   components: {
//     AppButton
//   }
// }

// 注入为全局组件之后，上面的代码都不用了，在模板里直接使用
