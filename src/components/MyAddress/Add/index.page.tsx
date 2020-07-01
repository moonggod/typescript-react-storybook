import React from 'react'
import { AddAddress } from './AddAddress'
import AccountFrame from '../../AccountFrame'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { MY_ADDRESS_PAGE_URL } from '../Index/index.page'

export const AddAddressPage = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { addressId } = useParams()
  const _onClose = () => {
    history.push(MY_ADDRESS_PAGE_URL)
  }
  return (
    <AccountFrame>
      <AddAddress
        pathname={pathname}
        addressId={addressId}
        onClose={_onClose}
      />
    </AccountFrame>
  )
}

export const ADD_ADDRESS_PAGE_URL = '/add-address'
export const CHANGE_ADDRESS_PAGE_URL = (addressId?: number) => {
  if (addressId) {
    return `/change-address/${addressId}`
  } else {
    return `/change-address/:addressId`
  }
}
