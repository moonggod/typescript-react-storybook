import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, Grid, IconButton } from '@material-ui/core'
import { Notification, GetListNotificationRes } from '../_controller/_types'
import {DeleteOutline} from '@material-ui/icons'


const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
  },
  title: {},
  time: {},
  fontWeight: {
    fontWeight: 500
  },
  dotted:{
    width: '10px',
    height: '10px',
    backgroundColor:'#333',
    display: 'inline-block',
    borderRadius: '50%',
    marginRight:'10px'
  },
  deleteBtn:{
    position: 'absolute',
    right: '10px'
  },
}));

type propsType = {
  data: GetListNotificationRes,
  deleteMe: any
}

export function ListRender(props: propsType) {
  const classes = useStyles()
  function _deleteMe (id: Notification['id']) {
    props.deleteMe(id)
  }
  return (
    <Box>
    {
      props.data.listNotification.map((item:Notification) => {
        return (
          <ListItem className={classes.listItem}  key={item.id}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Box className={classes.title}><Box className={classes.dotted}/>{item.content}</Box>
              </Grid>
              <Grid item xs={2}>
                <Box className={classes.time}>{item.time}</Box>
              </Grid>
              <IconButton className={classes.deleteBtn} aria-label="delete" color="primary" onClick={() => _deleteMe(item.id)}>
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Grid>
          </ListItem>
        )
      })
    }
    </Box>
  )
}