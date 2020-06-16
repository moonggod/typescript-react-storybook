// http://api.dev2.gfashion.gfashion2020.tk/swagger-ui.html#/gfashion-customer-resource
import { CreateControllerSpec, RequestMethod } from '../../types'

export const M_LIST_ROUTES = {
  getMessageList: {
    method: RequestMethod.get,
    path: '/customers/getMessageList'
  },
}

export type MListControllerSpec = CreateControllerSpec<
  typeof M_LIST_ROUTES
>
