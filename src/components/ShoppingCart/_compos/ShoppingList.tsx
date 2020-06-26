import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Link, ListSubheader, ListItemIcon, Checkbox } from '@material-ui/core'
import { Template, GetTemplateListRes } from '../_controller/_types'
import { TemplateMock } from '../_controller/_types/index.mock'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  talignL: {
    textAlign: 'left'
  },
  talignC: {
    textAlign: 'center'
  },
  fontWeight: {
    fontWeight: 500
  }
}));

type propsType = {
  list?: GetTemplateListRes['list'],
  handleMe?: any
}

export function ShoppingList(props: propsType) {
  const classes = useStyles()
  const preventDefault = (event:any) => event.preventDefault()
  function _handleMe (id: Template['id']) {
    props.handleMe(id)
  }
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <List>
      <ListSubheader>
      <Grid container spacing={3}>
          <Fragment>
            <Grid item xs={2}>
              <Box>全选</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>商品</Box>
            </Grid>
            <Grid item xs={2}>
              <Box>单价</Box>
            </Grid>
            <Grid item xs={2}>
              <Box>数量</Box>
            </Grid>
            <Grid item xs={2}>
              <Box>小计</Box>
            </Grid>
          </Fragment>
        </Grid>
      </ListSubheader>
    {
      (props.list || [TemplateMock.build()]).map((item:Template) => {
        const _classTitle = item.status === 0 ? classes.fontWeight : ''
        const labelId = `checkbox-list-label-${item.id}`;
        return (
          <ListItem className={classes.listItem}  key={item.id} onClick={handleToggle}>
            <Grid container spacing={3}>
              <Fragment>
                <Grid item xs={2}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={2}>
                   <Box className={_classTitle}>Service:&nbsp;{item.service}</Box>
                </Grid>
              </Fragment>
              </Grid>
          </ListItem>
        )
      })
    }
    </List>
  )
}