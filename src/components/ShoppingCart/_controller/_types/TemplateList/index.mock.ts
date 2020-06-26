import Chance from 'chance'
import * as Factory from 'factory.ts'
import { GetTemplateListRes } from '.'
import {TemplateMock} from '../_Template/index.mock'

const chance = Chance()

export const GetTemplateListResMock = Factory.Sync.makeFactory<GetTemplateListRes>({
  messageList: Factory.each(() =>
    TemplateMock.buildList(chance.integer({ min: 7, max: 7 }))
  )
})
