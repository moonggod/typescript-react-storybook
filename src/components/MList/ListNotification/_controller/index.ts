import { JsonController, Method, Params } from 'routing-controllers'
import { ListNotificationControllerSpec, LIST_NOTIFICATION_ROUTES } from './_spec'
import {
  GetListNotificationReq,
  GetListNotificationRes,
} from './_types'
import { GetListNotificationResMock } from './_types/index.mock'

@JsonController()
export class ListNotificationController
  implements ListNotificationControllerSpec {
    @Method(
      LIST_NOTIFICATION_ROUTES.getListNotification.method,
      LIST_NOTIFICATION_ROUTES.getListNotification.path
    )
    getListNotification(@Params() params: GetListNotificationReq): GetListNotificationRes {
      console.log(params)
      return GetListNotificationResMock.build()
    }
}
