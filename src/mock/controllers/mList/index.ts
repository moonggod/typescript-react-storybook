import { JsonController, Method, Params } from 'routing-controllers'
import { MListControllerSpec, M_LIST_ROUTES } from './_spec'
import {
  GetMessageListReq,
  GetMessageListRes,
  GetDialogMessageListReq,
  GetDialogMessageListRes,
  
} from './_types'
import { GetMessageListResMock, GetDialogMessageListResMock } from './_types/index.mock'

@JsonController()
export class MListController
  implements MListControllerSpec {
    @Method(
      M_LIST_ROUTES.getMessageList.method,
      M_LIST_ROUTES.getMessageList.path
    )
    getMessageList(@Params() params: GetMessageListReq): GetMessageListRes {
      console.log(params)
      return GetMessageListResMock.build()
    }
    @Method(
      M_LIST_ROUTES.getDialogMessage.method,
      M_LIST_ROUTES.getDialogMessage.path
    )
    getDialogMessage(@Params() params: GetDialogMessageListReq): GetDialogMessageListRes {
      console.log(params)
      return GetDialogMessageListResMock.build()
    }
}
