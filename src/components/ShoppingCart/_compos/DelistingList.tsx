import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, Grid, Button, Link } from '@material-ui/core'
import { Template, GetTemplateListRes } from '../_controller/_types'
import { TemplateMock } from '../_controller/_types/index.mock'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  button: {},
  fontWeight: {
    fontWeight: 500
  }
}));

type propsType = {
  list?: GetTemplateListRes['list'],
  handleMe?: any
}

export function DelistingList(props: propsType) {
  const classes = useStyles()
  const preventDefault = (event:any) => event.preventDefault()
  function _handleMe (id: Template['id']) {
    props.handleMe(id)
  }
  return (
    <Box>
    {
      (props.list || [TemplateMock.build()]).map((item:Template) => {
        const _classTitle = item.status === 0 ? classes.fontWeight : ''
        return (
          <ListItem className={classes.listItem}  key={item.id}>
            <Grid container spacing={3}>
              <Fragment>
                <Grid item xs={2}>
                  <Box className={_classTitle}>{item.time}</Box>
                </Grid>
                <Grid item xs={3}>
                  <Box className={_classTitle}>Designer:&nbsp;{item.designer}</Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className={_classTitle}>User:&nbsp;{item.user}</Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className={_classTitle}>
                    Order:&nbsp;<Link href="#" onClick={preventDefault}>{item.order}</Link>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                   <Box className={_classTitle}>Service:&nbsp;{item.service}</Box>
                </Grid>
              </Fragment>
              <Fragment>
                <Grid item xs={7}>
                  <Box>{item.service}:&nbsp;{item.content}</Box>
                </Grid>
                <Grid item xs={3}>
                  {
                    item.status === 0 ? 
                    <Button variant="outlined" color="primary" onClick={() => _handleMe(item.id)}>点击进入</Button> : 
                    null
                  }
                </Grid>
                <Grid item xs={2}>
                  <Box>
                    {
                      item.status === 0 ? '未处理' : 
                      (item.status === 1 ? '已处理' : '已关闭')
                    }
                  </Box>
                </Grid>
              </Fragment>
            </Grid>
          </ListItem>
        )
      })
    }
    </Box>
  )
}