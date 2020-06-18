import { JsonController, Method, Params } from 'routing-controllers'
import { MessageDialogControllerSpec, M_DIALOG_ROUTES } from './_spec'
import {
  GetDialogMessageListReq,
  GetDialogMessageListRes,
} from './_types'
import { GetDialogMessageListResMock } from './_types/index.mock'

@JsonController()
export class MessageDialogController
  implements MessageDialogControllerSpec {
    @Method(
      M_DIALOG_ROUTES.getDialogMessageList.method,
      M_DIALOG_ROUTES.getDialogMessageList.path
    )
    getDialogMessageList(@Params() params: GetDialogMessageListReq): GetDialogMessageListRes {
      console.log(params)
      return GetDialogMessageListResMock.build()
    }
}
