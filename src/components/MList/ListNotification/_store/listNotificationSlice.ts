import Cookies from 'js-cookie'
import { COOKIE_LANG, GC_TOKEN } from '../../../../consts'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LIST_NOTIFICATION_ROUTES } from '../_controller/_spec'
import {
  GetListNotificationReq,
  // GetListNotificationRes,
  DeleteNotificationReq,
  DeleteNotificationRes,
  MarkReadNotificationReq,
  MarkReadNotificationRes,
  NotificationItem
} from '../_controller/_types'
import { api } from '../../../../utils/api'
import { NotificationItemMock, DeleteNotificationResMock } from '../_controller/_types/index.mock'

const SLICE_NAME = 'ListNotificationSlice'

export const getListNotification = createAsyncThunk(
  `${SLICE_NAME}/getListNotification`,
  async (query: GetListNotificationReq): Promise<[NotificationItem]> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.getListNotification.method,
      url: LIST_NOTIFICATION_ROUTES.getListNotification.path
      .replace('{limit}', String(query.limit))
      .replace('{secondsAgo}', String(query.secondsAgo)),
      headers: {
        'Authorization': `123`, // TODO:change to true api
        'lang': Cookies.get(COOKIE_LANG) || 'en'
      },
    })
    return data
  }
)
export const deleteNotification = createAsyncThunk(
  `${SLICE_NAME}/deleteNotification`,
  async (query: DeleteNotificationReq): Promise<DeleteNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.deleteNotification.method,
      url: LIST_NOTIFICATION_ROUTES.deleteNotification.path,
      data: query,
      headers: {
        'Authorization': `Basic ${Cookies.get(GC_TOKEN) || 77}`
      },
    })
    return data
  }
)
export const markReadNotification = createAsyncThunk(
  `${SLICE_NAME}/markReadNotification`,
  async (query: MarkReadNotificationReq): Promise<MarkReadNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.markReadNotification.method,
      url: LIST_NOTIFICATION_ROUTES.markReadNotification.path,
      data: query,
      headers: {
        'Authorization': `Basic ${Cookies.get(GC_TOKEN) || 77}`
      },
    })
    return data
  }
)

const listNotification:[NotificationItem] = [NotificationItemMock.build()]

export const ListNotificationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    listNotification,
    deleteLoading: false, 
    deleteResult: DeleteNotificationResMock.build(),
    markReadLoaing: false,
    markReadResult: {},
  },
  reducers: {},
  extraReducers: {
    // getListNotification
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
    // deleteNotification
    [deleteNotification.pending.type]: state => {
      state.deleteLoading = true
    },
    [deleteNotification.fulfilled.type]: (state, action) => {
      state.deleteResult = action.payload
      state.deleteLoading = false
    },
    [deleteNotification.rejected.type]: state => {
      state.deleteLoading = false
    },
    // markReadNotification
    [markReadNotification.pending.type]: state => {
      state.markReadLoaing = true
    },
    [markReadNotification.fulfilled.type]: (state, action) => {
      state.markReadResult = action.payload
      state.markReadLoaing = false
    },
    [markReadNotification.rejected.type]: state => {
      state.markReadLoaing = false
    },
  }
})
