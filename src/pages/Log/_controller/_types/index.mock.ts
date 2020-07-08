import Chance from 'chance'
import * as Factory from 'factory.ts'
import { Log, GetLogListRes } from '.'

const chance = Chance()

export const LogMock = Factory.Sync.makeFactory<Log>({
  designer: Factory.each(() => chance.name()),
  time: Factory.each(() => chance.date({string:true})),
  user: Factory.each(() => chance.name()),
  order: Factory.each(() => chance.natural({ min: 1000000, max: 5000000 })),
  service: Factory.each(() => chance.name()),
  status: Factory.each(() => chance.integer({min:0, max: 3})),
  id: Factory.each(() => chance.natural()),
  content: Factory.each(() => chance.sentence()),
})

export const GetLogListResMock = Factory.Sync.makeFactory<GetLogListRes>({
  list: Factory.each(() =>
    LogMock.buildList(chance.integer({ min: 7, max: 7 }))
  )
})

