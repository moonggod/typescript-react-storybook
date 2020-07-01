import Chance from 'chance'
import * as Factory from 'factory.ts'
import { AddressWithoutId, Address } from '.'

const chance = Chance()

export const AddressWithoutIdMock = Factory.Sync.makeFactory<AddressWithoutId>({
  firstname: Factory.each(() => chance.first()),
  lastname: Factory.each(() => chance.last()),
  company: Factory.each(() => chance.company()),
  telephone: Factory.each(() => chance.phone({ country: 'us' })),
  street: Factory.each(() => chance.street()),
  city: Factory.each(() => chance.city()),
  region_id: Factory.each(() => chance.natural()), // TODO: spec?
  postcode: Factory.each(() => chance.postcode()),
  country_id: Factory.each(() => String(chance.integer({ min: 1, max: 195 }))), // TODO: spec?
  default_billing: Factory.each(() => chance.bool()),
  default_shipping: Factory.each(() => chance.bool())
})

export const AddressMock: Factory.Sync.Factory<Address> = Factory.Sync.makeFactory(
  {
    id: Factory.each(() => chance.natural())
  }
).combine(AddressWithoutIdMock)
