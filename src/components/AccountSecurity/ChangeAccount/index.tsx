import React, { useState, FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Button, TextField, } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { keyPathMirror } from 'key-path-mirror'
import { changeAccount } from '../_store/accountSecuritySlice'
import MainFrame from '../../MainFrame'
import { RootState } from '../../../app/store'
import { I18N, I18N_NS } from '../../_i18n'
import { ChangeAccountReq } from '../_controller/_types'
import { useFormValidation } from '../../../utils/formValidation/useFormValidation'

const connector = connect(
  (state: RootState) => {
    const { isLoading, bindEmailRes } = state.accountSecurity
    return {
      isLoading,
      bindEmailRes
    }
  },
  {
    changeAccount
  }
)

type Props = ConnectedProps<typeof connector>

export const ChangeAccount = connector(_ChangeAccount)

const formInitData = new ChangeAccountReq()
const fields = keyPathMirror(formInitData)

function _ChangeAccount({
  changeAccount
}: Props) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [formData, setFormData] = useState<ChangeAccountReq>({ ...formInitData })
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    ChangeAccountReq
  )

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value: string
    value = evt.target.value
    setFormData({ ...formData, [evt.target.id]: value })
  }

  const handleSubmit = async (evt: FormEvent) => {
    // TODO: submit to or do nothing.
    evt.preventDefault()
    if (!validateFormSync(formData)) return
    changeAccount({
      params: {
        customerId: 64 // TODO: how to get customerId
      },
      body: formData
    }) // TODO: how to get customerId
  }

  interface Fileld {
    firstName: object
    lastName: object
  }
  const baseAttr = {
    className: classes.textField,
    variant: 'outlined',
    onChange: handleInput,
    required: true
  }
  const formGroup: Fileld = {
    firstName: {
      ...baseAttr,
      className: classes.rowTextField,
      id: fields.firstName,
      placeholder: t(I18N.account_security.bind_email.pleaseInputEmail),
      value: formData.firstName,
      ...getFieldValidationProps(fields.firstName)
    },
    lastName: {
      ...baseAttr,
      className: classes.smsBoxTextField,
      id: fields.lastName,
      placeholder: t(I18N._common.ver_code._self),
      inputProps: { maxLength: 6 },
      value: formData.lastName,
      ...getFieldValidationProps(fields.lastName)
    }
  }
  return (
    <MainFrame>
      <Helmet>
        <title>{t(I18N.my_profile._self)}</title>
      </Helmet>
      <Box
        className={classes.mainContainer}
        display="flex"
        justifyContent="center">
        <Box width="40%" display="flex" flexDirection="column">
          <form onSubmit={handleSubmit} noValidate>
            <TextField {...formGroup.firstName} />
            <TextField {...formGroup.lastName} />
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
              disableElevation>
              {t(I18N.account_security.bind_email.confirm)}
            </Button>
          </form>
        </Box>
      </Box>
    </MainFrame>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(6, 0, 8)
    },
    captcha: {
      flex: '1',
      margin: theme.spacing(0, 0, 2, 0)
    },
    textField: {
      marginBottom: theme.spacing(2),
      width: '70%'
    },
    rowTextField: {
      marginBottom: theme.spacing(2),
      width: '100%'
    },
    errorTip: {
      position: 'absolute',
      left: '0',
      whiteSpace: 'nowrap'
    },
    grey: {
      color: '#aaa'
    },
    submit: {
      marginTop: theme.spacing(2),
      height: '50px'
    },
    smsBox: {
      marginBottom: theme.spacing(2)
    },
    smsBoxTextField: {
      marginBottom: theme.spacing(0),
      width: '70%'
    },
    smsBtn: {
      width: '25%',
      marginLeft: '5%',
      height: '54px'
    },
    pwdLevel: {
      marginTop: theme.spacing(2)
    }
  })
)
