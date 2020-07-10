import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  GetListNotificationReq,
  // GetListNotificationRes,
  DeleteNotificationReq,
  DeleteNotificationRes,
  MarkReadNotificationReq,
  MarkReadNotificationRes,
  NotificationItem
} from '../_controller/_types'
import { api } from '../../../utils/rest-api'
import { getListWithoutDeleted } from '../_helper'

const SLICE_NAME = 'notification'

export const getListNotification = createAsyncThunk(
  `${SLICE_NAME}/getListNotification`,
  async (query: GetListNotificationReq): Promise<[NotificationItem]> => {
    const { data } = await api({
      baseURL: '/',
      method: 'get',
      url: `/message/v1/receive?limit=${query.limit}&secondsAgo=${query.secondsAgo}`,
      headers: {
        'lang': 'en' // TODO: need true lang
      },
    })
    return data
  }
)
export const deleteNotification = createAsyncThunk(
  `${SLICE_NAME}/deleteNotification`,
  async (query: DeleteNotificationReq): Promise<DeleteNotificationRes> => {
    const { data } = await api({
      baseURL: '/',
      method: 'delete',
      url: `/message/v1/delete`,
      data: query,
    })
    data.id = query.id
    return data
  }
)
export const markReadNotification = createAsyncThunk(
  `${SLICE_NAME}/markReadNotification`,
  async (query: MarkReadNotificationReq): Promise<MarkReadNotificationRes> => {
    const { data } = await api({
      baseURL: '/',
      method: 'post',
      url: `/message/v1/markRead`,
      data: query,
    })
    return data
  }
)

const deleteResult:DeleteNotificationRes = {
  action: '',
  id: '',
  status: '',
}

const listNotification:[NotificationItem] = [{
  category: '',
  content: {},
  contract: '',
  data: '',
  id: '',
  opened: false,
  picture: '',
  receiver: '',
  sender: '',
  timeOpened: -1,
  timeSent: -1,
  timeUpdated: -1,
  title: {},
  updatedBy: '',
}]

const markReadResult:MarkReadNotificationRes = {
  action: '',
  id: '',
  status: '',
}

export const notificationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    listNotification,
    deleteLoading: false, 
    deleteResult,
    markReadLoaing: false,
    markReadResult,
    unreadTotal: 0,
    total:0,
  },
  reducers: {
  },
  extraReducers: {
    // getListNotification
    [getListNotification.pending.type]: state => {
      state.isLoading = true
    },
    [getListNotification.fulfilled.type]: (state, action) => {
      state.listNotification = action.payload
      state.unreadTotal = action.payload.length
      state.total = action.payload.length
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
      state.listNotification = getListWithoutDeleted(state.listNotification, action.payload.id)
      state.deleteLoading = false
      state.total -= 1
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
      state.unreadTotal -= 1
    },
    [markReadNotification.rejected.type]: state => {
      state.markReadLoaing = false
    },
  }
})
