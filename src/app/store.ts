import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { api } from '../utils/api'

import favoritesSlice from './slices/favoritesSlice' // TODO:sync favorites
import {MListSlice} from '../components/MList/MessageList/_store/messageListSlice' // TODO: messageList
import {MDialogSlice} from '../components/MDialog/MessageDialog/_store/messageDialogSlice' // TODO: messageList
import {ListNotificationSlice} from '../components/MList/ListNotification/_store/listNotificationSlice' // TODO: messageList
import axiosMiddleware from 'redux-axios-middleware'

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  axiosMiddleware(api)
]

const rootReducer = combineReducers({
  favorites: favoritesSlice, // TODO:sync favorites
  [MListSlice.name]: MListSlice.reducer, // TODO:sync favorites
  [MDialogSlice.name]: MDialogSlice.reducer, // TODO:sync favorites
  [ListNotificationSlice.name]: ListNotificationSlice.reducer, // TODO:sync ListNotificationSlice
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
