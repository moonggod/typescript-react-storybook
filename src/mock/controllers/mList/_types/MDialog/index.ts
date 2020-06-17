import {
  IsArray,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { DialogMessage } from '../_DialogMessage'
// import { IsSameWith } from './IsSameWith

export class GetDialogMessageListReq {
}

export class GetDialogMessageListRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DialogMessage)
  list: DialogMessage[] = []
}