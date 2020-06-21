import { JsonController, Method, Body, QueryParams } from 'routing-controllers'
import { ListNotificationControllerSpec, LIST_NOTIFICATION_ROUTES } from './_spec'
import {
  GetListNotificationReq,
  GetListNotificationRes,
  DeleteNotificationReq,
  DeleteNotificationRes,
  MarkReadNotificationReq,
  MarkReadNotificationRes
} from './_types'
import { GetListNotificationResMock, DeleteNotificationResMock, MarkReadNotificationResMock } from './_types/index.mock'

@JsonController()
export class ListNotificationController
  implements ListNotificationControllerSpec {
    @Method(
      LIST_NOTIFICATION_ROUTES.getListNotification.method,
      LIST_NOTIFICATION_ROUTES.getListNotification.path.split('?')[0]
    )
    getListNotification(@QueryParams() query: GetListNotificationReq): GetListNotificationRes['listNotification'] {
      console.log(query)
      return GetListNotificationResMock()
    }
    @Method(
      LIST_NOTIFICATION_ROUTES.deleteNotification.method,
      LIST_NOTIFICATION_ROUTES.deleteNotification.path
    )
    deleteNotification(@Body() body: DeleteNotificationReq): DeleteNotificationRes {
      console.log(body)
      return DeleteNotificationResMock.build()
    }
    @Method(
      LIST_NOTIFICATION_ROUTES.markReadNotification.method,
      LIST_NOTIFICATION_ROUTES.markReadNotification.path
    )
    markReadNotification(@Body() body: MarkReadNotificationReq): MarkReadNotificationRes {
      console.log(body)
      return MarkReadNotificationResMock.build()
    }
}
