import { JsonController, Method, Params, Body } from 'routing-controllers'
import { CustomersControllerSpec, CUSTOMERS_ROUTES } from './_spec'
import {
  GetCustomerByIdReq,
  GetCustomerByIdRes,
  UpdateCustomerByIdReqParams,
  UpdateCustomerByIdReqBody,
  UpdateCustomerByIdRes
} from './_types'
import { GetCustomerByIdResMock } from './_types/GetCustomerById/index.mock'

@JsonController()
export class CustomersController implements CustomersControllerSpec {
  @Method(
    CUSTOMERS_ROUTES.getCustomerById.method,
    CUSTOMERS_ROUTES.getCustomerById.path
  )
  getCustomerById(@Params() params: GetCustomerByIdReq): GetCustomerByIdRes {
    return GetCustomerByIdResMock.build({
      id: params.customerId
    })
  }

  @Method(
    CUSTOMERS_ROUTES.updateCustomerById.method,
    CUSTOMERS_ROUTES.updateCustomerById.path
  )
  updateCustomerById(
    @Params() params: UpdateCustomerByIdReqParams,
    @Body() body: UpdateCustomerByIdReqBody
  ): UpdateCustomerByIdRes {
    console.log(params)
    console.log(body)
    return {}
  }
}
