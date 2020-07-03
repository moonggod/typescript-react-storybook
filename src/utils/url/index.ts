import QueryString from 'query-string'
import { EnumValues } from 'enum-values'

const GFASHION_DEFAULT_PAGE_SIZE = 12

enum TOP_CATEGORY {
  men = 2216,
  women = 2217,
  furniture = 1971
}

export const generateQueryState = (
  queryValues: QueryString.ParsedQuery<string>,
  category: string,
  lang: string
) => {
  let sorting: string | null = null
  let order: string | null = null
  let categoryName = TOP_CATEGORY.women

  if (queryValues.sort) {
    let sortQuery = (queryValues.sort as string).split('-')
    sorting = sortQuery[0]
    order = sortQuery[1]
  }

  if (EnumValues.getNames(TOP_CATEGORY).includes(category)) {
    categoryName = (TOP_CATEGORY as any)[category]
  }

  let query = Object.assign(
    {
      categoryId: queryValues.category ? queryValues.category : categoryName,
      language: lang,
      pageSize: queryValues.pageSize
        ? queryValues.pageSize
        : GFASHION_DEFAULT_PAGE_SIZE
    },
    queryValues.search ? { keyword: queryValues.search } : null,
    queryValues.designer ? { designerId: queryValues.designer } : null,
    sorting ? { sorting } : null,
    order ? { order } : null,
    queryValues.page ? { pageNo: queryValues.page } : null
  )

  return query
}

export const generateQueryURL = (
  queryValues: QueryString.ParsedQuery<string>,
  queryKeyOverride?: string,
  queryValueOverride?: string
) => {
  let query = `?`

  if (queryKeyOverride && queryValueOverride) {
    queryValues[queryKeyOverride] = queryValueOverride
  }

  if (queryKeyOverride && queryValueOverride === '') {
    delete queryValues[queryKeyOverride]
  }

  query += QueryString.stringify(queryValues)

  return query
}

/**
 * Add params to path
 * @param path /customers/:customerId/getNick?sex=${sex}
 * @param params {customerId:64}
 * @param query {sex:male}
 * @returns /customers/64/getNick?sex=male
 */
export function addParamsToPath(path: string, params: any, query: any) {
  let _path = path
  if (params) {
    for (const key in params) {
      _path = _path.replace(`:${key}`, String(params[key]))
    }
  }
  if (query) {
    for (const key in query) {
      _path = _path.replace(`{${key}}`, String(query[key]))
    }
  }
  return _path
}
