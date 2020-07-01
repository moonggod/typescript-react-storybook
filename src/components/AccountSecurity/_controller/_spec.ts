// http://api.dev2.gfashion.gfashion2020.tk/swagger-ui.html#/gfashion-customer-resource
import { CreateControllerSpec, RequestMethod } from '../../../mock/types'

export const ACCOUNT_SECURITY_ROUTES = {
  resetPassword: {
    method: RequestMethod.put,
    path: '/customers/changePassword'
  },
  sendSMSCode: {
    method: RequestMethod.post,
    path: '/customers/:customerId/getVerificationCode'
  },
  checkEmail: {
    method: RequestMethod.post,
    path: '/customers/:customerId/checkEmail' // TODO: get true api url
  },
  bindEmail: {
    method: RequestMethod.post,
    path: '/customers/:customerId/bindEmail' // TODO: get true api url
  }
}

export type AccountSecurityControllerSpec = CreateControllerSpec<
  typeof ACCOUNT_SECURITY_ROUTES
>
