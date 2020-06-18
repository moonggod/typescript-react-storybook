import { CreateControllerSpec, RequestMethod } from '../../../../mock/types'

export const M_DIALOG_ROUTES = {
  getDialogMessageList: {
    method: RequestMethod.get,
    path: '/customers/getDialogMessage/:customerId'
  },
}

export type MessageDialogControllerSpec = CreateControllerSpec<
  typeof M_DIALOG_ROUTES
>
