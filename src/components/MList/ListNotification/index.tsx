import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, List, Button, Typography, IconButton } from '@material-ui/core'
import { getListNotification, deleteNotification, markReadNotification } from './_store/listNotificationSlice'
import { RootState } from '../../../app/store'
import { ItemRender } from './_compos/ItemRender'
import { NotificationItem } from './_controller/_types'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../../_i18n'
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
    right: '10px',
    color: '#000000'
  },
  list: {
    backgroundColor: '#f5f5f5',
  },
  topTitleBox: {
    borderBottom: '1px solid #e8e8e8'
  },
  title: {
    padding: theme.spacing(1, 2),
    fontSize: '22px',
  },
  subTitle: {
    padding: theme.spacing(1, 2),
    fontSize: '18px'
  },
  fontWeight: {
    fontWeight: 500
  },
  toggleShow: {
    textAlign: 'center'
  }
}));

const connector = connect(
  (state: RootState) => {
    const { isLoading, listNotification } = state.ListNotificationSlice
    return {
      isLoading,
      listNotification
    }
  },
  { 
    getListNotification,
    deleteNotification,
    markReadNotification
  }
)

export type Props = ConnectedProps<typeof connector>

export const ListNotification = connector(_ListNotification)
export function _ListNotification({
  isLoading,
  listNotification,
  getListNotification
}: Props) {
  const classes = useStyles()
  // const curCustomerId = 777 // TODO: where to get the current customer ID?
  const { t } = useTranslation(I18N_NS)
  const [myList, setMyList] = useState({categoryOrder:[],categoryList: {}})
  const [showNumber, setShowNumber] = useState(5)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getListNotification({limit:10, secondsAgo: 20000})
  }, [getListNotification])

  useEffect(() => {
    if (listNotification.length) {
      setTotal(listNotification.length)
      setMyList(adaptList(listNotification, showNumber))
    }
  }, [listNotification, showNumber])

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
          {t(I18N.notification_list._self)}
        </Typography>
        <IconButton
          className={classes.setting}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true">
          <Settings />
        </IconButton>
      </Box>
      {
        myList.categoryOrder.map((c: string) => {
          const _list = switchHelper(myList.categoryList, c)
          return (
            <Box key={c}>
              {
              _list ? (
                <Box>
                  <Typography className={classes.subTitle} noWrap gutterBottom variant="h5" component="h2">
                    {
                      c === 'normal' ? t(I18N.notification_list.category_normal) : ''
                    }
                  </Typography>
                  <List className={classes.list}>
                  {
                    _list.map((item:NotificationItem) => {
                      return (
                        <ItemRender item={item} key={item.id} />
                      )
                    })
                  }
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
            <Button variant="text" onClick={toggleShow}>{t(I18N.notification_list.show_more)}</Button>
          </Box>
        ) : null
      }
    </Box>
  )
}