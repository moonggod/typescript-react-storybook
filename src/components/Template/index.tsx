import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Grid, Button } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { RootState } from '../../app/store'
import { TemplateList } from './_compos/TemplateList'
import { GSnackbar } from '../Base/GSnackbar'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const connector = connect(
  (state: RootState) => {
    const { isLoading } = state.templateSlice
    return {
      isLoading
    }
  },
  {  }
)

export type Props = ConnectedProps<typeof connector>

export const Template = connector(_Template)

export function _Template({
  isLoading
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [severity, setSeverity] = React.useState('success')

  if (isLoading) {
    return null
  }

  const handleClick = () => {
    setSeverity('warning')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <TemplateList />
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
          </Button>
          <GSnackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity={severity}>
              This is a success message!
            </Alert>
          </GSnackbar>
        </Grid>
      </Grid>
    </Box>
  )
}