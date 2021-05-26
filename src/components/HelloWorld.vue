<template>
  <div class="hello">
    <div>
      <router-link to="/login">Login</router-link>
    </div>
    <h1>{{ $t('welcome') }}</h1>
    <h2>i18n</h2>
    
    <div>
      <button name="language" @click="changeLanguage">切换语言</button>
    </div>
    <h2>Login</h2>
    <div>
      <button name="facebook" @click="loginall('facebook')">Facebook</button>
    </div>
    <div>
      <button name="google" @click="loginall('google')">Google</button>
    </div>
    <div>
      <button name="twitter" @click="loginall('twitter')">Twitter</button>
    </div>
    <h2>Login</h2>
    <div>
      <button name="facebook" @click="shareallshare('facebook')">Facebookshare</button>
    </div>
    <div>
      <button name="google" @click="shareall('google')">Googleshare</button>
    </div>
    <div>
      <button name="google" @click="shareall('google')">twittershare</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    changeLanguage () {
      let that = this
      if (that.$i18n.locale === 'en') {
        that.$cookies.set('language', 'zh-CN', { expires: 365 })
        that.$i18n.locale = 'zh-CN'
      } else {
        that.$cookies.set('language', 'en', { expires: 365 })
        that.$i18n.locale = 'en'
      }
    },
    loginall (name) {
      let that = this
      that.$hello(name).login({ display: 'popup', scope: '' }).then(
        function (data) {
          console.info(data)
        },
        function (e) {
          console.info(e)
        }
      )
    }
  },
  mounted () {
    let that = this
    that.$hello.init({
      facebook: '2534254466852997',
      google: '643593627009-ek6kcghauap9gee8bc370qa7vc2poceh.apps.googleusercontent.com',
      twitter: 'TEA7Wqqt7ygwbsgVgATmH2E6v'
    },{
      // redirect_uri: 'https://www.test.com',
      google_redirect_uri: 'https://dev.dzhaiwai.com'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
