import { CreateControllerSpec, RequestMethod } from '../../../../mock/types'

export const LIST_NOTIFICATION_ROUTES = {
  getListNotification: {
    method: RequestMethod.get,
    path: '/customers/getListNotification/:customerId'
  },
}

export type ListNotificationControllerSpec = CreateControllerSpec<
  typeof LIST_NOTIFICATION_ROUTES
>
