import React, {  } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { RootState } from '../../app/store'
import { TemplateList } from './_compos/TemplateList'

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
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <TemplateList />
        </Grid>
        <Grid item xs={3}>
          {/* TODO: right detail */}
        </Grid>
      </Grid>
    </Box>
  )
}