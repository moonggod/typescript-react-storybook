import { NotificationItem } from '../_controller/_types'
import i18next from 'i18next'

export const CATEGORY_ORDER = ['normal']

/**
 * message list change to diff sort
 * @param list 
 * @param showNumber 
 */
export function adaptList(list: [NotificationItem], showNumber: number) {
    let categoryList:any = {}
    const languages = i18next.languages
    let _count = 1
    let categoryOrder:any = []
    const category = CATEGORY_ORDER[0]
    list.forEach(item => {
        if (_count > showNumber) return
        const _item = JSON.parse(JSON.stringify(item))
        _item._title = languages[0] === 'en' ? _item.title.en : _item.title.zh
        _item._content = languages[0] === 'en' ? _item.content.en : _item.content.zh
        if (!categoryList[category]) {
            categoryOrder.push(category)
            categoryList[category] = [_item]
            _count += 1
        } else {
            categoryList[category].push(_item)
            _count += 1
        }
    })
    return {
        categoryOrder,
        categoryList
    }
}
/**
 * 获取对应类型的数组
 * @param myList
 * @param c 
 */
export function switchHelper(myList:any, c:string) {
    return myList[c]
}

/**
 * 算出消息发出时间对应的已过去的时间
 * @param time
 */
export function getElapsedTime(time:number) {
    const _time = (new Date().getTime()) - time
    const days = Math.floor(_time / (24*60*60*1000))
    const hours = Math.floor(_time / (60*60*1000)) % 24
    const minutes = Math.floor(_time / (60*1000)) % (24 * 60)
    const seconds = Math.floor(_time / (1000)) % (24 * 60 * 60)
    let unit = ''
    if (days) {
        unit = 'days_ago'
    } else if (hours) {
        unit = 'hours_ago'
    } else if (minutes) {
        unit = 'minutes_ago'
    } else if (seconds) {
        unit = 'seconds_ago'
    }
    return {
        result: days || hours || minutes || seconds,
        unit: unit
    }
}