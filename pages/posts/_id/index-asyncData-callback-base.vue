<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>

      <p class="post-content">{{ loadedPost.content }}</p>
    </section>

    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:byer.wu@gmail.com">byer.wu@gmail.com</a></p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
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
    }, 1000)
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

