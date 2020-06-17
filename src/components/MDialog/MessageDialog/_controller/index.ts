import { JsonController, Method, Params } from 'routing-controllers'
import { getDialogMessageSpec, M_LIST_ROUTES } from './_spec'
import {
  GetDialogMessageListReq,
  GetDialogMessageListRes,
} from './_types'
import { GetDialogMessageListResMock } from './_types/index.mock'

@JsonController()
export class MessageDialogController
  implements MessageDialogControllerSpec {
    @Method(
      M_LIST_ROUTES.getDialogMessage.method,
      M_LIST_ROUTES.getDialogMessage.path
    )
    getDialogMessage(@Params() params: GetDialogMessageListReq): GetDialogMessageListRes {
      console.log(params)
      return GetDialogMessageListResMock.build()
    }
}
