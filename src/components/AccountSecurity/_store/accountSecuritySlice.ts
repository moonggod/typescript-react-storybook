import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ACCOUNT_SECURITY_ROUTES } from '../_controller/_spec'
import {
  EmailRes,
  SendSMSCodeRes,
  ResetPasswordReq,
  ResetPasswordRes,
  BindEmailReq,
  Customer,
  Email,
  ChangeAccountReq
} from '../_controller/_types'
import { api } from '../../../utils/api'
import { addParamsToPath } from '../../../utils/url'

const SLICE_NAME = 'accountSecurity'

export const resetPassword = createAsyncThunk(
  `${SLICE_NAME}/resetPassword`,
  async (req: { body: ResetPasswordReq }): Promise<ResetPasswordRes> => {
    const { data } = await api({
      method: ACCOUNT_SECURITY_ROUTES.resetPassword.method,
      url: ACCOUNT_SECURITY_ROUTES.resetPassword.path,
      data: req.body
    })
    return data
  }
)

export const sendSMSCode = createAsyncThunk(
  `${SLICE_NAME}/sendSMSCode`,
  async (req: { params: Customer; body: Email }): Promise<SendSMSCodeRes> => {
    const { data } = await api({
      method: ACCOUNT_SECURITY_ROUTES.sendSMSCode.method,
      url: addParamsToPath(
        ACCOUNT_SECURITY_ROUTES.sendSMSCode.path,
        req.params
      ),
      data: req.body
    })
    return data
  }
)

export const checkEmail = createAsyncThunk(
  `${SLICE_NAME}/checkEmail`,
  async (req: { params: Customer; body: BindEmailReq }): Promise<EmailRes> => {
    const { data } = await api({
      method: ACCOUNT_SECURITY_ROUTES.checkEmail.method,
      url: addParamsToPath(ACCOUNT_SECURITY_ROUTES.checkEmail.path, req.params),
      data: req.body
    })
    return data
  }
)
export const bindEmail = createAsyncThunk(
  `${SLICE_NAME}/bindEmail`,
  async (req: { params: Customer; body: BindEmailReq }): Promise<EmailRes> => {
    const { data } = await api({
      method: ACCOUNT_SECURITY_ROUTES.bindEmail.method,
      url: addParamsToPath(ACCOUNT_SECURITY_ROUTES.bindEmail.path, req.params),
      data: req.body
    })
    return data
  }
)
export const changeAccount = createAsyncThunk(
  `${SLICE_NAME}/bindEmail`,
  async (req: { params: Customer; body: ChangeAccountReq }): Promise<EmailRes> => {
    const { data } = await api({
      method: ACCOUNT_SECURITY_ROUTES.bindEmail.method,
      url: addParamsToPath(ACCOUNT_SECURITY_ROUTES.bindEmail.path, req.params),
      data: req.body
    })
    return data
  }
)

export const accountSecuritySlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    resetPasswordRes: new ResetPasswordRes(),
    sendSMSCodeRes: new SendSMSCodeRes(),
    checkEmailRes: new EmailRes(),
    bindEmailRes: new EmailRes()
  },
  reducers: {
    resetSendSMSCodeRes: state => {
      state.sendSMSCodeRes = { data: false }
    }
  },
  extraReducers: {
    // scope: resetPassword
    [resetPassword.pending.type]: state => {
      state.isLoading = true
    },
    [resetPassword.fulfilled.type]: (state, action) => {
      state.resetPasswordRes = action.payload
      state.isLoading = false
    },
    [resetPassword.rejected.type]: state => {
      state.isLoading = false
    },
    // scope: sendSMSCode
    [sendSMSCode.pending.type]: state => {
      state.isLoading = true
    },
    [sendSMSCode.fulfilled.type]: (state, action) => {
      state.sendSMSCodeRes = action.payload
      state.isLoading = false
    },
    [sendSMSCode.rejected.type]: state => {
      state.isLoading = false
    },
    // scope: checkEmail
    [checkEmail.pending.type]: state => {
      state.isLoading = true
    },
    [checkEmail.fulfilled.type]: (state, action) => {
      state.checkEmailRes = action.payload
      state.isLoading = false
    },
    [checkEmail.rejected.type]: state => {
      state.isLoading = false
    },
    // scope: bindEmail
    [bindEmail.pending.type]: state => {
      state.isLoading = true
    },
    [bindEmail.fulfilled.type]: (state, action) => {
      state.bindEmailRes = action.payload
      state.isLoading = false
    },
    [bindEmail.rejected.type]: state => {
      state.isLoading = false
    }
  }
})
