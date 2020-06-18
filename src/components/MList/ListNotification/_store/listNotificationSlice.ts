import Cookies from 'js-cookie'
import { COOKIE_LANG, GC_TOKEN } from '../../../../consts'
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
  async (query: GetListNotificationReq): Promise<GetListNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.getListNotification.method,
      url: LIST_NOTIFICATION_ROUTES.getListNotification.path
      .replace(':limit', String(query.limit))
      .replace(':secondsAgo', String(query.secondsAgo)),
      headers: {
        'Authorization': `Basic ${Cookies.get(GC_TOKEN) || 77}`, // TODO:change to true api
        'lang': Cookies.get(COOKIE_LANG) || 'en'
      },
    })
    return data
  }
)
export const deleteNotification = createAsyncThunk(
  `${SLICE_NAME}/deleteNotification`,
  async (query: GetListNotificationReq): Promise<GetListNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.getListNotification.method,
      url: LIST_NOTIFICATION_ROUTES.getListNotification.path.replace(
        ':limit',
        String(query.limit)
      ).replace(
        ':secondsAgo',
        String(query.secondsAgo)
      ),
      headers: {
        'Authorization': `Basic ${Cookies.get(GC_TOKEN) || 77}`, // TODO:change to true api
        'lang': Cookies.get(COOKIE_LANG) || 'en'
      },
    })
    return data
  }
)
export const markNotification = createAsyncThunk(
  `${SLICE_NAME}/markNotification`,
  async (query: GetListNotificationReq): Promise<GetListNotificationRes> => {
    const { data } = await api({
      method: LIST_NOTIFICATION_ROUTES.getListNotification.method,
      url: LIST_NOTIFICATION_ROUTES.getListNotification.path.replace(
        ':limit',
        String(query.limit)
      ).replace(
        ':secondsAgo',
        String(query.secondsAgo)
      ),
      headers: {
        'Authorization': `Basic ${Cookies.get(GC_TOKEN) || 77}`, // TODO:change to true api
        'lang': Cookies.get(COOKIE_LANG) || 'en'
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
      state.isLoading = true
    },
    [deleteNotification.fulfilled.type]: (state, action) => {
      state.listNotification = action.payload
      state.isLoading = false
    },
    [deleteNotification.rejected.type]: state => {
      state.isLoading = false
    },
    // markNotification
    [markNotification.pending.type]: state => {
      state.isLoading = true
    },
    [markNotification.fulfilled.type]: (state, action) => {
      state.listNotification = action.payload
      state.isLoading = false
    },
    [markNotification.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
