/** TODO:sync favorites file */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { RootState } from '../store'
import {
  FavoritesState,
  AxiosMiddlewareActionMeta,
  AxiosMiddlewareActionError
} from '../types'

const initialState: FavoritesState = {
  data: {
    list: [],
    total: 0
  },
  isLoading: false
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    request: () => {
      return {
        isLoading: true
      }
    },
    success: {
      reducer: (
        _,
        action: PayloadAction<
          AxiosResponse,
          string,
          AxiosMiddlewareActionMeta,
          AxiosMiddlewareActionError
        >
      ) => {
        return {
          data: action.payload.data || {
            list: [],
            total: 0
          }
        }
      },
      prepare: (payload, meta, error) => {
        return {
          payload,
          meta,
          error
        }
      }
    },
    fail: {
      reducer: (
        _,
        action: PayloadAction<
          AxiosResponse,
          string,
          AxiosMiddlewareActionMeta,
          AxiosMiddlewareActionError
        >
      ) => {
        return {
          error: action.error
        }
      },
      prepare: (payload, meta, error) => {
        return {
          payload,
          meta,
          error
        }
      }
    }
  }
})

export const { request, success, fail } = favoritesSlice.actions

export const fetchFavorites = (payload: AxiosRequestConfig) => (
  dispatch: any
) => {
  dispatch({
    types: [request, success, fail],
    payload: {
      request: payload
    }
  })
}

export const selectFavorites = (state: RootState) => state.favorites

export default favoritesSlice.reducer
