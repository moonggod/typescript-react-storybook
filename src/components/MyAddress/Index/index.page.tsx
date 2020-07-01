import React, { useEffect, useState, MouseEvent, Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { connect, ConnectedProps } from 'react-redux'
import { Grid, Box, Divider } from '@material-ui/core'
// import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { getCustomerById, deleteAddress } from '../_store/myAddressSlice'
import { RootState } from '../../../app/store'
import { I18N, I18N_NS } from '../../_i18n'
import { AddressCard } from './_comps/AddressCard'
import AccountFrame from '../../AccountFrame'
import { SelectedAddress } from './SelectedAddress'
import { AddAddressButton } from '../Add/AddAddressButton'

const connector = connect(
  (state: RootState) => {
    const { customerInfo, deleteSuccessAddressId } = state.myAddress
    return {
      addresses: customerInfo.addresses,
      deleteSuccessAddressId
    }
  },
  {
    getCustomerById,
    deleteAddress
  }
)

type Props = ConnectedProps<typeof connector>

export const MyAddressPage = connector(_MyAddressPage)
export function _MyAddressPage({
  addresses,
  deleteSuccessAddressId,
  getCustomerById,
  deleteAddress
}: Props) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [openDemo, setOpenDemo] = useState(true)

  useEffect(() => {
    const curCustomerId = 777 // TODO: where to get the current customer ID?
    getCustomerById(curCustomerId)
  }, [getCustomerById, deleteSuccessAddressId])

  const _deleteAddress = (addressId: number) => {
    deleteAddress({
      params: {
        customerId: 64,
        addressId
      }
    })
  }

  const togglerOpenDemo = (evt: MouseEvent) => {
    evt.preventDefault()
    setOpenDemo(!openDemo)
  }

  const _onClose = (data: any) => {
    if (data) {
      // TODO: data -> According to the actual need to return the value
      // TODO: do something for success
    } else {
      // TODO: do something for cancel or failure
    }
  }

  return (
    <AccountFrame>
      <Box width="100%">
        <Helmet>
          <title>{t(I18N.my_address.index._seo.title)}</title>
        </Helmet>
        <Grid container spacing={2}>
          {addresses.map(addr => (
            <Grid
              key={addr.id}
              item
              xs={12}
              sm={6}
              md={6}
              className={classes.hasFullHeightChildren}>
              <AddressCard address={addr} deleteAddress={_deleteAddress} />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            className={classes.hasFullHeightChildren}>
            <AddAddressButton />
          </Grid>
          <Grid
            onDoubleClick={togglerOpenDemo}
            item
            xs={12}
            sm={6}
            md={6}
            className={classes.placeholderItem}></Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            className={classes.placeholderItem}></Grid>
        </Grid>
        {openDemo ? (
          <Fragment>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                弹窗 新增/编辑 地址Demo
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className={classes.hasFullHeightChildren}>
                <SelectedAddress onClose={_onClose} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className={classes.hasFullHeightChildren}>
                <SelectedAddress addressId="123" onClose={_onClose} />
              </Grid>
            </Grid>
          </Fragment>
        ) : null}
      </Box>
    </AccountFrame>
  )
}

export const MY_ADDRESS_PAGE_URL = '/my-address'

const useStyles = makeStyles(theme => ({
  hasFullHeightChildren: {
    height: '240px',
    '& > *': {
      // Thanks to https://github.com/mui-org/material-ui/issues/7602#issuecomment-548911117
      height: '100%'
    }
  },
  placeholderItem: {
    height: '1px',
    margin: theme.spacing(0)
  }
}))
