import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { M_LIST_ROUTES } from '../_controller/_spec'
import {
  GetMessageListReq,
  GetMessageListRes
} from '../_controller/_types'
import { api } from '../../../utils/api'

const SLICE_NAME = 'MListSlice'

export const getMessageList = createAsyncThunk(
  `${SLICE_NAME}/getMessageList`,
  async (customerId: GetMessageListReq['customerId']): Promise<GetMessageListRes> => {
    const { data } = await api({
      method: M_LIST_ROUTES.getMessageList.method,
      url: M_LIST_ROUTES.getMessageList.path.replace(
        ':customerId',
        String(customerId)
      )
    })
    return data
  }
)

export const MListSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    messageList: new GetMessageListRes(),
  },
  reducers: {},
  extraReducers: {
    // scope: resetPassword
    [getMessageList.pending.type]: state => {
      state.isLoading = true
    },
    [getMessageList.fulfilled.type]: (state, action) => {
      state.messageList = action.payload
      state.isLoading = false
    },
    [getMessageList.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
