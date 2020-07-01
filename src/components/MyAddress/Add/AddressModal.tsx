import React, { Fragment } from 'react'
import { AddAddress } from './AddAddress'
import { ADD_ADDRESS_PAGE_URL, CHANGE_ADDRESS_PAGE_URL } from './index.page'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  open: boolean
  onClose: any
  addressId?: string | number // Need to pass value when editing
}

// example: <AddressModal open={open} type={type} onClose={onClose} addressId={addressId} />
export const AddressModal = (props: Props) => {
  const classes = useStyles()
  const { open, onClose, addressId } = props
  const _onClose = (data: any) => {
    onClose(data)
  }
  const pathname = !addressId ? ADD_ADDRESS_PAGE_URL : CHANGE_ADDRESS_PAGE_URL()
  return (
    <Fragment>
      {open ? (
        <Box className={classes.modal}>
          <Box className={classes.panel}>
            <AddAddress
              pathname={pathname}
              onClose={_onClose}
              addressId={addressId}
            />
          </Box>
        </Box>
      ) : null}
    </Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    zIndex: 1600
  },
  panel: {
    maxWidth: '60%',
    backgroundColor: '#fff',
    padding: theme.spacing(5, 0),
    margin: theme.spacing(8, 'auto', 0)
  }
}))
