import React, { useEffect, useState, Fragment, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { connect, ConnectedProps } from 'react-redux'
import AccountFrame from '../AccountFrame'
import { Box, Typography, Divider, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { RootState } from '../../app/store'
import { I18N, I18N_NS } from '../_i18n'
import { getCustomerById } from '../MyAddress/_store/myAddressSlice'
import { Edit as EditIcon } from '@material-ui/icons'

const connector = connect(
  (state: RootState) => {
    const { isLoading, customerInfo } = state.myAddress
    return {
      isLoading,
      customerInfo
    }
  },
  {
    getCustomerById
  }
)

export type Props = ConnectedProps<typeof connector>

export const MyProfile = connector(_MyProfile)
export function _MyProfile({
  isLoading,
  customerInfo,
  getCustomerById
}: Props) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [openEditPanel, setOpenEditPanel] = useState(false)

  useEffect(() => {
    const curCustomerId = 777 // TODO: where to get the current customer ID?
    getCustomerById(curCustomerId)
  }, [getCustomerById])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }

  const handleEdit = (evt:MouseEvent) => {
    evt.preventDefault()
    setOpenEditPanel(true)
  }

  return (
    <AccountFrame>
      <Box width="1000px">
        <Box>
          <Typography variant="h2">{t(I18N.my_account._self)}</Typography>
          <Divider />
          {
            openEditPanel ? (
              <Fragment>
                <Box display="flex">
                  <Typography variant="h5">{t(I18N.my_profile.contact_info)}</Typography>
                  <Button
                    variant="text"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >{t(I18N.my_address.index.edit)}</Button>
                </Box>
                <Box>
                  <Box className={classes.infoPanel}>
                    <Box className={classes.baseId} display="flex">
                      <Box>{customerInfo.dob}</Box>
                      <Box className={classes.level}>Lv.5</Box>
                    </Box>
                    <Box className={classes.baseId}>{customerInfo.email}</Box>
                    <Box className={classes.baseId}>
                      {t(I18N._common.gclub_account)}: {customerInfo.store_id}
                    </Box>
                  </Box>
                </Box>
              </Fragment>
            ) : (
            <Fragment>
              <Typography variant="h5">{t(I18N.my_profile.contact_info)}</Typography>
            </Fragment>
            )
          }
          <Box className={classes.btnBox}>
            <Button variant="contained" color="primary">
              CHANG MY PASSWORD
            </Button>
          </Box>
        </Box>
      </Box>
    </AccountFrame>
  )
}

export const MY_PROFILE_PAGE_URL = '/my-profile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(6, 0, 8)
    },
    title: {
      flex: '1',
      margin: theme.spacing(4, 0, 3),
      '&:first-child': {
        marginTop: theme.spacing(0)
      }
    },
    avatar: {
      height: '80px',
      width: '80px',
      marginRight: theme.spacing(2)
    },
    columnPanel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    baseTitle: {
      fontSize: '20px',
      paddingBottom: theme.spacing(2)
    },
    baseId: {
      fontSize: '14px'
    },
    oprateItem: {
      marginBottom: theme.spacing(2)
    },
    label: {
      width: '80px'
    },
    text: {
      width: '160px',
      padding: theme.spacing(0, 1)
    },
    infoPanel:{},
    link: {},
    button: {},
    level: {
      padding: theme.spacing(0, 1.5),
      backgroundColor: '#000',
      color: '#F0CE94'
    },
    btnBox: {
      marginTop: theme.spacing(3),
      '& .MuiButtonBase-root': {
        borderRadius: '0'
      }
    }
  })
)
