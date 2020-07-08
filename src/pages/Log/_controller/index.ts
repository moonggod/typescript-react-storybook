import { JsonController, Method, Params, QueryParams } from 'routing-controllers'
import { LogListControllerSpec, LOG_ROUTES } from './_spec'
import {
  GetLogListParams,
  GetLogListQuery,
  GetLogListRes,
} from './_types'
import { GetLogListResMock } from './_types/index.mock'

@JsonController()
export class LogListController
  implements LogListControllerSpec {
    @Method(
      LOG_ROUTES.getLogList.method,
      LOG_ROUTES.getLogList.path.split('?')[0]
    )
    getLogList(@Params() params: GetLogListParams, @QueryParams() query: GetLogListQuery): GetLogListRes {
      console.log(params)
      console.log(query)
      return GetLogListResMock.build()
    }
}
