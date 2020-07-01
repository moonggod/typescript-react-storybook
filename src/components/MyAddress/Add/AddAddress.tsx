import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store'
import { keyPathMirror } from 'key-path-mirror'
// import { Helmet } from 'react-helmet-async'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box
} from '@material-ui/core'
import { Address } from '../_controller/_types'
import { useFormValidation } from '../../../utils/formValidation/useFormValidation'
import { I18N, I18N_NS } from '../../_i18n'
import {
  getCustomerById,
  addAddress,
  changeAddress,
  myAddressSlice
} from '../_store/myAddressSlice'
import { useHistory } from 'react-router-dom'
import { ADD_ADDRESS_PAGE_URL } from './index.page'

let formInitData = new Address()
let fields = keyPathMirror(formInitData)

function _getAddressById(addresses: any, addressId: string | number) {
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
  pathname: string
  addressId?: string | number
  onClose: any
}

const connector = connect(
  (state: RootState, props: OwnProps) => {
    const {
      customerInfo,
      addAddressSuccess,
      changeAddressSuccess
    } = state.myAddress
    const { pathname, addressId, onClose } = props
    return {
      customerInfo,
      addAddressSuccess,
      changeAddressSuccess,
      pathname,
      addressId,
      onClose
    }
  },
  {
    getCustomerById,
    addAddress,
    changeAddress
  }
)

type Props = ConnectedProps<typeof connector>

export const AddAddress = connector(_AddAddress)

export function _AddAddress({
  customerInfo,
  addAddressSuccess,
  changeAddressSuccess,
  pathname,
  addressId,
  onClose,
  getCustomerById,
  addAddress,
  changeAddress
}: Props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [formData, setFormData] = React.useState<Address>(formInitData)
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    Address
  )

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | boolean
    switch (evt.target.id) {
      case fields.default_billing:
      case fields.default_shipping:
        value = evt.target.checked
        break
      default:
        value = evt.target.value
    }
    setFormData({ ...formData, [evt.target.id]: value })
  }
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!validateFormSync(formData)) return

    if (pathname === ADD_ADDRESS_PAGE_URL) {
      addAddress({
        params: {
          customerId: 64
        },
        body: formData
      })
    } else {
      changeAddress({
        params: {
          customerId: 64
        },
        body: formData
      })
    }
  }

  const handleCancel = async (evt: React.FormEvent) => {
    evt.preventDefault()
    if (onClose) {
      onClose()
    } else {
      history.goBack()
    }
  }

  React.useEffect(() => {
    if (addAddressSuccess || changeAddressSuccess) {
      dispatch(myAddressSlice.actions.resetStatus()) // TODO: need to optimize logic
      if (onClose) {
        onClose()
      } else {
        history.goBack()
      }
    }
    // eslint-disable-next-line
  }, [addAddressSuccess, changeAddressSuccess])

  React.useEffect(() => {
    if (addressId && customerInfo.addresses.length) {
      setFormData(_getAddressById(customerInfo.addresses, addressId))
    } else if (addressId) {
      const curCustomerId = 777 // TODO: where to get the current customer ID?
      getCustomerById(curCustomerId)
    }
    // eslint-disable-next-line
  }, [addressId, customerInfo, getCustomerById])

  return (
    <Box width="100%">
      <form className={classes.root} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.firstname}
              label={t(I18N.my_address.add.firstname)}
              variant="outlined"
              onChange={handleInput}
              value={formData.firstname}
              fullWidth
              required
              {...getFieldValidationProps(fields.firstname)}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.lastname}
              label={t(I18N.my_address.add.lastname)}
              variant="outlined"
              onChange={handleInput}
              value={formData.lastname}
              fullWidth
              required
              {...getFieldValidationProps(fields.lastname)}
            />
          </Grid>
          {/* <Grid item xs={12} className={classes.textFieldContainer}>
          <TextField
            size="small"
            id={fields.company}
            label={t(I18N.my_address.add.company)}
            variant="outlined"
            onChange={handleInput}
            value={formData.company}
            fullWidth
            {...getFieldValidationProps(fields.company)}
          />
          </Grid>
          */}
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              multiline
              rows={1}
              id={fields.street}
              label={t(I18N.my_address.add.street)}
              variant="outlined"
              onChange={handleInput}
              value={formData.street}
              fullWidth
              required
              {...getFieldValidationProps(fields.street)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.country_id}
              label={t(I18N.my_address.add.country)}
              variant="outlined"
              onChange={handleInput}
              value={formData.country_id}
              fullWidth
              required
              {...getFieldValidationProps(fields.country_id)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.region_id}
              label={t(I18N.my_address.add.state_or_province)}
              variant="outlined"
              onChange={handleInput}
              value={formData.region_id}
              fullWidth
              required
              {...getFieldValidationProps(fields.region_id)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.city}
              label={t(I18N.my_address.add.city)}
              variant="outlined"
              onChange={handleInput}
              value={formData.city}
              fullWidth
              required
              {...getFieldValidationProps(fields.city)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.postcode}
              label={t(I18N.my_address.add.postal_code)}
              variant="outlined"
              onChange={handleInput}
              value={formData.postcode}
              fullWidth
              {...getFieldValidationProps(fields.postcode)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              size="small"
              id={fields.telephone}
              label={t(I18N._common.phone_num)}
              variant="outlined"
              onChange={handleInput}
              value={formData.telephone}
              fullWidth
              required
              {...getFieldValidationProps(fields.telephone)}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  label={t(I18N.my_address.add.use_as_default_billing_addr)}
                  control={
                    <Checkbox
                      color="primary"
                      checked={formData.default_billing}
                      id={fields.default_billing}
                      name={fields.default_billing}
                      onChange={handleInput}
                    />
                  }
                />
                <FormControlLabel
                  label={t(I18N.my_address.add.use_as_default_shipping_addr)}
                  control={
                    <Checkbox
                      color="primary"
                      checked={formData.default_shipping}
                      id={fields.default_shipping}
                      name={fields.default_shipping}
                      onChange={handleInput}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              className={classes.cancelBtn}
              onClick={handleCancel}
              variant="contained">
              {t(I18N.my_address.add.cancel)}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              className={classes.submitBtn}
              type="submit"
              color="primary"
              variant="contained">
              {t(I18N.my_address.add.save)}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 20),
    '& .MuiFormLabel-root': {
      color: '#868686'
    },
    '& .MuiCheckbox-root': {
      color: '#000'
    }
  },
  headTitle: {
    marginBottom: theme.spacing(2)
  },
  textFieldContainer: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2)
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 0
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#212121'
    }
  },
  cancelBtn: {
    marginTop: theme.spacing(2),
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #000',
    boxShadow: 'none',
    borderRadius: 0,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    width: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #000',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))
