import { JsonController, Method, Params } from 'routing-controllers'
import { TemplateListControllerSpec, TEMPLATE_ROUTES } from './_spec'
import {
  GetTemplateListReq,
  GetTemplateListRes,
} from './_types'
import { GetTemplateListResMock } from './_types/index.mock'

@JsonController()
export class TemplateListController
  implements TemplateListControllerSpec {
    @Method(
      TEMPLATE_ROUTES.getTemplateList.method,
      TEMPLATE_ROUTES.getTemplateList.path
    )
    getTemplateList(@Params() params: GetTemplateListReq): GetTemplateListRes {
      console.log(params)
      return GetTemplateListResMock.build()
    }
}
