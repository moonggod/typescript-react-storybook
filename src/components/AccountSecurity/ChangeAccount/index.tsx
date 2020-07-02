import React, { useState, FormEvent, useEffect } from 'react'
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

type OwnProps = {
  initData: ChangeAccountReq,
  dispatchCheck: boolean,
  checkCallback: any
}

const connector = connect(
  (state: RootState, {initData, dispatchCheck, checkCallback}: OwnProps) => {
    const { isLoading } = state.accountSecurity
    console.log('isLoading: ' + isLoading)
    return {
      isLoading,
      initData,
      checkCallback,
      dispatchCheck
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
  isLoading,
  initData,
  dispatchCheck,
  checkCallback,
  changeAccount
}: Props) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [formData, setFormData] = useState<ChangeAccountReq>({ ...formInitData })
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    ChangeAccountReq
  )
  
  if (isLoading) {
    console.log('Do something for loading') // TODO: Do something for loading
  }

  useEffect(() => {
    if (initData) {
      setFormData(initData)
    }
  },[initData])

  const checkValidate = async () => {
    return new Promise((resovle) => {
      if (validateFormSync(formData)) {
        resovle(true)
        checkCallback && checkCallback(formData)
      } else {
        resovle(false)
        checkCallback && checkCallback(false)
      }
    })
  }

  useEffect(() => {
    if (dispatchCheck) {
      checkValidate()
    }
    // eslint-disable-next-line
  },[dispatchCheck])

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value: string
    value = evt.target.value
    setFormData({ ...formData, [evt.target.id]: value })
  }

  const handleSubmit = async (evt: FormEvent) => {
    // TODO: submit to or do nothing.
    evt.preventDefault()
    const result = await checkValidate()
    if (!result) return
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
      label: t(I18N.account_security.bind_email.pleaseInputEmail),
      value: formData.firstName,
      ...getFieldValidationProps(fields.firstName)
    },
    lastName: {
      ...baseAttr,
      className: classes.rowTextField,
      id: fields.lastName,
      label: t(I18N._common.ver_code._self),
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
        className={classes.mainContainer}>
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
      padding: theme.spacing(0)
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
