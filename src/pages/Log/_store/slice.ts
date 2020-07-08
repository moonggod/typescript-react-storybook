import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LOG_ROUTES } from '../_controller/_spec'
import {
  GetLogListParams,
  GetLogListQuery,
  GetLogListRes,
  DeleteLogParams,
  DeleteLogQuery,
  DeleteLogRes,
  ClearLogParams,
  ClearLogRes
} from '../_controller/_types'
import { api } from '../../../utils/rest-api'
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

export const deleteLog = createAsyncThunk(
  `${SLICE_NAME}/deleteLog`,
  async (req: {params: DeleteLogParams, query: DeleteLogQuery}): Promise<DeleteLogRes> => {
    const { data } = await api({
      method: LOG_ROUTES.deleteLog.method,
      url: addParamsToPath(LOG_ROUTES.deleteLog.path, req.params, req.query)
    })
    return data
  }
)

export const clearLog = createAsyncThunk(
  `${SLICE_NAME}/clearLog`,
  async (req: {params: ClearLogParams}): Promise<ClearLogRes> => {
    const { data } = await api({
      method: LOG_ROUTES.clearLog.method,
      url: addParamsToPath(LOG_ROUTES.clearLog.path, req.params, null)
    })
    return data
  }
)

export const logSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    logList: new GetLogListRes(),
    deleteSuccess: false,
    clearSuccess: false,
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
    // scope: deleteLog
    [deleteLog.pending.type]: state => {
      state.isLoading = true
    },
    [deleteLog.fulfilled.type]: (state, action) => {
      state.deleteSuccess = action.payload.data
      setTimeout(() => state.deleteSuccess = false, 600)
      state.isLoading = false
    },
    [deleteLog.rejected.type]: state => {
      state.isLoading = false
    },
    // scope: clearLog
    [clearLog.pending.type]: state => {
      state.isLoading = true
    },
    [clearLog.fulfilled.type]: (state, action) => {
      state.clearSuccess = action.payload.data
      setTimeout(() => state.clearSuccess = false, 600)
      state.isLoading = false
    },
    [clearLog.rejected.type]: state => {
      state.isLoading = false
    },
  }
})
