import Chance from 'chance'
import * as Factory from 'factory.ts'
import { Template } from '.'

const chance = Chance()

export const TemplateMock = Factory.Sync.makeFactory<Template>({
  designer: Factory.each(() => chance.name()),
  time: Factory.each(() => chance.date({string:true})),
  user: Factory.each(() => chance.name()),
  order: Factory.each(() => chance.natural({ min: 1000000, max: 5000000 })),
  service: Factory.each(() => chance.name()),
  status: Factory.each(() => chance.integer({min:0, max: 3})),
  id: Factory.each(() => chance.natural()),
  content: Factory.each(() => chance.sentence()),
})

