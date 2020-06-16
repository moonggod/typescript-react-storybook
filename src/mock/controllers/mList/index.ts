import { JsonController, Method, Params } from 'routing-controllers'
import { MListControllerSpec, M_LIST_ROUTES } from './_spec'
import {
  GetMessageListReq,
  GetMessageListRes,
} from './_types'
import { GetMessageListResMock } from './_types/MList/index.mock'

@JsonController()
export class MListController
  implements MListControllerSpec {
  @Method(
    M_LIST_ROUTES.getMessageList.method,
    M_LIST_ROUTES.getMessageList.path
  )
  getMessageList(@Params() params: GetMessageListReq): GetMessageListRes {
    return GetMessageListResMock.build()
  }
}
