import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsObject
} from 'class-validator'
import { Type } from 'class-transformer'
import { ContentMock, TitleMock } from './index.mock'
// import { IsSameWith } from './IsSameWith'

export class Content {
  @IsOptional()
  @IsString()
  en: string = ''

  @IsOptional()
  @IsString()
  zh: string = ''
}

export class Title {
  @IsOptional()
  @IsString()
  en: string = ''

  @IsOptional()
  @IsString()
  zh: string = ''
}

export class NotificationItem {
  @IsNotEmpty()
  @IsString()
  category: string = ''

  @IsNotEmpty()
  @IsObject()
  @Type(() => Content)
  content: object = ContentMock.build()

  @IsString()
  _content?: string = ''

  @IsNotEmpty()
  @IsString()
  contract: string = ''

  @IsNotEmpty()
  @IsString()
  data: string = ''

  @IsNotEmpty()
  @IsString()
  id: string = ''

  @IsNotEmpty()
  @IsBoolean()
  opened: boolean = true

  @IsNotEmpty()
  @IsString()
  picture: string = ''

  @IsNotEmpty()
  @IsString()
  receiver: string = ''

  @IsNotEmpty()
  @IsString()
  sender: string = ''

  @IsNotEmpty()
  @IsInt()
  timeOpened: number = 0
  
  @IsNotEmpty()
  @IsInt()
  timeSent: number = 0

  @IsNotEmpty()
  @IsInt()
  timeUpdated: number = 0

  @IsNotEmpty()
  @IsObject()
  @Type(() => Title)
  title: object = TitleMock.build()

  @IsString()
  _title?: string = ''
  
  @IsNotEmpty()
  @IsString()
  updatedBy: string = ''
}

export interface ContentI {
  en?: string
  zh?: string
}

export interface TitleI {
  en?: string
  zh?: string
}

export interface NotificationItemI {
  category: string
  content: Content
  _content?: string
  contract: string
  data: string
  id: string
  opened: boolean
  picture: string
  receiver: string
  sender: string
  timeOpened: number
  timeSent: number
  timeUpdated: number
  title: Title
  _title?: string
  updatedBy: string
}
