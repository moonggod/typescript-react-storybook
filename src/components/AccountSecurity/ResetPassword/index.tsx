import React, { useState, useEffect, FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Button, TextField, Snackbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { keyPathMirror } from 'key-path-mirror'
import { resetPassword } from '../_store/accountSecuritySlice'
import MainFrame from '../../MainFrame'
import { RootState } from '../../../app/store'
import { I18N, I18N_NS } from '../../_i18n'
import UTextPro from '../UTextPro'
import { Password } from '../_controller/_types'
import { useFormValidation } from '../../../utils/formValidation/useFormValidation'

const connector = connect(
  (state: RootState) => {
    const { isLoading, resetPasswordRes } = state.accountSecurity
    return {
      isLoading,
      resetPasswordRes
    }
  },
  { resetPassword }
)

type Props = ConnectedProps<typeof connector>

export const ResetPassword = connector(_ResetPassword)

const formInitData = new Password()
const fields = keyPathMirror(formInitData)

function _ResetPassword({ isLoading, resetPasswordRes, resetPassword }: Props) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [formData, setFormData] = useState<Password>(formInitData)
  const [open, setOpen] = useState(false)
  const { validateFormSync, getFieldValidationProps } = useFormValidation(
    Password
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
    resetPassword({
      body: {
        currentpassword: formData.currentpassword,
        newpassword: formData.newpassword
      }
    })
  }
  useEffect(() => {
    if (resetPasswordRes.data) {
      setOpen(true)
    }
    // eslint-disable-next-line
  }, [resetPasswordRes])

  interface Fileld {
    currentpassword: object
    newpassword: object
    confirmnewpassword: object
  }
  const baseAttr = {
    className: classes.rowTextField,
    variant: 'outlined',
    onChange: handleInput,
    required: true
  }
  const formGroup: Fileld = {
    currentpassword: {
      ...baseAttr,
      id: fields.currentpassword,
      type: 'password',
      placeholder: t(I18N.account_security.reset_pwd.currentpassword),
      value: formData.currentpassword,
      ...getFieldValidationProps(fields.currentpassword)
    },
    newpassword: {
      ...baseAttr,
      id: fields.newpassword,
      type: 'password',
      placeholder: t(I18N.account_security.reset_pwd.newpassword),
      value: formData.newpassword,
      ...getFieldValidationProps(fields.newpassword)
    },
    confirmnewpassword: {
      ...baseAttr,
      id: fields.confirmnewpassword,
      type: 'password',
      placeholder: t(I18N.account_security.reset_pwd.confirmnewpassword),
      value: formData.confirmnewpassword,
      ...getFieldValidationProps(fields.confirmnewpassword)
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
            {t(I18N.account_security.reset_pwd._self)}
          </UTextPro>
          <UTextPro type="t3">
            {t(I18N.account_security.reset_pwd.currentAccount)}:{' '}
            <span className={classes.grey}>GFashion</span>
          </UTextPro>
          <form onSubmit={handleSubmit} noValidate>
            <UTextPro type="labelStar">
              {t(I18N.account_security.reset_pwd.currentpassword)}
            </UTextPro>
            <TextField {...formGroup.currentpassword} />
            <UTextPro type="labelStar">
              {t(I18N.account_security.reset_pwd.newpassword)}
            </UTextPro>
            <TextField {...formGroup.newpassword} />
            <Box className={classes.pwdLevel}>
              <UTextPro type="btTip">
                {t(I18N.account_security.reset_pwd.passwordLevel)}
              </UTextPro>
            </Box>
            <UTextPro type="labelStar">
              {t(I18N.account_security.reset_pwd.confirmnewpassword)}
            </UTextPro>
            <TextField {...formGroup.confirmnewpassword} />
            <Box>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
                disabled={isLoading}>
                {t(I18N.account_security.reset_pwd.submit)}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        message="This is a success message!"
      />
    </MainFrame>
  )
}
export const RESET_PASSWORD = '/reset-password'

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
