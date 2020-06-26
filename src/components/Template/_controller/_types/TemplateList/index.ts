import {
  IsArray,
  ValidateNested,
  IsInt
} from 'class-validator'
import { Type } from 'class-transformer'
import { Template } from '../_Template'
// import { IsSameWith } from './IsSameWith'
export class Customer {
  @IsInt()
  customerId!: number
}

export class GetTemplateListReq extends Customer {
}

export class GetTemplateListRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Template)
  templateList: Template[] = []
}