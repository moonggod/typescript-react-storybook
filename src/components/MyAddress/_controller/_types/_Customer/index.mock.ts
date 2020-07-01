import Chance from 'chance'
import * as Factory from 'factory.ts'
import { AddressMock } from '../_Address/index.mock'
import { Customer } from '.'

const chance = Chance()

export const CustomerMock = Factory.Sync.makeFactory<Customer>({
  id: Factory.each(() => chance.natural()),
  avatar: Factory.each(() => chance.avatar()),
  dob: Factory.each(() => chance.word()),
  email: Factory.each(() => chance.email()),
  store_id: Factory.each(() => chance.natural()),
  addresses: Factory.each(() =>
    AddressMock.buildList(chance.integer({ min: 0, max: 6 }))
  )
})
