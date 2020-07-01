import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const textStyles = makeStyles((theme: Theme) =>
  createStyles({
    _base: {
      margin: theme.spacing('10px', 0)
    },
    t1: {
      fontSize: '24px'
    },
    t2: {
      fontSize: '18px',
      borderBottom: '1px solid #ccc'
    },
    t3: {
      fontSize: '16px',
      color: '#333'
    },
    label: {
      fontSize: '14px',
      color: '#333'
    },
    labelStar: {
      fontSize: '14px',
      color: '#333'
    },
    btTip: {
      fontSize: '14px',
      color: '#333',
      backgroundColor: '#f1f1f1',
      padding: theme.spacing(1),
      margin: theme.spacing('-10px', 0, '10px')
    },
    star: {
      color: '#f00'
    }
  })
)
interface UTextProProps {
  type: 't1' | 't2' | 't3' | 'label' | 'btTip' | 'labelStar'
}
const UTextPro: FunctionComponent<UTextProProps> = ({ type, children }) => {
  const classes = textStyles()
  return (
    <h5 className={`${classes._base} ${classes[type]}`}>
      {children}
      {type === 'labelStar' ? <span className={classes.star}>*</span> : null}
    </h5>
  )
}
export default UTextPro
