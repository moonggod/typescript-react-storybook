import React, { useState, Fragment } from 'react'
import { IconButton, Popover } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Notifications
} from '@material-ui/icons'
import { ListNotification } from './index'

const useStyles = makeStyles((theme:Theme) => ({
  iconBtn: {
    margin: theme.spacing(0)
  }
}));

export const NotificationWithButton = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined
  return (
    <Fragment>
      <IconButton aria-describedby={id} className={classes.iconBtn} onClick={handleClick}>
        <Notifications />
      </IconButton>
      <Popover
        id={id}
        open={open}
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
        <ListNotification/>
      </Popover>
    </Fragment>
  )
}
