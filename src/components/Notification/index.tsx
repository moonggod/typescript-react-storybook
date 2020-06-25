import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, List, Button, Typography, IconButton, ListSubheader } from '@material-ui/core'
import { getListNotification, deleteNotification, markReadNotification } from './_store/notificationSlice'
import { RootState } from '../../app/store'
import { ItemRender } from './_compos/ItemRender'
import { NotificationItem } from './_controller/_types'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from './_i18n'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { adaptList, switchHelper } from './_helper'
import {
  Settings
} from '@material-ui/icons'

const useStyles = makeStyles((theme:Theme) => ({
  popWindow: {
    padding: theme.spacing(1,0),
    width: '400px'
  },
  setting: {
    position: 'absolute',
    right: theme.spacing(1),
    color: '#000000',
    top: theme.spacing(0.5)
  },
  list: {
    backgroundColor: '#f5f5f5',
    padding: 0
  },
  topTitleBox: {
    borderBottom: '1px solid #e8e8e8'
  },
  title: {
    padding: theme.spacing(1, 2),
    fontSize: '22px'
  },
  subTitle: {
    padding: theme.spacing(0, 2, 0),
    fontSize: '18px',
    color: '#333',
    backgroundColor: '#fff',
  },
  fontWeight: {
    fontWeight: 500
  },
  toggleShow: {
    textAlign: 'center',
    margin: theme.spacing(1.5, 0, 0.5)
  },
  listWindow: {
    maxHeight: '500px',
    overflow: 'auto'
  },
  listContent: {
    padding: theme.spacing(1,0)
  }
}));

const connector = connect(
  (state: RootState, props: {setTotal?: any}) => {
    const { isLoading, listNotification, total, unreadTotal } = state.notificationSlice
    return {
      isLoading,
      listNotification,
      total,
      unreadTotal,
      setTotal: props.setTotal
    }
  },
  { 
    getListNotification,
    deleteNotification,
    markReadNotification
  }
)

export type Props = ConnectedProps<typeof connector>

export const Notification = connector(_Notification)
export function _Notification({
  isLoading,
  listNotification,
  total,
  unreadTotal,
  setTotal,
  getListNotification
}: Props) {
  const classes = useStyles()
  // const curCustomerId = 777 // TODO: where to get the current customer ID?
  const { t } = useTranslation(I18N_NS)
  const [myList, setMyList] = useState({categoryOrder:[],categoryList: {}})
  const [showNumber, setShowNumber] = useState(5)
  
  useEffect(() => {
    getListNotification({limit:10, secondsAgo: 90000000})
  }, [getListNotification])

  useEffect(() => {
    if (listNotification.length) {
      setMyList(adaptList(listNotification, showNumber))
    }
  }, [listNotification, showNumber])

  useEffect(() => {
    setTotal(unreadTotal)
  }, [setTotal, unreadTotal])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }
  const toggleShow = () => { // TODO: need to send real params
    setShowNumber(showNumber === 5 ? 99 : 5)
  }
  return (
    <Box className={classes.popWindow}>
      <Box className={classes.topTitleBox} display="flex">
        <Typography className={classes.title} noWrap gutterBottom variant="h3" component="h2">
          {t(I18N.notification._self)}
        </Typography>
        <IconButton
          className={classes.setting}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true">
          <Settings />
        </IconButton>
      </Box>
      <Box className={classes.listWindow}>
      {
        myList.categoryOrder.map((c: string) => {
          const _list = switchHelper(myList.categoryList, c)
          return (
            <Box key={c}>
              {
              _list ? (
                <Box>
                  <List className={classes.list}>
                    <ListSubheader className={classes.subTitle}>
                      {t(switchHelper(I18N.notification, `category_${c}`))}
                    </ListSubheader>
                    <Box className={classes.listContent}>
                    {
                      _list.map((item:NotificationItem) => {

                        return (
                          <ItemRender item={item} key={item.id} />
                        )
                      })
                    }
                    </Box>
                  </List>
                </Box>
              ) : null
              }
            </Box>)
        })
      }
      {
        total > 5 ? (
          <Box className={classes.toggleShow}>
            <Button variant="text" onClick={toggleShow}>{showNumber === 5 ? t(I18N.notification.show_more) : t(I18N.notification.show_less)}</Button>
          </Box>
        ) : null
      }
      </Box>
    </Box>
  )
}