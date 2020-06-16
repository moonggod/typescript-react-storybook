// http://api.dev2.gfashion.gfashion2020.tk/swagger-ui.html#/gfashion-customer-resource
import { CreateControllerSpec, RequestMethod } from '../../types'

export const CUSTOMERS_ROUTES = {
  getCustomerById: {
    method: RequestMethod.get,
    path: '/customers/:customerId'
  },
  updateCustomerById: {
    method: RequestMethod.put,
    path: '/customers/:customerId'
  }
}

export type CustomersControllerSpec = CreateControllerSpec<
  typeof CUSTOMERS_ROUTES
>
