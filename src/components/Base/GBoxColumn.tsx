import React, { Fragment } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  avarter?: any,
  children: any
}

export const GBoxColumn = ({avarter, children}:Props) => {
  const classes = useStyles()
  return <Fragment>
    {
      avarter ? (
        <Box className={classes.boxWithAvarter}>
          {avarter}
          <Box className={classes.boxColumn}>
            {children}
          </Box>
        </Box>
      ) : (
        <Box className={classes.boxColumn}>
          {children}
        </Box>
      )
    }
  </Fragment>
}

const useStyles = makeStyles((theme:Theme) => ({
  boxWithAvarter: {
    display: 'flex',
    '& .MuiAvatar-root': {
      marginRight: theme.spacing(1)
    }
  },
  boxColumn: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  }
}));