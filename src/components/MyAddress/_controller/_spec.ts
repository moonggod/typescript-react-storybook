// http://api.dev2.gfashion.gfashion2020.tk/swagger-ui.html#/gfashion-customer-resource
import { CreateControllerSpec, RequestMethod } from '../../../mock/types'

export const CUSTOMERS_ROUTES = {
  getCustomerById: {
    method: RequestMethod.get,
    path: '/customers/:customerId'
  },
  updateCustomerById: {
    method: RequestMethod.put,
    path: '/customers/:customerId'
  },
  addAddress: {
    method: RequestMethod.put,
    path: '/customers/:customerId/addAddress'
  },
  changeAddress: {
    method: RequestMethod.put,
    path: '/customers/:customerId/changeAddress'
  },
  deleteAddress: {
    method: RequestMethod.delete,
    path: '/customers/:customerId/deleteAddress/:addressId'
  }
}

export type CustomersControllerSpec = CreateControllerSpec<
  typeof CUSTOMERS_ROUTES
>
