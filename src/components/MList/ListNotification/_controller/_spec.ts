import { CreateControllerSpec, RequestMethod } from '../../../../mock/types'

export const LIST_NOTIFICATION_ROUTES = {
  getListNotification: {
    method: RequestMethod.get,
    path: '/message/v1/receive?limit=${limit}&secondsAgo=${secondsAgo}'
  },
  deleteNotification: {
    method: RequestMethod.delete,
    path: '/message/v1/delete'
  },
  markNotification: {
    method: RequestMethod.post,
    path: '/message/v1/markRead'
  },
}

export type ListNotificationControllerSpec = CreateControllerSpec<
  typeof LIST_NOTIFICATION_ROUTES
>
