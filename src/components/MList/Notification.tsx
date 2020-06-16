import React, { Fragment, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, ListItemAvatar, Avatar, ListItemText, Typography, Button } from '@material-ui/core'
import { getMessageList } from '../_store/MListSlice'
import { RootState } from '../../app/store'
import { Message, GetMessageListRes } from '../../mock/controllers/mList/_types'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    borderBottom: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  title: {
    color: '#f06a3c',
    paddingRight: theme.spacing(3)
  },
  text: {
    color: '#59567c'
  },
  date: {
    color: '#858384'
  },
  posRight: {
    position: 'absolute',
    right: theme.spacing(2)
  },
  marginCenter: {
    margin: theme.spacing(1, 'auto')
  },
  inline: {
    display: 'inline'
  },
  avatarLeft: {
    position: 'absolute',
    left: '0'
  },
  contentLeft: {
    padding: theme.spacing(0,6)
  },
  unreadBtn: {
    width: '100%',
    textAlign: 'center'
  }
}));

export function RenderItems(props:{messageList:GetMessageListRes}) {
  const classes = useStyles()
  return (
    <Box>
    {
      props.messageList.messageList.map((item:Message) => {
        return (
          <ListItem button className={classes.listItem}  key={item.id}>
            <Grid container>
              <ListItemAvatar className={classes.avatarLeft}>
                <Avatar className={classes.marginCenter} alt="Remy Sharp" src={item.avatar} />
              </ListItemAvatar>
              <Grid item xs={12}>
                <ListItemText
                  className={classes.contentLeft}
                  primary={
                    <Fragment>
                      {item.designer}<span className={classes.date}>{` - ${item.time}`}</span>
                    </Fragment>
                  }
                  secondary={
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                          >
                        {item.designer}
                      </Typography>
                    </Fragment>
                  }
                />
              </Grid>
              <Box className={classes.posRight}>7:00AM 05-Jun-2020</Box>
            </Grid>
          </ListItem>
        )
      })
    }
    </Box>
  )
}

const connector = connect(
  (state: RootState) => {
    const { isLoading, messageList } = state.MListSlice
    return {
      isLoading,
      messageList
    }
  },
  { getMessageList }
)

export type Props = ConnectedProps<typeof connector>

export const Notification = connector(_Notification)
export function _Notification({
  isLoading,
  messageList,
  getMessageList
}: Props) {
  const classes = useStyles()
  const curCustomerId = 777 // TODO: where to get the current customer ID?
  useEffect(() => {
    getMessageList(curCustomerId)
  }, [getMessageList])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }

  // const handleSwitch = (event:any,value:number) => {
  //   getMessageList(curCustomerId)
  // }
  return (
    <Box>
      <List>
        <RenderItems messageList={messageList}/>
      </List>
      <Button className={classes.unreadBtn} variant="text">See All (3 unread)</Button>
    </Box>
  )
}