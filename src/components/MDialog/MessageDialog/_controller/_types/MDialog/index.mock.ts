import Chance from 'chance'
import * as Factory from 'factory.ts'
import { GetDialogMessageListRes } from '.'
import {DialogMessageMock} from '../_DialogMessage/index.mock'

const chance = Chance()

export const GetDialogMessageListResMock = Factory.Sync.makeFactory<GetDialogMessageListRes>({
  dialogMessageList: Factory.each(() =>
    DialogMessageMock.buildList(chance.integer({ min: 7, max: 7 }))
  )
})
