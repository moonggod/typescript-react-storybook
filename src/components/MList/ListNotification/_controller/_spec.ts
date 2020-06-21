import { CreateControllerSpec, RequestMethod } from '../../../../mock/types'

export const LIST_NOTIFICATION_ROUTES = {
  getListNotification: {
    method: RequestMethod.get,
    path: '/receive?limit={limit}&secondsAgo={secondsAgo}'
  },
  deleteNotification: {
    method: RequestMethod.delete,
    path: '/delete'
  },
  markReadNotification: {
    method: RequestMethod.post,
    path: '/markRead'
  },
}

export type ListNotificationControllerSpec = CreateControllerSpec<
  typeof LIST_NOTIFICATION_ROUTES
>
