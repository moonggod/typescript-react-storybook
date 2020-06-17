import { CreateControllerSpec, RequestMethod } from '../../types'

export const M_LIST_ROUTES = {
  getDialogMessageList: {
    method: RequestMethod.get,
    path: '/customers/getDialogMessage/:customerId'
  },
}

export type MListControllerSpec = CreateControllerSpec<
  typeof M_LIST_ROUTES
>
