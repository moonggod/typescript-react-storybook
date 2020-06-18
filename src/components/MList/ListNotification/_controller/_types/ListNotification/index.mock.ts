import Chance from 'chance'
import * as Factory from 'factory.ts'
import { GetListNotificationRes } from '.'
import {NotificationMock} from '../_Notification/index.mock'

const chance = Chance()

export const GetListNotificationResMock = Factory.Sync.makeFactory<GetListNotificationRes>({
  listNotification: Factory.each(() =>
    NotificationMock.buildList(chance.integer({ min: 3, max: 3 }))
  )
})
