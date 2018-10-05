<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <section class="featured-posts">

      <!-- extract an component ==> move to components/Posts/PostPreview.vue -->
      <!-- <nuxt-link :to="'/posts/' + 1">
        <article class="post-preview">
          <div class="post-thumbnail" style="background-image:url('https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg')"></div>
          <div class="post-content">
            <h1>Post Title1</h1>
            <p>Preview Text</p>
          </div>
        </article>
      </nuxt-link> -->

      <!-- use component -->
      <PostPreview 
        id="1"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="Hello There!"
        previewText="This my first post!"
      />
      <PostPreview 
        id="2"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="Hello There again!"
        previewText="This my second post!"
      />
      <PostPreview 
        id="3"
        thumbnail="https://www.dreamhost.com/blog/wp-content/uploads/2016/08/DreamHost-Top-Tech-Trends.jpg"
        title="GoodBye!"
        previewText="This my third post!"
      />
      
      <!-- 
        你会发现Post Page的 "post-list" 和首页的 "featured-posts" 结构和样式都一模一样 
        所以可以把这一部分抽成一个组件 components/Post/PostList.vue
      -->
    </section>
    
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PostPreview from '~/components/Posts/PostPreview.vue'

export default {
  components: {
    Logo,
    PostPreview
  }
}
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
