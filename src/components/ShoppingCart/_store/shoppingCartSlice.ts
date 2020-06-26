import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TEMPLATE_ROUTES } from '../_controller/_spec'
import {
  GetTemplateListReq,
  GetTemplateListRes
} from '../_controller/_types'
import { api } from '../../../utils/api'

const SLICE_NAME = 'shoppingCartSlice'

export const getTemplateList = createAsyncThunk(
  `${SLICE_NAME}/getTemplateList`,
  async (customerId: GetTemplateListReq['customerId']): Promise<GetTemplateListRes> => {
    const { data } = await api({
      method: TEMPLATE_ROUTES.getTemplateList.method,
      url: TEMPLATE_ROUTES.getTemplateList.path.replace(
        ':customerId',
        String(customerId)
      )
    })
    return data
  }
)

export const shoppingCartSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    TemplateList: new GetTemplateListRes(),
  },
  reducers: {},
  extraReducers: {
    // scope: resetPassword
    [getTemplateList.pending.type]: state => {
      state.isLoading = true
    },
    [getTemplateList.fulfilled.type]: (state, action) => {
      state.TemplateList = action.payload
      state.isLoading = false
    },
    [getTemplateList.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
