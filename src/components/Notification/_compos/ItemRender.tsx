import React, {useState, useEffect, Fragment} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, IconButton, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core'
import { NotificationItem } from '../_controller/_types'
import { RootState } from '../../../app/store'
import { deleteNotification, markReadNotification } from '../_store/notificationSlice'
import {getElapsedTime, switchHelper} from '../_helper'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../_i18n'
import { ErrorOutline, Clear } from '@material-ui/icons'
import {ReactComponent as CheckSvg} from '../../../assets/svgs/checked.svg'
import {ReactComponent as GClubSvg} from '../../../assets/svgs/gclub.svg'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(2),
    color: '#5b6271',
    fontSize: '16px',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px'
  },
  avatar: {
    alignItems: 'end',
    marginTop: theme.spacing(1),
    '& .MuiAvatar-root': {
      backgroundColor: 'transparent',
      borderRadius: 0,
      '& .MuiSvgIcon-root': {
        width: '100%',
        height: '100%',
      }
    }
  },
  title: {
    paddingTop: theme.spacing(0.5),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '12px'
  },
  time: {
    padding: theme.spacing(0.5, 0),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '12px',
    color: '#868686',
    minWidth: '90px',
  },
  fontWeight: {
    fontWeight: 400
  },
  clearBtn:{
    padding: theme.spacing(.5),
    backgroundColor: '#c8c8c8',
    borderRadius: '50%',
    marginRight: theme.spacing(0),
    '& .MuiSvgIcon-root': {
      fontSize: '.8rem'
    }
  },
  itemText: {
    marginRight: theme.spacing(4)
  },
  content: {
    padding: theme.spacing(0),
    fontSize: '16px',
    color: '#000000'
  },
  red: {
    color: '#D50101',
  },
  blue: {
    color: '#006FCF'
  }
}));

function CheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <CheckSvg/>
    </SvgIcon>
  )
}
function GClubIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <GClubSvg/>
    </SvgIcon>
  )
}

const connector = connect(
  (state: RootState, props: {item: NotificationItem}) => {
    const { deleteResult } = state.notification
    return {
      deleteResult,
      item: props.item
    }
  },
  { 
    deleteNotification,
    markReadNotification
  }
)

export type Props = ConnectedProps<typeof connector>

export const ItemRender = connector(_ItemRender)

export function _ItemRender({
  deleteResult,
  item,
  markReadNotification
}: Props) {
  const { t } = useTranslation(I18N_NS)
  const classes = useStyles()
  const [firstOpen, setFirstOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState({
    result: 0,
    unit: ''
  })
  function markMe (event:any) {
    event.preventDefault()
    markReadNotification({id: item.id})
    setFirstOpen(true)
  }
  useEffect(() => {
    if (deleteResult.id === item.id) {
      setIsDeleted(true)
    }
    setElapsedTime(getElapsedTime(item.timeSent))
  }, [deleteResult, item])

  const getColor = (category:string) => {
    if (/warning/.test(category)) {
      return classes.red
    } else {
      return classes.blue
    }
  }
  const getIcon = (category:string) => {
    if (/warning/.test(category)) {
      return <ErrorOutline className={getColor(category)} />
    } else if (/checked/.test(category)) {
      return <CheckedIcon className={getColor(category)} />
    } else {
      return <GClubIcon className={getColor(category)} />
    }
  }
  return (
    <Fragment>
    {
      !isDeleted ? (
        <ListItem className={classes.listItem} key={item.id}>
          <ListItemAvatar className={classes.avatar}>
            <Avatar>
              {getIcon(item.category)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
          className={classes.itemText}
          secondary={
            <Fragment>
              <Box className={classes.content}>{item._content}</Box>
              <Box className={classes.time + (!firstOpen ? (' ' + classes.fontWeight) : '')}>{elapsedTime.result}{t(switchHelper(I18N.notification, elapsedTime.unit))}</Box>
            </Fragment>
          }>
            <Box flexGrow={1} className={classes.title + ' ' + getColor(item.category) + (!firstOpen ? (' ' + classes.fontWeight) : '')}>
              {item._title}
            </Box>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton className={classes.clearBtn} edge="end" aria-label="delete" onClick={markMe}>
              <Clear />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) : null
    }
    </Fragment>
  )
}