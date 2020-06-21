import Chance from 'chance'
import * as Factory from 'factory.ts'
import { DeleteNotificationRes, MarkReadNotificationRes, GetListNotificationRes } from '.'
import {NotificationItemMock} from '../_Notification/index.mock'

const chance = Chance()

export const _GetListNotificationResMock = Factory.Sync.makeFactory<GetListNotificationRes>({
  listNotification: Factory.each(() =>
    NotificationItemMock.buildList(chance.integer({ min: 5, max: 10 }))
  )
})

export const GetListNotificationResMock = () => _GetListNotificationResMock.build().listNotification

export const DeleteNotificationResMock = Factory.Sync.makeFactory<DeleteNotificationRes>({
  action: chance.word(),
  id: `${chance.integer({ min: 100, max: 500 })}`,
  status: `${chance.integer({ min: 3, max: 3 })}`
})

export const MarkReadNotificationResMock = Factory.Sync.makeFactory<MarkReadNotificationRes>({
  action: chance.word(),
  id: `${chance.integer({ min: 100, max: 500 })}`,
  status: `${chance.integer({ min: 3, max: 3 })}`
})
