import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { api } from '../utils/api'

import favoritesSlice from './slices/favoritesSlice' // TODO:sync favorites
import {MListSlice} from '../components/_store/MListSlice' // TODO: messageList
import axiosMiddleware from 'redux-axios-middleware'

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  axiosMiddleware(api)
]

const rootReducer = combineReducers({
  favorites: favoritesSlice, // TODO:sync favorites
  [MListSlice.name]: MListSlice.reducer, // TODO:sync favorites
})

export const store = configureStore({
  reducer: rootReducer,
  middleware
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
