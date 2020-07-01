import React from 'react'
import clsx from 'clsx'
import { Box, Button, CircularProgress, colors } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  loading?: boolean
  onClick: any
  success: boolean
  children: any
}

export const GButtonWithLoading = ({loading,onClick,success,children}:Props) => {
  const classes = useStyles()
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  })
  return (
    <Box className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        className={buttonClassname}
        disabled={loading}
        onClick={onClick}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      display: 'inline-block',
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: colors.green[500],
      '&:hover': {
        backgroundColor: colors.green[700],
      },
    },
    buttonProgress: {
      color: colors.green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
)