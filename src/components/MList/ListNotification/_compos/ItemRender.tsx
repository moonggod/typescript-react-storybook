import React, {useState, useEffect} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, Grid, IconButton } from '@material-ui/core'
import { NotificationItem } from '../_controller/_types'
import { RootState } from '../../../../app/store'
import { deleteNotification, markReadNotification } from '../_store/listNotificationSlice'
import {DeleteOutline} from '@material-ui/icons'


const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
  },
  title: {},
  time: {
    paddingRight: theme.spacing(4)
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
    marginRight:'10px'
  },
  deleteBtn:{
    position: 'absolute',
    right: '10px'
  },
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
  const classes = useStyles()
  const [firstOpen, setFirstOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [open, setOpen] = useState(false)
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
  }, [deleteResult, item])
  return (
    <Box>
    {
      !isDeleted ? (
        <ListItem className={classes.listItem}  key={item.id}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Box className={classes.title} onClick={toggleOpen}><Box className={classes.dotted}/>{item._title}</Box>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.time}>{item.timeUpdated}</Box>
            </Grid>
            <IconButton className={classes.deleteBtn} aria-label="delete" color="primary" onClick={deleteMe}>
              <DeleteOutline fontSize="small" />
            </IconButton>
            {
              open ? <Box>{item._content}</Box> : null
            }
          </Grid>
        </ListItem>
      ) : null
    }
    </Box>
  )
}