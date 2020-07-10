import React, { useEffect, useState, MouseEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, List, Button, Typography } from '@material-ui/core'
import { getListNotification, deleteNotification, markReadNotification } from './_store/notificationSlice'
import { RootState } from '../../app/store'
import { ItemRender } from './_compos/ItemRender'
import { NotificationItem } from './_controller/_types'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from './_i18n'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { adaptList, switchHelper } from './_helper'
import { getLoginInfo } from '../../_cache_stores/login'

const useStyles = makeStyles((theme:Theme) => ({
  popWindow: {
    padding: theme.spacing(0),
    width: '540px'
  },
  setAllRead: {
    position: 'absolute',
    right: theme.spacing(1),
    color: '#006fcf',
    top: theme.spacing(0.5),
    fontSize: '16px'
  },
  list: {
    padding: theme.spacing(0, 2)
  },
  topTitleBox: {
  },
  title: {
    padding: theme.spacing(2, 2, 0),
    fontSize: '16px',
    color:'#b8b8b8'
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
    margin: theme.spacing(1, 0, 1.5)
  },
  listWindow: {
    maxHeight: '500px',
    overflow: 'auto'
  },
  listContent: {
    padding: theme.spacing(1,0),
    '& .MuiListItem-container:last-child': {
      '& .MuiListItem-root': {
        marginBottom: 0
      }
    }
  }
}));

const connector = connect(
  (state: RootState, props: {setTotal?: any}) => {
    const { isLoading, listNotification, total, unreadTotal } = state.notification
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
  const login = getLoginInfo()
  const customerId = login?.member?.id
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const [myList, setMyList] = useState({categoryOrder:[],categoryList: {}})
  const [showNumber, setShowNumber] = useState(5)
  const [markNow, setMarkNow] = useState(false)
  const handleMarkAll = (event:MouseEvent) => {
    event.preventDefault()
    setMarkNow(true)
  }
  useEffect(() => {
    if (customerId) {
      getListNotification({ limit: 10, secondsAgo: 90000000 })
    }
  }, [getListNotification, customerId])

  useEffect(() => {
    if (listNotification && listNotification.length) {
      setMyList(adaptList(listNotification, showNumber))
    }
  }, [listNotification, showNumber])

  useEffect(() => {
    if (!isLoading && login?.member?.id) {
      setTotal(unreadTotal)
    }
  }, [setTotal, unreadTotal, login, isLoading])
  const toggleShow = () => {
    setShowNumber(showNumber === 5 ? 99 : 5)
  }
  return (
    <Box className={classes.popWindow}>
      <Box className={classes.topTitleBox} display="flex">
        <Typography className={classes.title} noWrap gutterBottom variant="h3" component="h2">
          {t(I18N.notification._self)}
        </Typography>
        <Button
          className={classes.setAllRead}
          onClick={handleMarkAll}
          variant="text">
            {t(I18N.notification.mark_all_as_read)}
        </Button>
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
                    {/* <ListSubheader className={classes.subTitle}>
                      {t(switchHelper(I18N.notification, `category_${c}`))}
                    </ListSubheader> */}
                    <Box className={classes.listContent}>
                    {
                      _list.map((item:NotificationItem) => {

                        return (
                          <ItemRender item={item} key={item.id} markNow={markNow} />
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