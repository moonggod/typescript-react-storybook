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

  @IsNotEmpty()
  @IsString()
  _content: string = ''

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

  @IsNotEmpty()
  @IsString()
  _title: string = ''
  
  @IsNotEmpty()
  @IsString()
  updatedBy: string = ''
}
