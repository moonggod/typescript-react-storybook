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
import {logSlice} from '../components/Log/_store/slice' // TODO: notificationSlice
import axiosMiddleware from 'redux-axios-middleware'

import { accountSecuritySlice } from '../components/AccountSecurity/_store/accountSecuritySlice'
import { myAddressSlice } from '../components/MyAddress/_store/myAddressSlice'

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
  [logSlice.name]: logSlice.reducer, // TODO:sync shoppingCartSlice
  [myAddressSlice.name]: myAddressSlice.reducer,
  [accountSecuritySlice.name]: accountSecuritySlice.reducer
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
