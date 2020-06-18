import Cookies from 'js-cookie'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LIST_NOTIFICATION_ROUTES } from '../_controller/_spec'
import {
  GetListNotificationReq,
  GetListNotificationRes
} from '../_controller/_types'
import { api } from '../../../../utils/api'

const SLICE_NAME = 'ListNotificationSlice'

export const getListNotification = createAsyncThunk(
  `${SLICE_NAME}/getListNotification`,
  async (customerId: GetListNotificationReq['customerId']): Promise<GetListNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.getListNotification.method,
      url: LIST_NOTIFICATION_ROUTES.getListNotification.path.replace(
        ':customerId',
        String(customerId)
      ),
      headers: {
        'Authorization': `Basic ${Cookies.get('token')}` // TODO:change to true api
      },
    })
    return data
  }
)

export const ListNotificationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    listNotification: new GetListNotificationRes(),
  },
  reducers: {},
  extraReducers: {
    // scope: resetPassword
    [getListNotification.pending.type]: state => {
      state.isLoading = true
    },
    [getListNotification.fulfilled.type]: (state, action) => {
      state.listNotification = action.payload
      state.isLoading = false
    },
    [getListNotification.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
