// https://material-ui.com/components/cards/
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { Address } from '../../../../../mock/controllers/customers/_types'
import { I18N, I18N_NS } from '../../../_i18n'
import { useHistory } from 'react-router-dom'

export type Props = {
  address: Address
}
export function AddressCard({ address }: Props) {
  const history = useHistory()
  const { t } = useTranslation(I18N_NS)

  const handleEdit = () => {
    history.push(`/my-address/change/${address.id}`)
    // TODO
  }
  const handleSetDefaultBilling = () => {
    // TODO
  }
  const handleSetDefaultShipping = () => {
    // TODO
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={`${address.firstname} ${address.lastname}`}
        subheader={address.telephone}
        action={
          <IconButton
            aria-label={t(I18N.my_address.index.edit)}
            onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          // TODO: delete btn?
        }
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {address.street}
        </Typography>
        <Typography variant="body1">
          {address.city} {address.postcode} {address.country_id}
        </Typography>
      </CardContent>
      <CardActions>
        {address.default_billing ? (
          <Button size="small" variant="contained" color="primary" disabled>
            {t(I18N.my_address.index.default_billing_addr)}
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleSetDefaultBilling}>
            {t(I18N.my_address.add.use_as_default_billing_addr)}
          </Button>
        )}
        {address.default_shipping ? (
          <Button size="small" variant="contained" color="primary" disabled>
            {t(I18N.my_address.index.default_shipping_addr)}
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleSetDefaultShipping}>
            {t(I18N.my_address.add.use_as_default_shipping_addr)}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
