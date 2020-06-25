import React, {useState, useEffect, Fragment} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, IconButton, ListItemText } from '@material-ui/core'
import { NotificationItem } from '../_controller/_types'
import { RootState } from '../../../app/store'
import { deleteNotification, markReadNotification } from '../_store/notificationSlice'
import {DeleteOutline} from '@material-ui/icons'
import {getElapsedTime, switchHelper} from '../_helper'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../_i18n'


const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(0, 1.5),
    margin: theme.spacing(0),
    color: '#5b6271',
    fontSize: '16px'
  },
  title: {
    padding: theme.spacing(0),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  time: {
    padding: theme.spacing(0.5, 1),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '12px',
    color: '#5b6271',
    minWidth: '90px',
  },
  fontWeight: {
    fontWeight: 700
  },
  dotted:{
    width: '8px',
    height: '8px',
    backgroundColor:'#e2a329',
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
    verticalAlign: 'top',
    marginTop: theme.spacing(0.9),
  },
  deleteBtn:{
    padding: theme.spacing(1),
    marginTop: theme.spacing(-0.5),
    marginLeft: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(0, 1, 0, 2.5),
    fontSize: '14px',
    color: '#999'
  }
}));

const connector = connect(
  (state: RootState, props: {item: NotificationItem}) => {
    const { deleteResult } = state.notificationSlice
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
  function deleteMe (event:any) {
    event.preventDefault()
    deleteNotification({id: item.id})
  }
  function toggleOpen (event:any) {
    if(event.target.nodeName === 'svg') return
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
            <Box display="flex" width="100%" onClick={toggleOpen}>
              <Box flexGrow={1} className={classes.title + (!firstOpen ? (' ' + classes.fontWeight) : '')}>
                <Box className={classes.dotted}/>{item._title}
              </Box>
              <Box className={classes.time + (!firstOpen ? (' ' + classes.fontWeight) : '')}>{elapsedTime.result}{t(switchHelper(I18N.notification, elapsedTime.unit))}</Box>
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