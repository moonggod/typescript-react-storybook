import {
  IsArray,
  ValidateNested,
  IsInt,
  IsString,
  IsNotEmpty
} from 'class-validator'
import { Type } from 'class-transformer'
import { NotificationItem } from '../_Notification'
// import { IsSameWith } from './IsSameWith'

export class GetListNotificationReq {
  @IsInt()
  limit!: number

  @IsInt()
  secondsAgo!: number
}

export class GetListNotificationRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationItem)
  listNotification: NotificationItem[] = []
}

export class DeleteNotificationReq {
  @IsNotEmpty()
  @IsString()
  id: string = ''
}
export class DeleteNotificationRes {
  @IsNotEmpty()
  @IsString()
  action: string = ''

  @IsNotEmpty()
  @IsString()
  id: string = ''

  @IsNotEmpty()
  @IsString()
  status: string = ''
}
export class MarkReadNotificationReq {
  @IsNotEmpty()
  @IsString()
  id: string = ''
}
export class MarkReadNotificationRes {
  @IsNotEmpty()
  @IsString()
  action: string = ''

  @IsNotEmpty()
  @IsString()
  id: string = ''

  @IsNotEmpty()
  @IsString()
  status: string = ''
}
