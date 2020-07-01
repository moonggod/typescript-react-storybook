import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'

type Props = {
  open: boolean,
  autoHideDuration: number,
  onClose: any
}

export const GSnackbar:FunctionComponent<Props> = (props) => {
  const { children, open, autoHideDuration, onClose } = props
  if (open && autoHideDuration && onClose) {
    setTimeout(() => onClose(), autoHideDuration)
  }
  return (
    open ? (
      <Box style={{
        display:'flex',
        justifyContent:'center',
        position:'fixed',
        bottom: '24px',
        left:'50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        alignItems: 'center',
        zIndex:1400
      }}
      >
        {children}
      </Box>
    ) : null
  )
}