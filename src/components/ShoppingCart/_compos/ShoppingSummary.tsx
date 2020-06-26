import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'
import { GetTemplateListRes } from '../_controller/_types'

const useStyles = makeStyles((theme:Theme) => ({
  wrapper: {
    padding: theme.spacing(1),
    margin: theme.spacing(0)
  }
}));

type propsType = {
  list?: GetTemplateListRes['list'],
  handleMe?: any
}

export function ShoppingSummary(props: propsType) {
  const classes = useStyles()
  console.log(props.list)
  return (
    <Box className={classes.wrapper}>
      <Fragment>
      TODO: ShoppingSummary
      </Fragment>
    </Box>
  )
}