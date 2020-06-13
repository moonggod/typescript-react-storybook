// import i18next from 'i18next'
import Cookies from 'js-cookie'
import { EnumValues } from 'enum-values'
import { COOKIE_LANG } from '../consts'
import { Lang, DEFAULT_LANG } from '../consts'

export function setLang(nextLang: Lang) {
  const preLang = getLang()

  const ONE_YEAR = 365
  Cookies.set(COOKIE_LANG, nextLang, { expires: ONE_YEAR })

  // i18next.changeLanguage(lang) // existing <Link /> would not update automatically (sucks) so that full reload is required as below
  // TODO: any better solution?
  window.location.assign(
    window.location.pathname.replace(new RegExp(`^/${preLang}`), `/${nextLang}`)
  )
}

export function getLang(): Lang {
  const curLang = Cookies.get(COOKIE_LANG)
  if (!curLang) {
    // TODO: detect browser lang instead of returning `DEFAULT_LANG`
    return DEFAULT_LANG
  }
  const isWhitelistedLang = !!EnumValues.getNameFromValue<Lang>(
    Lang,
    curLang as any
  )
  return isWhitelistedLang ? (curLang as Lang) : DEFAULT_LANG
}
