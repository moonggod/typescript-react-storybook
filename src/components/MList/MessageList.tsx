import React, { Fragment, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, ListSubheader, Button, Link } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { getMessageList } from '../_store/MListSlice'
import { RootState } from '../../app/store'
import { Message, GetMessageListRes } from '../../mock/controllers/mList/_types'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  button: {},
  fontWeight: {
    fontWeight: 500
  }
}));

export function RenderItems(messageList:GetMessageListRes) {
  const classes = useStyles()
  const preventDefault = (event:any) => event.preventDefault()
  return messageList.messageList.map((item:Message) => {
    const _classTitle = item.status === 0 ? classes.fontWeight : ''
    return (
      <ListItem className={classes.listItem}  key={item.id}>
        <Grid container spacing={3}>
          <Fragment>
            <Grid item xs={2}>
              <Box className={_classTitle}>2020/10/3 22:30:10</Box>
            </Grid>
            <Grid item xs={3}>
              <Box className={_classTitle}>Designer:  Gucci</Box>
            </Grid>
            <Grid item xs={2}>
              <Box className={_classTitle}>User:&nbsp;wenpeng</Box>
            </Grid>
            <Grid item xs={2}>
              <Box className={_classTitle}>
                Order:&nbsp;<Link href="#" onClick={preventDefault}>12121212</Link>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className={_classTitle}>Service: Service01</Box>
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item xs={7}>
              <Box>Service01:&nbsp;请您稍后，我询问一下供应商</Box>
            </Grid>
            <Grid item xs={3}>
            <Button variant="outlined" color="primary">点击进入</Button>
            </Grid>
            <Grid item xs={2}>
              <Box>未处理</Box>
            </Grid>
          </Fragment>
        </Grid>
      </ListItem>
    )
  })
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

export const MessageList = connector(_MessageList)
export function _MessageList({
  isLoading,
  messageList,
  getMessageList
}: Props) {
  useEffect(() => {
    const curCustomerId = 777 // TODO: where to get the current customer ID?
    getMessageList(curCustomerId)
  }, [getMessageList])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }

  const handleSwitch = (event:any,value:number) => {
    console.log(value)
  }
  return (
    <Box>
      <List>
        <ListSubheader>Message List</ListSubheader>
        {RenderItems(messageList)}
      </List>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleSwitch} />
    </Box>
  )
}