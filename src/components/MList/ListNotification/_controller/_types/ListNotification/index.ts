import {
  IsArray,
  ValidateNested,
  IsInt
} from 'class-validator'
import { Type } from 'class-transformer'
import { Notification } from '../_Notification'
// import { IsSameWith } from './IsSameWith'

export class GetListNotificationReq {
  @IsInt()
  customerId!: number
}

export class GetListNotificationRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Notification)
  listNotification: Notification[] = []
}