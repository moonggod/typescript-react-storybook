import { CreateControllerSpec, RequestMethod } from '../../../mock/types'

export const LOG_ROUTES = {
  getLogList: {
    method: RequestMethod.get,
    path: '/log/api/:customerId?page={page}'
  },
}

export type LogListControllerSpec = CreateControllerSpec<
  typeof LOG_ROUTES
>
