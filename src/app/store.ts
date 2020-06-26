import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { api } from '../utils/api'

import favoritesSlice from './slices/favoritesSlice' // TODO:sync favoritesSlice
import {MListSlice} from '../components/MessageList/_store/messageListSlice' // TODO: messageListSlice
import {MDialogSlice} from '../components/MDialog/MessageDialog/_store/messageDialogSlice' // TODO: messageDialogSlice
import {notificationSlice} from '../components/Notification/_store/notificationSlice' // TODO: notificationSlice
import {templateSlice} from '../components/Template/_store/templateSlice' // TODO: notificationSlice
import {shoppingCartSlice} from '../components/ShoppingCart/_store/shoppingCartSlice' // TODO: notificationSlice
import axiosMiddleware from 'redux-axios-middleware'

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  axiosMiddleware(api)
]

const rootReducer = combineReducers({
  favorites: favoritesSlice, // TODO:sync favoritesSlice
  [MListSlice.name]: MListSlice.reducer, // TODO:sync MListSlice
  [MDialogSlice.name]: MDialogSlice.reducer, // TODO:sync MDialogSlice
  [notificationSlice.name]: notificationSlice.reducer, // TODO:sync notificationSlice
  [templateSlice.name]: templateSlice.reducer, // TODO:sync templateSlice
  [shoppingCartSlice.name]: shoppingCartSlice.reducer, // TODO:sync shoppingCartSlice
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
