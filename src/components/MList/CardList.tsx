import React, { FunctionComponent, /**useState*/ } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  card: {
    width:300,
    margin: theme.spacing(3),
    boxShadow: 'none',
    borderRadius: 0
  },
  cardContent: {
    textAlign: 'center'
  },
  CardActions: {
    padding: theme.spacing(1),
    flexDirection: 'column'
  },
  cardButton: {
    margin: theme.spacing(1,0),
    display: 'block'
  }
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
  // const [checked, setChecked] = useState([-1])

  // const handleToggle = (value:number) => () => {
  //   const currentIndex = checked.indexOf(value)
  //   const newChecked = [...checked]

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  // }
  return props.listData.map((item:itemTypes) => {
    return (
      <Card className={classes.card} key={item.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image="http://pic.51yuansu.com/pic3/cover/03/98/91/5ec73b352cd25_610.jpg"
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing className={classes.CardActions}>
          <Button fullWidth variant="outlined" className={classes.cardButton} size="small" color="primary">
            Share
          </Button>
          <Button fullWidth variant="outlined" className={classes.cardButton} size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    )
  })
}

export const CardList: FunctionComponent = () => {
  const listData = [{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 1
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 2
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 3
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 4
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 5
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 6
  },{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 7
  }]
  const handleSwitch = (event:any,value:number) => {
    console.log(value)
  }
  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        <RenderItems listData={listData}/>
      </Box>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleSwitch} />
    </Box>
  )
}