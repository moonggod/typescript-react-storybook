import { JsonController, Method, Params } from 'routing-controllers'
import { MessageListControllerSpec, M_LIST_ROUTES } from './_spec'
import {
  GetMessageListReq,
  GetMessageListRes,
} from './_types'
import { GetMessageListResMock } from './_types/index.mock'

@JsonController()
export class MessageListController
  implements MessageListControllerSpec {
    @Method(
      M_LIST_ROUTES.getMessageList.method,
      M_LIST_ROUTES.getMessageList.path
    )
    getMessageList(@Params() params: GetMessageListReq): GetMessageListRes {
      console.log(params)
      return GetMessageListResMock.build()
    }
}
