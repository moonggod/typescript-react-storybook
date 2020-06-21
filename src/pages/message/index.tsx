import React from 'react'
//components
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import { MessageList } from '../../components/MessageList'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(0)
    },
    wrapper: {
      padding: theme.spacing(0, 3)
    }
  })
)
export function Message() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Header/>
      <Box className={classes.wrapper}>
        <MessageList />
      </Box>
      <Footer/>
    </Box>
  )
}

export const MESSAGE_PAGE_URL = '/message'
