import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LOG_ROUTES } from '../_controller/_spec'
import {
  GetLogListParams,
  GetLogListQuery,
  GetLogListRes
} from '../_controller/_types'
import { api } from '../../../utils/api'
import { addParamsToPath } from '../../../utils/url'

const SLICE_NAME = 'logSlice'

export const getLogList = createAsyncThunk(
  `${SLICE_NAME}/getLogList`,
  async (req: {params: GetLogListParams, query: GetLogListQuery}): Promise<GetLogListRes> => {
    const { data } = await api({
      method: LOG_ROUTES.getLogList.method,
      url: addParamsToPath(LOG_ROUTES.getLogList.path, req.params, req.query)
    })
    return data
  }
)

export const logSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    logList: new GetLogListRes(),
  },
  reducers: {},
  extraReducers: {
    // scope: getLogList
    [getLogList.pending.type]: state => {
      state.isLoading = true
    },
    [getLogList.fulfilled.type]: (state, action) => {
      state.logList = action.payload
      state.isLoading = false
    },
    [getLogList.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
