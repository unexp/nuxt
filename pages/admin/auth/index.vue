<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AdminAuthPage',
  layout: 'admin', // 指定用哪个 Layout/admin
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      email: '',
      password: '',
      isLogin: true
    }
  },

  methods: {
    onSubmit() {
      console.log('======')
      console.log(process.env) // process.env is empty -- why?
      console.log('======')
      
      // 把这部分挪到 store/index.js => action
      // const fbAPIKey = 'AIzaSyDHefltbDHfBLtO2Tc3__lHXxHp4wCwXWE'
      // let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + fbAPIKey
      // if (!this.isLogin) {
      //   URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + fbAPIKey
      // }

      // this.$axios.$post(URL, {
      //   email: this.email,
      //   password: this.password,
      //   returnSecureToken: true
      // }).then(res => {
      //   // 得到的数据
      //   // {
      //   //   "kind": "identitytoolkit#SignupNewUserResponse",
      //   //   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2OThjZmNlMTgzNWZjNDZmNWVhZWZjOGJmOTMwNjk0OGQ2OTFmMGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV4dC03ZGU5YyIsImF1ZCI6Im51eHQtN2RlOWMiLCJhdXRoX3RpbWUiOjE1Mzg3OTQ4MjAsInVzZXJfaWQiOiIxT25QZnIxT2RNYUh6UDJoU0JMRWZrR0RVajczIiwic3ViIjoiMU9uUGZyMU9kTWFIelAyaFNCTEVma0dEVWo3MyIsImlhdCI6MTUzODc5NDgyMCwiZXhwIjoxNTM4Nzk4NDIwLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ue6JwN-H9D5ub9r9fIzTfU2ss9u-wEpc0kLwphgEymeHk6iCg3Ckv1C8PeDzIwXH14yzWTG8NvlyL8fTbGjquaGh1AlsORG-50PIeDJhCmhsmsz5TsdFiQ_fU4Ua_4CmWYQdASTN3UReSBpVslMDiu4eGB4fLJLtm5jcCDa_JgZiuXs1vFu8RRh8nH1AkfNaFP8JFYDmor2ZVIcaRnkOWf2E2ZqZYe4cG-norQnRIlKeoPZM-4BzZtk843twv2H53Lcizfpfd2pdAVI4mbEXo_M6b10fYe1Ibnt00AdurphiM6je2v5PxIMqRWEKtIQgAzjypxOgqaVor6d_angb7A",
      //   //   "email": "test@gmail.com",
      //   //   "refreshToken": "AEXAG-caBiaGmrxvkZu_4Jexj1AXXovAG-CxPJTHVYEyADEvAQBqGYnuGkDgTmp18ZUSc_m0X3lA5ng0Q6eG1iLX8oOzteAghZyjgYKY7JYy6G0Sl40upmaavweCcUn8kwqpUN-VOBqb6oidoEoqhUZ7kP6FaZ17plciymP7Naxys47vSrwpjg3OZSx6Jugfy_YnjKD8AI0V",
      //   //   "expiresIn": "3600",
      //   //   "localId": "1OnPfr1OdMaHzP2hSBLEfkGDUj73"
      //   // }

      //   // 注意：
      //   // 服务器会给你一个JWT Token, 前端需要存起来！
      //   // 后面需要校验身份的请求需要把 Token 带过去！

      //   console.log(res)
      // }).catch(e => {
      //   console.log(e)
      // })

      // dispatch store action
      this.$store.dispatch('authenticateUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>

