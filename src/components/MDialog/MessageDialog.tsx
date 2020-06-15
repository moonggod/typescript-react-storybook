/** TODO:sync favorites file */
import React, { FunctionComponent, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  ListItem,
  Grid,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from '@material-ui/core'
import { InsertEmoticon, AddCircleOutline } from '@material-ui/icons'
// import { useTranslation } from 'react-i18next'
// import { I18N, I18N_NS } from '../_i18n'
import {
  fetchFavorites,
} from '../../app/slices/favoritesSlice'

const useStyles = makeStyles(theme => ({
  blank: {},
  contentWindow: {
  },
  itemTitle: {
    marginRight: theme.spacing(5)
  },
  contentLeft: {
    padding: theme.spacing(0,6)
  },
  contentRight: {
    padding: theme.spacing(0,6),
    textAlign: 'right'
  },
  avatarLeft: {
    position: 'absolute',
    left: '0'
  },
  avatarRight: {
    position: 'absolute',
    right: '0'
  },
  marginCenter: {
    margin: theme.spacing(1, 'auto')
  },
  inputWindow: {
  },
  inline: {
    display: 'inline',
  },
  hide: {
    display: 'none'
  },
  date: {
    color:'#999',
    fontSize: '14px'
  }
}))

type RenderItemsProps = {
  [propName: string]: any
}

type itemTypes = {
  id: string
  name: string
  avatar: string
  content: string
  time: string
  type: number
}

function RenderItems(props:RenderItemsProps) {
  // const {t} = useTranslation(I18N_NS)
  const classes = useStyles()
  return props.listData.map((item:itemTypes) => {
    return (
      <ListItem className={classes.blank} key={item.id}>
        <Grid container direction={item.type === 1 ? 'row' : 'row-reverse'}>
          <ListItemAvatar className={item.type === 1 ? classes.avatarLeft : classes.avatarRight}>
            <Avatar className={classes.marginCenter} alt="Remy Sharp" src={item.avatar} />
          </ListItemAvatar>
          <Grid item xs={12}>
            <ListItemText
              primary={
                <Fragment>
                  {item.name}<span className={classes.date}>{` - ${item.time}`}</span>
                </Fragment>}
              className={item.type === 1 ? classes.contentLeft : classes.contentRight}
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.content}
                  </Typography>
                </Fragment>
              }
            />
          </Grid>
        </Grid>
      </ListItem>
    )
  })
}

export const MessageDialog: FunctionComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // let favorites = useSelector(selectFavorites)
  useEffect(() => {
    dispatch(
      fetchFavorites({
        url: 'http://localhost:5005/favoriteslist', // TODO:need to change to true api url
      })
    )
    console.log('mount it!')
  }, [dispatch])
  const listData = [{
    name: 'Tom',
    content: 'Happiness looks different for everyone. For you, maybe it’s being at peace with who you are. Or having a secure network of friends who accept you unconditionally. Or the freedom to pursue your deepest dreams.',
    avatar: require('./avatar_A.jpg'),
    id: 1,
    type: 1,
    time: '2020/06/16'
  },{
    name: 'Lili',
    content: 'Well, good habits are deeply engrained, too. Why not work on making positive habits part of your routine?',
    avatar: require('./avatar_B.jpg'),
    id: 2,
    type: 2,
    time: '2020/06/16'
  },{
    name: 'Tom',
    content: 'That doesn’t mean you have to go around with a fake smile plastered on your face all the time. But the next time you find yourself feeling low, crack a smile and see what happens. Or try starting each morning by smiling at yourself in the mirror.',
    avatar: require('./avatar_A.jpg'),
    id: 3,
    type: 1,
    time: '2020/06/16'
  },]
  return (
    <Box>
      <Box className={classes.contentWindow}>
        <RenderItems listData={listData} />
      </Box>
      <Box display="flex" className={classes.inputWindow}>
        <Box>
          <input accept="image/*" className={classes.hide} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <AddCircleOutline />
            </IconButton>
          </label>
        </Box>
        <Box>
          <IconButton color="primary" component="span">
            <InsertEmoticon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
