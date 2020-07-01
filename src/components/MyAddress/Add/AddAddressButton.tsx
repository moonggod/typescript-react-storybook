// https://material-ui.com/components/cards/
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../../_i18n'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ADD_ADDRESS_PAGE_URL } from './index.page'
import { AddressModal } from './AddressModal'
import { Add as AddIcon } from '@material-ui/icons'

export type Props = {
  scene?: string
  onClose?: any
}
export function AddAddressButton({ scene, onClose }: Props) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation(I18N_NS)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (scene === 'select') {
      setOpen(true)
    } else {
      history.push(ADD_ADDRESS_PAGE_URL)
    }
  }

  const _onClose = (data: any) => {
    setOpen(false)
    if (data) {
      onClose()
    }
  }

  return (
    <Fragment>
      <Button
        variant="contained"
        color="default"
        onClick={handleClick}
        className={classes.goToAddAddrPageBtnLink}
        startIcon={<AddIcon className={classes.addAddressIcon} />}>
        {t(I18N.my_address.add._seo.title)}
      </Button>
      <AddressModal open={open} onClose={_onClose} />
    </Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  goToAddAddrPageBtnLink: {
    marginTop: theme.spacing(0),
    width: '100%',
    minHeight: '160px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
    borderRadius: 0,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#f1f1f1'
    },
    '& .MuiButton-label': {
      position: 'absolute',
      fontWeight: '360',
      top: '50%'
    },
    '& .MuiButton-iconSizeMedium > svg': {
      fontSize: '48px'
    }
  },
  addAddressIcon: {
    position: 'absolute',
    fontWeight: 'normal',
    top: '50%',
    left: '50%',
    marginLeft: theme.spacing(-3),
    marginTop: theme.spacing(-7)
  }
}))
