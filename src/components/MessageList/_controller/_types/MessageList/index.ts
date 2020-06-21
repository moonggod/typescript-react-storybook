import {
  IsArray,
  ValidateNested,
  IsInt
} from 'class-validator'
import { Type } from 'class-transformer'
import { Message } from '../_Message'
// import { IsSameWith } from './IsSameWith'
export class Customer {
  @IsInt()
  customerId!: number
}

export class GetMessageListReq extends Customer {
}

export class GetMessageListRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Message)
  messageList: Message[] = []
}