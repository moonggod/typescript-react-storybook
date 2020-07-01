import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { RootState } from '../../app/store'
import { ShoppingList } from './_compos/ShoppingList'
import { ShoppingSummary } from './_compos/ShoppingSummary'
import { DelistingList } from './_compos/DelistingList'

const connector = connect(
  (state: RootState) => {
    const { isLoading } = state.shoppingCartSlice
    return {
      isLoading
    }
  },
  {  }
)

export type Props = ConnectedProps<typeof connector>

export const ShoppingCart = connector(_ShoppingCart)
export function _ShoppingCart({
  isLoading
}: Props) {
  if (isLoading) {
    return null
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ShoppingList/>
          <DelistingList/>
        </Grid>
        <Grid item xs={3}>
          <ShoppingSummary/>
        </Grid>
      </Grid>
    </Box>
  )
}