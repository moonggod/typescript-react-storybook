import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Footer: {
      textAlign: 'center',
      backgroundColor: '#0b2346',
      color: '#fff',
      margin: theme.spacing(3, 0, 0),
      padding: theme.spacing(3),
    }
  })
)

export default function Footer() {
  const classes = useStyles()
  return (
    <Box className={classes.Footer}>Footer of page</Box>
  )
}