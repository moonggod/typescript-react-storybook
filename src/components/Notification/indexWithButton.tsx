import React, { useState, Fragment } from 'react'
import { IconButton, Popover, Badge } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Notifications
} from '@material-ui/icons'
import { Notification } from './index'

const useStyles = makeStyles((theme:Theme) => ({
  iconBtn: {
    margin: theme.spacing(0)
  }
}));

export const NotificationWithButton = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [
    notificationTotal,
    setNotificationTotal
  ] = useState(0)
  
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const setTotal = (total:number) => {
    setNotificationTotal(total)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined
  return (
    <Fragment>
      <IconButton aria-describedby={id} className={classes.iconBtn} onClick={handleClick}>
        <Badge badgeContent={notificationTotal} color="primary">
          <Notifications style={{ color: '#f00' }}/>
        </Badge>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Notification setTotal={setTotal}/>
      </Popover>
    </Fragment>
  )
}
