import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { M_DIALOG_ROUTES } from '../_controller/_spec'
import {
  GetDialogMessageListReq,
  GetDialogMessageListRes
} from '../_controller/_types'
import { api } from '../../../../utils/api'

const SLICE_NAME = 'MDialogSlice'

export const getDialogMessageList = createAsyncThunk(
  `${SLICE_NAME}/getDialogMessageList`,
  async (customerId: GetDialogMessageListReq['customerId']): Promise<GetDialogMessageListRes> => {
    const { data } = await api({
      method: M_DIALOG_ROUTES.getDialogMessageList.method,
      url: M_DIALOG_ROUTES.getDialogMessageList.path.replace(
        ':customerId',
        String(customerId)
      )
    })
    return data
  }
)

export const MDialogSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    dialogMessageList: new GetDialogMessageListRes(),
  },
  reducers: {},
  extraReducers: {
    // scope: resetPassword
    [getDialogMessageList.pending.type]: state => {
      state.isLoading = true
    },
    [getDialogMessageList.fulfilled.type]: (state, action) => {
      state.dialogMessageList = action.payload
      state.isLoading = false
    },
    [getDialogMessageList.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
