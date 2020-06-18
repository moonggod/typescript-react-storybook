import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem,
  Grid,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  List,
} from '@material-ui/core'
import { DialogMessage, GetDialogMessageListRes } from '../_controller/_types'

const useStyles = makeStyles(theme => ({
  blank: {},
  contentWindow: {
    height: '500px',
    overflow: 'auto'
  },
  itemTitle: {
    marginRight: theme.spacing(5)
  },
  contentLeft: {
    padding: theme.spacing(0,6)
  },
  contentRight: {
    padding: theme.spacing(0,6),
    textAlign: 'right'
  },
  avatarLeft: {
    position: 'absolute',
    left: '0'
  },
  avatarRight: {
    position: 'absolute',
    right: '0'
  },
  marginCenter: {
    margin: theme.spacing(1, 'auto')
  },
  inputWindow: {
    padding: theme.spacing(3, 1),
    borderTop: '1px solid #ddd'
  },
  inline: {
    display: 'inline',
  },
  hide: {
    display: 'none'
  },
  date: {
    color:'#999',
    fontSize: '14px'
  },
  textarea: {
    width: '80%',
    height: '200px',
    marginBottom: theme.spacing(2)
  },
  inputBtn: {
    marginRight: theme.spacing(2),
    display: 'inline'
  }
}))

export function TalkMessage(props:{data:GetDialogMessageListRes}) {
  const classes = useStyles()
  return (
    <List>
      {
        props.data.dialogMessageList.map((item:DialogMessage) => {
          return (
            <ListItem className={classes.blank} key={item.id}>
              <Grid container direction={item.type === 1 ? 'row' : 'row-reverse'}>
                <ListItemAvatar className={item.type === 1 ? classes.avatarLeft : classes.avatarRight}>
                  <Avatar className={classes.marginCenter} alt="Remy Sharp" src={item.avatar} />
                </ListItemAvatar>
                <Grid item xs={12}>
                  <ListItemText
                    primary={
                      <Fragment>
                        {item.name}<span className={classes.date}>{` - ${item.time}`}</span>
                      </Fragment>}
                    className={item.type === 1 ? classes.contentLeft : classes.contentRight}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {item.content}
                        </Typography>
                      </Fragment>
                    }
                  />
                </Grid>
              </Grid>
            </ListItem>
          )
        })
      }
    </List>
  )
}