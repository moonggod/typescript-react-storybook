import { CreateControllerSpec, RequestMethod } from '../../../mock/types'

export const TEMPLATE_ROUTES = {
  getTemplateList: {
    method: RequestMethod.get,
    path: '/template/api/:id'
  },
}

export type TemplateListControllerSpec = CreateControllerSpec<
  typeof TEMPLATE_ROUTES
>
