import { CreateControllerSpec, RequestMethod } from '../../../mock/types'

export const M_LIST_ROUTES = {
  getMessageList: {
    method: RequestMethod.get,
    path: '/customers/getMessageList/:customerId'
  },
}

export type MessageListControllerSpec = CreateControllerSpec<
  typeof M_LIST_ROUTES
>
