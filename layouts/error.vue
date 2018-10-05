<template>
  <div class="error-page">
    <h1>Oops, something went wrong!</h1>

    <!-- 
      注意这里最好需要 <a href=""> 做跳转
      因为到这个页面你的 App 可能是挂掉了
      所以，当然是重新打开页面重新请求服务器最好了！
     -->
    <p>Back to <a href="/">safety</a>!</p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
