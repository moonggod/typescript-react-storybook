import {
  IsNotEmpty,
  ValidateNested,
  IsInt,
  IsArray,
} from 'class-validator'
import { Type } from 'class-transformer'
import { DialogMessage } from '../_DialogMessage'
// import { IsSameWith } from './IsSameWith

export class GetDialogMessageListReq {
  @IsNotEmpty()
  @IsInt()
  customerId: number = 0
}

export class GetDialogMessageListRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DialogMessage)
  dialogMessageList: DialogMessage[] = []
}