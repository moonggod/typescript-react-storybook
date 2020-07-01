import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../../app/store'
import { Box } from '@material-ui/core'
import { Address } from '../_controller/_types'
import { getCustomerById } from '../_store/myAddressSlice'
import { AddressCard } from './_comps/AddressCard'
import { AddAddressButton } from '../Add/AddAddressButton'

let initAddr = new Address()
function _getAddressById(addresses: any, addressId: string) {
  let _address
  for (let i = 0; i < addresses.length; i++) {
    if (`${addresses[i].id}` === `${addressId}`) {
      _address = addresses[i]
      break
    }
  }
  return _address || addresses[0] // TODO:mock data can't find key one, so return first item
}

type OwnProps = {
  addressId?: string
  onClose?: any
}

const connector = connect(
  (state: RootState, props: OwnProps) => {
    const { customerInfo } = state.myAddress
    const { addressId, onClose } = props
    return {
      customerInfo,
      addressId,
      onClose
    }
  },
  {
    getCustomerById
  }
)

type Props = ConnectedProps<typeof connector>

export const SelectedAddress = connector(_SelectedAddress)

export function _SelectedAddress({
  customerInfo,
  addressId,
  onClose,
  getCustomerById
}: Props) {
  const [addr, setAddr] = React.useState<Address>(initAddr)

  React.useEffect(() => {
    if (addressId && customerInfo.addresses.length) {
      setAddr(_getAddressById(customerInfo.addresses, addressId))
    } else if (addressId) {
      const curCustomerId = 777 // TODO: where to get the current customer ID?
      getCustomerById(curCustomerId)
    }
    // eslint-disable-next-line
  }, [addressId, customerInfo, getCustomerById])

  return (
    <Box width="100%">
      {addressId ? (
        <AddressCard address={addr} scene="select" onClose={onClose} />
      ) : (
        <AddAddressButton scene="select" onClose={onClose} />
      )}
    </Box>
  )
}
