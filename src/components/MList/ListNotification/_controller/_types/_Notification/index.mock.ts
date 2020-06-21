import Chance from 'chance'
import * as Factory from 'factory.ts'
import { NotificationItem, Content, Title } from '.'

const chance = Chance()

export const ContentMock = Factory.Sync.makeFactory<Content>({
  en: Factory.each(() => chance.sentence()),
  zh: Factory.each(() => chance.sentence())
})

export const TitleMock = Factory.Sync.makeFactory<Title>({
  en: Factory.each(() => chance.sentence()),
  zh: Factory.each(() => chance.sentence())
})

export const NotificationItemMock = Factory.Sync.makeFactory<NotificationItem>({
  category: Factory.each(() => chance.name()),
  title: Factory.each(() => chance.sentence()),
  _title: Factory.each(() => chance.sentence()),
  content: Factory.each(() => chance.paragraph()),
  _content: Factory.each(() => chance.paragraph()),
  contract: Factory.each(() => chance.phone()),
  data: Factory.each(() => chance.word()),
  opened: Factory.each(() => chance.bool()),
  picture: Factory.each(() => chance.url()),
  id: Factory.each(() => chance.guid()),
  sender: Factory.each(() => chance.name()),
  timeOpened:Factory.each(() => chance.hammertime()),
  timeSent:Factory.each(() => chance.hammertime()),
  timeUpdated:Factory.each(() => chance.hammertime()),
  updatedBy: Factory.each(() => chance.name()),
  receiver: Factory.each(() => chance.name()),
})

