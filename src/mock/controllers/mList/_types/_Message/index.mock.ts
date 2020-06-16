import Chance from 'chance'
import * as Factory from 'factory.ts'
import { Message } from '.'

const chance = Chance()

export const MessageMock = Factory.Sync.makeFactory<Message>({
  designer: Factory.each(() => chance.letter()),
  time: Factory.each(() => chance.letter()),
  user: Factory.each(() => chance.letter()),
  order: Factory.each(() => chance.letter()),
  service: Factory.each(() => chance.letter()),
  status: Factory.each(() => chance.letter())
})
