import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import { DatePicker, Pagination } from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'


Vue.use(VueI18n)
Vue.use(DatePicker)
Vue.use(Pagination)

function loadLocaleMessages () {
  const locales = require.context('./langs', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  messages.en = {
    ...messages.en,
    ...enLocale
  }
  messages['zh-CN'] = {
    ...messages['zh-CN'],
    ...zhLocale
  }
  return messages
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  fallbackLocale: Cookies.get('language') || 'en',
  messages: loadLocaleMessages()
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
