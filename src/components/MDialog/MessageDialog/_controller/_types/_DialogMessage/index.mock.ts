import Chance from 'chance'
import * as Factory from 'factory.ts'
import { DialogMessage } from '.'

const chance = Chance()

export const DialogMessageMock = Factory.Sync.makeFactory<DialogMessage>({
  name: Factory.each(() => chance.name()),
  time: Factory.each(() => chance.date({string:true})),
  status: Factory.each(() => chance.integer({min:0, max: 3})),
  type: Factory.each(() => chance.integer({min:0, max: 1})),
  id: Factory.each(() => chance.natural()),
  content: Factory.each(() => chance.sentence()),
  avatar: Factory.each(() => chance.avatar({fileExtension: 'jpg'})),
})

