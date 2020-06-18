import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textAlign: 'center',
      backgroundColor: '#0b2346',
      color: '#fff',
      margin: theme.spacing(0, 0, 3),
      padding: theme.spacing(3),
    }
  })
)

export default function Header() {
  const classes = useStyles()
  return (
    <Box className={classes.header}>Header of page</Box>
  )
}