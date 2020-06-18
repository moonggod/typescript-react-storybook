import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, List, Button, Typography } from '@material-ui/core'
import { getListNotification } from './_store/listNotificationSlice'
import { RootState } from '../../../app/store'
import { ListRender } from './_compos/ListRender'
import { Notification } from './_controller/_types'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../../_i18n'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
  },
  title: {},
  time: {},
  fontWeight: {
    fontWeight: 500
  },
  dotted:{
    width: '10px',
    height: '10px',
    backgroundColor:'#333',
    display: 'inline-block',
    borderRadius: '50%',
    marginRight:'10px'
  },
  deleteBtn:{
    position: 'absolute',
    right: '10px'
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
  { getListNotification }
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
  useEffect(() => {
    getListNotification({limit:10, secondsAgo: 3000})
  }, [getListNotification])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }
  function deleteMe (id: Notification['id']) {
    console.log(id) // TODO: delete me
  }
  const toggleShow = () => { // TODO: need to send real params
    getListNotification({limit:10, secondsAgo: 3000})
  }
  return (
    <Box>
      <Typography noWrap gutterBottom variant="h3" component="h2">
        {t(I18N.notification_list._self)}
      </Typography>
      <Typography noWrap gutterBottom variant="h5" component="h2">
        {t(I18N.notification_list.system)}
      </Typography>
      <List>
        <ListRender data={listNotification} deleteMe={deleteMe}/>
      </List>
      <Typography noWrap gutterBottom variant="h5" component="h2">
        {t(I18N.notification_list.gc)}
      </Typography>
      <List>
        <ListRender data={listNotification} deleteMe={deleteMe}/>
      </List>
      <Typography noWrap gutterBottom variant="h5" component="h2">
        {t(I18N.notification_list.gp)}
      </Typography>
      <List>
        <ListRender data={listNotification} deleteMe={deleteMe}/>
      </List>
      <Box className={classes.toggleShow}>
        <Button variant="text" onClick={toggleShow}>{t(I18N.notification_list.show_more)}</Button>
      </Box>
    </Box>
  )
}