import Chance from 'chance'
import * as Factory from 'factory.ts'
import { GetMessageListRes } from '.'
import {MessageMock} from '../_Message/index.mock'

const chance = Chance()

export const GetMessageListResMock = Factory.Sync.makeFactory<GetMessageListRes>({
  messageList: Factory.each(() =>
    MessageMock.buildList(chance.integer({ min: 7, max: 7 }))
  )
})
