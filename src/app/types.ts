import { PayloadAction } from '@reduxjs/toolkit'

export interface AxiosMiddlewareActionMeta {
  previousAction: PayloadAction
}

export interface AxiosMiddlewareActionError {
  data: any
  status: number
}

/** TODO:sync favorites */
export interface FavoritesState {
  data?: FavoritesDetail
  isLoading?: boolean
  error?: object | string
}

export interface FavoritesDetail {
  list: []
  total: number
}
/** TODO:sync favorites # */