import React, { useState, useEffect, FormEvent } from 'react'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
import { Box, Button, TextField, Snackbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { keyPathMirror } from 'key-path-mirror'
import {
  sendSMSCode,
  checkEmail,
  accountSecuritySlice
} from '../_store/accountSecuritySlice'
import MainFrame from '../../MainFrame'
import MyCutDown from '../MyCutDown'
import { RootState } from '../../../app/store'
import { I18N, I18N_NS } from '../../_i18n'
import UTextPro from '../UTextPro'
import { BindEmailReq } from '../_controller/_types'
import { useFormValidation } from '../../../utils/formValidation/useFormValidation'
import { useHistory } from 'react-router-dom'

const connector = connect(
  (state: RootState) => {
    const { sendSMSCodeRes, checkEmailRes } = state.accountSecurity
    return {
      sendSMSCodeRes,
      checkEmailRes
    }
  },
  {
    sendSMSCode,
    checkEmail
  }
)

type Props = ConnectedProps<typeof connector>

export const CheckEmail = connector(_CheckEmail)

const formInitData = new BindEmailReq()
const fields = keyPathMirror(formInitData)

function _CheckEmail({
  sendSMSCodeRes,
  checkEmailRes,
  sendSMSCode,
  checkEmail
}: Props) {
  const { t } = useTranslation(I18N_NS)
  const classes = useStyles()
  const [formData, setFormData] = useState<BindEmailReq>(formInitData)
  const [open, setOpen] = useState(false)
  const [openCutDown, setOpenCutDown] = useState(false)
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    BindEmailReq
  )
  const history = useHistory()
  const dispatch = useDispatch()

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value: string
    value = evt.target.value
    setFormData({ ...formData, [evt.target.id]: value })
  }

  const handleSendSmsCode = async (evt: FormEvent) => {
    evt.preventDefault()
    if (
      validateFormSync({
        email: formData.email,
        smsCode: '000000'
      })
    ) {
      sendSMSCode({
        params: {
          customerId: 64 // TODO: how to get customerId
        },
        body: {
          email: formData.email
        }
      })
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleCutDownClose = () => {
    setOpenCutDown(false)
  }

  const handleSubmit = async (evt: FormEvent) => {
    // TODO: submit to or do nothing.
    evt.preventDefault()
    if (!validateFormSync(formData)) return
    checkEmail({
      params: {
        customerId: 64 // TODO: how to get customerId
      },
      body: formData
    }) // TODO: how to get customerId
  }
  useEffect(() => {
    if (sendSMSCodeRes.data) {
      setOpen(true)
      setOpenCutDown(true)
    }
    if (checkEmailRes.data) {
      dispatch(accountSecuritySlice.actions.resetSendSMSCodeRes())
      setTimeout(() => history.push('/bind-new-email'), 300)
    }
    // eslint-disable-next-line
  }, [sendSMSCodeRes, checkEmailRes])

  interface Fileld {
    currentemail: object
    smsCode: object
  }
  const baseAttr = {
    className: classes.textField,
    variant: 'outlined',
    onChange: handleInput,
    required: true
  }
  const formGroup: Fileld = {
    currentemail: {
      ...baseAttr,
      id: fields.email,
      className: classes.rowTextField,
      placeholder: t(
        I18N.account_security.checkcurrentemail.pleaseInputCurrentEmail
      ),
      value: formData.email,
      ...getFieldValidationProps(fields.email)
    },
    smsCode: {
      ...baseAttr,
      id: fields.smsCode,
      className: classes.smsBoxTextField,
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
            {t(I18N.account_security.checkcurrentemail._self)}
          </UTextPro>
          <UTextPro type="t3">
            {t(I18N.account_security.checkcurrentemail.currentBindEmail)}:
            <span className={classes.grey}>aj******@gmail.com</span>
          </UTextPro>
          <form onSubmit={handleSubmit} noValidate>
            <UTextPro type="labelStar">
              {t(
                I18N.account_security.checkcurrentemail.pleaseInputCurrentEmail
              )}
            </UTextPro>
            <TextField {...formGroup.currentemail} />
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
              {t(I18N.account_security.checkcurrentemail.next)}
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

export const CHECK_EMAIL = '/check-email'

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
