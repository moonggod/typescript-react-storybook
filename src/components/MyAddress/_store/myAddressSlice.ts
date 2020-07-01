import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CUSTOMERS_ROUTES } from '../_controller/_spec'
import {
  Customer,
  CustomerId,
  GetCustomerByIdRes,
  Address,
  AddressdRes,
  DeleteAddressReq,
  DeleteAddressRes
} from '../_controller/_types'
import { api } from '../../../utils/api'
import { addParamsToPath } from '../../../utils/url'

const SLICE_NAME = 'myAddress'

export const getCustomerById = createAsyncThunk(
  `${SLICE_NAME}/getCustomerById`,
  async (customerId: Customer['id']): Promise<GetCustomerByIdRes> => {
    const { data } = await api({
      method: CUSTOMERS_ROUTES.getCustomerById.method,
      url: CUSTOMERS_ROUTES.getCustomerById.path.replace(
        ':customerId',
        String(customerId)
      )
    })
    return data
  }
)
export const addAddress = createAsyncThunk(
  `${SLICE_NAME}/addAddress`,
  async (req: { params: CustomerId; body: Address }): Promise<AddressdRes> => {
    const { data } = await api({
      method: CUSTOMERS_ROUTES.addAddress.method,
      url: addParamsToPath(CUSTOMERS_ROUTES.addAddress.path, req.params),
      data: req.body
    })
    return data
  }
)
export const changeAddress = createAsyncThunk(
  `${SLICE_NAME}/changeAddress`,
  async (req: { params: CustomerId; body: Address }): Promise<AddressdRes> => {
    const { data } = await api({
      method: CUSTOMERS_ROUTES.changeAddress.method,
      url: addParamsToPath(CUSTOMERS_ROUTES.changeAddress.path, req.params),
      data: req.body
    })
    return data
  }
)
export const deleteAddress = createAsyncThunk(
  `${SLICE_NAME}/deleteAddress`,
  async (req: { params: DeleteAddressReq }): Promise<DeleteAddressRes> => {
    const { data } = await api({
      method: CUSTOMERS_ROUTES.deleteAddress.method,
      url: addParamsToPath(CUSTOMERS_ROUTES.deleteAddress.path, req.params)
    })
    data.id = req.params.addressId // TODO: need to delete address by id
    return data
  }
)

export const myAddressSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: false,
    customerInfo: new Customer(),
    addAddressSuccess: false,
    changeAddressSuccess: false,
    deleteSuccessAddressId: -1
  },
  reducers: {
    resetStatus: state => {
      state.addAddressSuccess = false
      state.changeAddressSuccess = false
    }
  },
  extraReducers: {
    // getCustomerById
    [getCustomerById.pending.type]: state => {
      state.isLoading = true
    },
    [getCustomerById.fulfilled.type]: (state, action) => {
      state.customerInfo = action.payload
      state.isLoading = false
    },
    [getCustomerById.rejected.type]: state => {
      state.isLoading = false
    },
    // addAddress
    [addAddress.pending.type]: state => {
      state.isLoading = true
    },
    [addAddress.fulfilled.type]: (state, action) => {
      state.addAddressSuccess = action.payload
      state.isLoading = false
    },
    [addAddress.rejected.type]: state => {
      state.isLoading = false
    },
    // changeAddress
    [changeAddress.pending.type]: state => {
      state.isLoading = true
    },
    [changeAddress.fulfilled.type]: (state, action) => {
      state.changeAddressSuccess = action.payload
      state.isLoading = false
    },
    [changeAddress.rejected.type]: state => {
      state.isLoading = false
    },
    // deleteAddress
    [deleteAddress.pending.type]: state => {
      state.isLoading = true
    },
    [deleteAddress.fulfilled.type]: (state, action) => {
      state.deleteSuccessAddressId = action.payload.id
      state.isLoading = false
    },
    [deleteAddress.rejected.type]: state => {
      state.isLoading = false
    }
  }
})
