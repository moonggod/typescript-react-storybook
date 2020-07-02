import React, { useState, useEffect, FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Button, TextField, Snackbar } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { keyPathMirror } from 'key-path-mirror'
import { sendSMSCode, bindEmail } from '../_store/accountSecuritySlice'
import MainFrame from '../../MainFrame'
import MyCutDown from '../MyCutDown'
import { RootState } from '../../../app/store'
import { I18N, I18N_NS } from '../../_i18n'
import UTextPro from '../UTextPro'
import { BindEmailReq } from '../_controller/_types'
import { useFormValidation } from '../../../utils/formValidation/useFormValidation'

type OwnProps = {
  dispatchCheck?: boolean,
  checkCallback?: any
}

const connector = connect(
  (state: RootState, {dispatchCheck, checkCallback}:OwnProps) => {
    const { isLoading, sendSMSCodeRes, bindEmailRes } = state.accountSecurity
    return {
      isLoading,
      sendSMSCodeRes,
      bindEmailRes,
      dispatchCheck,
      checkCallback
    }
  },
  {
    sendSMSCode,
    bindEmail
  }
)

type Props = ConnectedProps<typeof connector>

export const BindEmail = connector(_BindEmail)

const formInitData = new BindEmailReq()
const fields = keyPathMirror(formInitData)

function _BindEmail({
  sendSMSCodeRes,
  bindEmailRes,
  dispatchCheck,
  checkCallback,
  sendSMSCode,
  bindEmail
}: Props) {
  const { pathname } = useLocation()
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [formData, setFormData] = useState<BindEmailReq>({ ...formInitData })
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    BindEmailReq
  )
  const [open, setOpen] = useState(false)
  const [openCutDown, setOpenCutDown] = useState(false)

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value: string
    value = evt.target.value
    setFormData({ ...formData, [evt.target.id]: value })
  }

  const handleSendSmsCode = async (evt: FormEvent) => {
    evt.preventDefault()
    if (!validateFormSync({ email: formData.email, smsCode: '000000' })) return
    sendSMSCode({
      params: {
        customerId: 64 // TODO: how to get customerId
      },
      body: {
        email: formData.email
      }
    })
  }
  const handleSubmit = async (evt: FormEvent) => {
    // TODO: submit to or do nothing.
    evt.preventDefault()
    const result = await checkValidate()
    if (!result) return
    bindEmail({
      params: {
        customerId: 64 // TODO: how to get customerId
      },
      body: formData
    }) // TODO: how to get customerId
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleCutDownClose = () => {
    setOpenCutDown(false)
  }

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
    if (sendSMSCodeRes.data) {
      setOpen(true)
      setOpenCutDown(true)
    }
    if (bindEmailRes.data) {
      setOpen(true)
    }
    // eslint-disable-next-line
  }, [sendSMSCodeRes, bindEmailRes])

  useEffect(() => {
    if (dispatchCheck) {
      checkValidate()
    }
    // eslint-disable-next-line
  },[dispatchCheck])

  interface Fileld {
    email: object
    smsCode: object
  }
  const baseAttr = {
    className: classes.textField,
    variant: 'outlined',
    onChange: handleInput,
    required: true
  }
  const formGroup: Fileld = {
    email: {
      ...baseAttr,
      className: classes.rowTextField,
      id: fields.email,
      placeholder: t(I18N.account_security.bind_email.pleaseInputEmail),
      value: formData.email,
      ...getFieldValidationProps(fields.email)
    },
    smsCode: {
      ...baseAttr,
      className: classes.smsBoxTextField,
      id: fields.smsCode,
      placeholder: t(I18N._common.ver_code._self),
      inputProps: { maxLength: 6 },
      value: formData.smsCode,
      ...getFieldValidationProps(fields.smsCode)
    }
  }
  return (
    <MainFrame>
      <Helmet>
        <title>{t(I18N.account_security._seo.title)}</title>
      </Helmet>
      <Box
        className={classes.mainContainer}
        display="flex"
        justifyContent="center">
        <Box width="40%" display="flex" flexDirection="column">
          <UTextPro type="t1">{t(I18N.account_security._self)}</UTextPro>
          <UTextPro type="t2">
            {pathname === BIND_NEW_EMAIL
              ? t(I18N.account_security.bind_email.bindnewemail)
              : t(I18N.account_security.bind_email._self)}
          </UTextPro>
          <form onSubmit={handleSubmit} noValidate>
            <UTextPro type="labelStar">
              {t(I18N.account_security.bind_email.pleaseInputEmail)}
            </UTextPro>
            <TextField {...formGroup.email} />
            <UTextPro type="labelStar">
              {t(I18N._common.ver_code._self)}
            </UTextPro>
            <Box
              className={classes.smsBox}
              display="flex"
              justifyContent="space-between">
              <TextField {...formGroup.smsCode} />
              <Button
                className={classes.smsBtn}
                variant="contained"
                color="primary"
                onClick={handleSendSmsCode}
                disabled={openCutDown}
                disableElevation>
                {openCutDown ? (
                  <MyCutDown
                    opencutdown={openCutDown}
                    onClose={handleCutDownClose}
                  />
                ) : (
                  t(I18N._common.ver_code.send)
                )}
              </Button>
            </Box>
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
              disableElevation>
              {t(I18N.account_security.bind_email.confirm)}
            </Button>
          </form>
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="This is a success message!"
          />
        </Box>
      </Box>
    </MainFrame>
  )
}

export const BIND_EMAIL = '/bind-email'
export const BIND_NEW_EMAIL = '/bind-new-email'

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
