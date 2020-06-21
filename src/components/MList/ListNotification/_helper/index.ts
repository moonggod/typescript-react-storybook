import { NotificationItem } from '../_controller/_types'
import i18next from 'i18next'

/**
 * message list change to diff sort
 * @param list 
 */
export function adaptList(list: [NotificationItem], showNumber: number) {
    let categoryList:any = {}
    const languages = i18next.languages
    let _count = 0
    let categoryOrder:any = []
    list.forEach(item => {
        if (_count > showNumber) return
        const _item = JSON.parse(JSON.stringify(item))
        _item._title = languages[0] === 'en' ? _item.title.en : _item.title.zh
        _item._content = languages[0] === 'en' ? _item.content.en : _item.content.zh
        if (!categoryList[_item.category]) {
            categoryOrder.push(_item.category)
            categoryList[_item.category] = [_item]
            _count += 1
        } else {
            categoryList[_item.category].push(_item)
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