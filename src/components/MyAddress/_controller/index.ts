import { JsonController, Method, Params, Body } from 'routing-controllers'
import { CustomersControllerSpec, CUSTOMERS_ROUTES } from './_spec'
import {
  GetCustomerByIdReq,
  GetCustomerByIdRes,
  UpdateCustomerByIdReqParams,
  UpdateCustomerByIdReqBody,
  UpdateCustomerByIdRes,
  CustomerId,
  Address,
  AddressWithoutId,
  AddressdRes,
  DeleteAddressReq,
  DeleteAddressRes
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

  @Method(CUSTOMERS_ROUTES.addAddress.method, CUSTOMERS_ROUTES.addAddress.path)
  addAddress(@Params() params: CustomerId, @Body() body: Address): AddressdRes {
    console.log(params)
    console.log(body)
    return { data: true }
  }

  @Method(
    CUSTOMERS_ROUTES.changeAddress.method,
    CUSTOMERS_ROUTES.changeAddress.path
  )
  changeAddress(
    @Params() params: CustomerId,
    @Body() body: AddressWithoutId
  ): AddressdRes {
    console.log(params)
    console.log(body)
    return { data: true }
  }

  @Method(
    CUSTOMERS_ROUTES.deleteAddress.method,
    CUSTOMERS_ROUTES.deleteAddress.path
  )
  deleteAddress(@Params() params: DeleteAddressReq): DeleteAddressRes {
    console.log(params)
    return { id: 64 }
  }
}
