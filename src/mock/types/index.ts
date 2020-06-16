import { RequestMethod } from '../consts'
export { RequestMethod } // for ergonomic :)

export type Route = {
  method: RequestMethod
  path: string
}

export type Routes = {
  [apiName: string]: Route
}

export type CreateControllerSpec<T extends Routes> = Record<keyof T, Function>
