import React, {useState, useEffect, Fragment} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, IconButton, ListItemText } from '@material-ui/core'
import { NotificationItem } from '../_controller/_types'
import { RootState } from '../../../../app/store'
import { deleteNotification, markReadNotification } from '../_store/listNotificationSlice'
import {DeleteOutline} from '@material-ui/icons'
import {getElapsedTime, switchHelper} from '../_helper'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../../../_i18n'


const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(1),
    margin: theme.spacing(0)
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  time: {
    padding: theme.spacing(0, 1),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  fontWeight: {
    fontWeight: 500
  },
  dotted:{
    width: '10px',
    height: '10px',
    backgroundColor:'#333',
    display: 'inline-block',
    borderRadius: '50%',
    marginRight:theme.spacing(1)
  },
  deleteBtn:{
    padding: theme.spacing(0)
  },
  content: {
    padding: theme.spacing(0, 1, 0, 2)
  }
}));

const connector = connect(
  (state: RootState, props: {item: NotificationItem}) => {
    const { deleteResult } = state.ListNotificationSlice
    return {
      deleteResult,
      item: props.item
    }
  },
  { 
    deleteNotification,
    markReadNotification
  }
)

export type Props = ConnectedProps<typeof connector>

export const ItemRender = connector(_ItemRender)

export function _ItemRender({
  deleteResult,
  item,
  deleteNotification,
  markReadNotification
}: Props) {
  const { t } = useTranslation(I18N_NS)
  const classes = useStyles()
  const [firstOpen, setFirstOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const [elapsedTime, setElapsedTime] = useState({
    result: 0,
    unit: ''
  })
  function deleteMe () {
    deleteNotification({id: item.id})
  }
  function toggleOpen () {
    if (!firstOpen) {
      markReadNotification({id: item.id})
      setFirstOpen(true)
    }
    setOpen(!open)
  }
  useEffect(() => {
    if (deleteResult.id === item.id) {
      setIsDeleted(true)
    }
    setElapsedTime(getElapsedTime(item.timeSent))
  }, [deleteResult, item])
  return (
    <Box>
    {
      !isDeleted ? (
        <ListItem className={classes.listItem} key={item.id}>
          <ListItemText
          secondary={
            <Fragment>
              {
                open ? <Box className={classes.content}>{item._content}</Box> : null
              }
            </Fragment>
          }>
            <Box display="flex" width="100%">
              <Box flexGrow={1} className={classes.title} onClick={toggleOpen}>
                <Box className={classes.dotted}/>{item._title}
              </Box>
              <Box>
                <Box className={classes.time}>{elapsedTime.result}{t(switchHelper(I18N.notification_list, elapsedTime.unit))}</Box>
              </Box>
              <Box>
                <IconButton className={classes.deleteBtn} aria-label="delete" color="primary" onClick={deleteMe}>
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItemText>
        </ListItem>
      ) : null
    }
    </Box>
  )
}