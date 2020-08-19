import React from 'react'
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  open: boolean
  onClose: any
}
export default ({open, onClose}: Props) => {
  const classes = useStyles()
  return (
    <Drawer className={classes.drawer} anchor="right" open={open} onClose={onClose}>
      <div className={classes.content}>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  drawer: {
    '& .MuiPaper-root': {
      width: '100%',
    }
  },
  content: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    padding: theme.spacing(1),
    '& p': {
      padding: theme.spacing(10, 0),
    }
  }
}))
