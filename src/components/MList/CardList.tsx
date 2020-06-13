/** TODO:sync favorites file */
import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from '../_i18n'
import {
  fetchFavorites,
  selectFavorites
} from '../../app/slices/favoritesSlice'

const useStyles = makeStyles(theme => ({
  card: {
    width: 220,
    margin: theme.spacing(2),
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
    margin: theme.spacing(1, 0),
    display: 'block',
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333'
    },
    '&:disabled': {
      backgroundColor: '#adadad',
      color: '#fff'
    }
  },
  cardButton2: {
    margin: theme.spacing(1, 0),
    display: 'block'
  },
  pagination: {
    justifyContent: 'center'
  }
}))

type RenderItemsProps = {
  [propName: string]: any
}

type itemTypes = {
  id: string
  name: string
  photoUrl: number
  title: number
  price: number
  status: number
  size: number
}

function RenderItems(props: RenderItemsProps) {
  const classes = useStyles()
  const { t } = useTranslation(I18N_NS)
  const getStatusText = (status: any) => {
    let result = t(I18N.my_favorites.add_to_cart)
    switch (status) {
      case 2:
        result = `${t(I18N.my_favorites.size)}${t(I18N.my_favorites.sold_out)}`
        break
      case 3:
        result = t(I18N.my_favorites.off_shelf)
        break

      default:
        break
    }
    return result
  }
  return (props.listData || []).map((item: itemTypes) => {
    return (
      <Card className={classes.card} key={item.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="600"
            image={`${item.photoUrl}`}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography noWrap gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p">
              {item.title}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p">
              {t(I18N.my_favorites.size)}&nbsp;{item.size}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p">
              $ {item.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing className={classes.CardActions}>
          <Button
            fullWidth
            disabled={item.status !== 1}
            variant="outlined"
            className={classes.cardButton}
            size="small"
            color="primary">
            {getStatusText(item.status)}
          </Button>
          <Button
            fullWidth
            className={classes.cardButton2}
            size="small"
            color="primary">
            {t(I18N.my_favorites.remove)}
          </Button>
        </CardActions>
      </Card>
    )
  })
}

export const CardList: FunctionComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [query, setQuery] = useState({
    pageSize: 10,
    pageNum: 1
  })
  let favorites = useSelector(selectFavorites)
  const handleSwitch = (event: any, value: number) => {
    console.log(event)
    setQuery({ ...query, pageNum: value })
    dispatch(
      fetchFavorites({
        url: 'http://localhost:5005/favoriteslist', // TODO:need to change to true api url
        data: query
      })
    )
  }
  useEffect(() => {
    dispatch(
      fetchFavorites({
        url: 'http://localhost:5005/favoriteslist', // TODO:need to change to true api url
        data: query
      })
    )
    console.log('mount it!')
  }, [dispatch, query])
  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        <RenderItems listData={(favorites.data || {}).list} />
      </Box>
      <Pagination
        className={classes.pagination}
        count={(favorites.data || {}).total}
        variant="outlined"
        shape="rounded"
        onChange={handleSwitch}
      />
    </Box>
  )
}
