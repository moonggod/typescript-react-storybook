import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, List, ListSubheader } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { getMessageList } from './_store/messageListSlice'
import { RootState } from '../../../app/store'
import { BServiceList } from './_compos/BServiceList'
import { MessageDialog } from '../../MDialog/MessageDialog'
import { Message } from './_controller/_types'

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
  const curCustomerId = 777 // TODO: where to get the current customer ID?
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(-1)
  useEffect(() => {
    getMessageList(curCustomerId)
  }, [getMessageList])

  if (isLoading) {
    return null // TODO: show global loading (e.g. https://github.com/rstacruz/nprogress) or local loading?
  }
  function handleMe (id: Message['id']) {
    setOpen(true)
    setId(id)
  }
  const handleSwitch = (event:any,value:number) => { // TODO: need to send real params
    getMessageList(curCustomerId)
  }
  return (
    <Box>
      <List>
        <ListSubheader>Message List</ListSubheader>
        <BServiceList data={messageList} handleMe={handleMe}/>
      </List>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleSwitch} />
      <MessageDialog open={open} id={id}/>
    </Box>
  )
}