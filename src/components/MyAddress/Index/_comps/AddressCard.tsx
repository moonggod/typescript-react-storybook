// https://material-ui.com/components/cards/
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Link
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { Address } from '../../_controller/_types'
import { I18N, I18N_NS } from '../../../_i18n'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CHANGE_ADDRESS_PAGE_URL } from '../../Add/index.page'
import { AddressModal } from '../../Add/AddressModal'

export type Props = {
  address: Address
  deleteAddress?: any
  scene?: string
  onClose?: any
}
export function AddressCard({ address, deleteAddress, scene, onClose }: Props) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation(I18N_NS)
  const [open, setOpen] = useState(false)

  const handleEdit = () => {
    if (scene === 'select') {
      setOpen(true)
    } else {
      history.push(CHANGE_ADDRESS_PAGE_URL(address.id))
    }
    // TODO
  }
  const handleSetDefaultBilling = () => {
    // TODO
  }
  const handleDeleteAddress = (addressId: number) => {
    deleteAddress(addressId)
  }

  const _onClose = (data: any) => {
    setOpen(false)
    if (onClose) {
      onClose(data)
    }
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        title={`${address.firstname} ${address.lastname}`}
        className={classes.cardHeader}
        action={
          <IconButton
            aria-label={t(I18N.my_address.index.edit)}
            onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          // TODO: delete btn?
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{address.street}</Typography>
        <Typography variant="body1">
          {address.city} {address.postcode}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {address.country_id}
        </Typography>
        <Typography variant="body1">
          {t(I18N.my_address.add.tel)}:&nbsp;{address.telephone}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {address.default_billing ? (
          <Link component="button" variant="body2">
            {t(I18N.my_address.index.default_billing_addr)}
          </Link>
        ) : (
          <Link
            component="button"
            variant="body2"
            onClick={handleSetDefaultBilling}>
            {t(I18N.my_address.add.use_as_default_billing_addr)}
          </Link>
        )}
        {scene !== 'select' ? (
          <Link
            component="button"
            variant="body2"
            onClick={() => handleDeleteAddress(address.id)}>
            {t(I18N.my_address.index.delete_addr)}
          </Link>
        ) : null}
      </CardActions>
      <AddressModal open={open} onClose={_onClose} addressId={address.id} />
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 0,
    height: '100%'
  },
  cardHeader: {
    '& .MuiTypography-h5': {
      fontSize: '18px',
      fontWeight: '700'
    }
  },
  cardContent: {
    marginTop: theme.spacing(-4)
  },
  cardActions: {
    padding: theme.spacing(3, 0, 0, 2),
    fontWeight: 'normal',
    '& button': {
      fontWeight: '320'
    }
  }
}))
