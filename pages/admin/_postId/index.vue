<template>
  <div class="admin-post-page">
    <!-- 因为 new post page 和 edit post page 都用到这个form 所以把它抽成组件 -->
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>

</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin', // 指定用哪个 Layout/admin
  components: {
    AdminPostForm
  },

  // data() {
  //   return {
  //     loadedPost: {
  //       author: 'Byer',
  //       title: 'My awesome Post',
  //       content: 'Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.',
  //       thumbnailLink: 'https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg'
  //     }
  //   }
  // },

  asyncData(context, callback) {
    // setTimeout(() => {
    //   // axios.get('https://api.github.com/users/google').then(res => {
    //   //   console.log(res)
    //   // })

    //   // 网络太尼玛慢了！
    //   axios.get('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json')
    //   .then(res => {
    //     console.log(res)
    //     callback(null, {
    //       loadedPost: res.data
    //     })
    //   })
    //   .catch(e => {
    //     context.error(e)
    //   })
    // }, 1000)

    // return axios.get('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json')
    // .then(res => {
    //   console.log(res)

    //   return {
    //     loadedPost: res.data
    //   }
    // })
    // .catch(e => {
    //   context.error(e)
    // })

    // axios.get('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json')
    axios.get('https://nuxt-7de9c.firebaseio.com/posts/' + context.params.postId + '.json')
    .then(res => {
      console.log(res)
      console.log('context.params.postId', context.params.postId)
      callback(null, {
        loadedPost: { ...res.data, id: context.params.postId }
      })
    })
    .catch(e => {
      context.error(e)
    })

    // Not work!!! -- i don't know why
    // return axios.get('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json').then(res => {
    //   console.log(res)

    //   return {
    //     loadedPost: res.data
    //   }
    // }).catch(e => {
    //   context.error(e)
    // })
  },

  // async asyncData({ app }) {
  //   const res = await app.$axios.$get('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json')
  //   console.log(res)
  //   return { loadedPost: res.data }
  // },

  methods: {
    onSubmitted(editedPost) {
      console.log('editedPost', editedPost)

      // axios.put('https://nuxt-7de9c.firebaseio.com/posts/' + this.$route.params.postId + '.json', editedPost)
      // axios.put('https://nuxt-7de9c.firebaseio.com/posts/-LO2w4gbGiae30R3gSPH.json', editedPost).then(res => {
      //   console.log(res)

      //   // 更新完 POST 之后回到管理员页面！但是页面的数据是不会更新！
      //   // 因为我们更新数据到数据库，而管理员页面的数据是送 store 里面取的，
      //   // store 是在 nuxtServerInit 时候就放到 store 里了
      //   // 所以，得想办法把修改的数据，更新到store!
      //   // 一种方式是，在这里 commit 到 store, 但是如果多处修改那每一处都需要 commit 到 store
      //   // 另外一种是在 store 里创建 mutation 和 actions (通常都会使用这种)
      //   this.$router.push('/admin')
      // }).catch(e => {
      //   console.log(e)
      // })

      // 调用 store 里的 actions
      this.$store.dispatch('editPost', editedPost).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>

