import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, ListSubheader, Button, Link } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  button: {}
}));

type RenderItemsProps = {
  [propName: string]: any
}

type itemTypes = {
  title: string,
  desc: string,
  id: number,
  price: number,
}

function RenderItems(props:RenderItemsProps) {
  const classes = useStyles()
  const preventDefault = (event:any) => event.preventDefault()
  return props.listData.map((item:itemTypes) => {
    return (
      <ListItem className={classes.listItem}  key={item.id}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            Title:&nbsp;I want to buy something 
          </Grid>
          <Grid item xs={3}>
            Create Time:&nbsp;2020/10/3
          </Grid>
          <Grid item xs={3}>
            Order:&nbsp;<Link href="#" onClick={preventDefault}>12121212</Link>
          </Grid>
          <Grid item xs={2}>
            Status:&nbsp;apply
          </Grid>
          <Grid item xs={10}>
            I want to buy something I want to buy something
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary">Deal with</Button>
          </Grid>
        </Grid>
      </ListItem>
    )
  })
}

export const MessageList: FunctionComponent = () => {
  const listData = [{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 1
  },{
    title: '22',
    desc: 'bbb',
    price: 2000,
    id: 2
  },{
    title: '22',
    desc: 'bbb',
    price: 2000,
    id: 3
  },]
  const handleSwitch = (event:any,value:number) => {
    console.log(value)
  }
  return (
    <Box>
      <List>
        <ListSubheader>Message List</ListSubheader>
        <RenderItems listData={listData}/>
      </List>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleSwitch} />
    </Box>
  )
}