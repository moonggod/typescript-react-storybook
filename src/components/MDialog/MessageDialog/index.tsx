import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  TextareaAutosize,
  Button,
  Drawer,
  CircularProgress,
  Fade,
} from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import { I18N, I18N_NS } from '../_i18n'
import { getDialogMessageList } from './_store/messageDialogSlice'
import { RootState } from '../../../app/store'
import { TalkMessage } from './_compos/TalkMessage'

const useStyles = makeStyles(theme => ({
  blank: {},
  contentWindow: {
    height: '500px',
    overflow: 'auto'
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
    padding: theme.spacing(3, 1),
    borderTop: '1px solid #ddd'
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
  },
  textarea: {
    width: '80%',
    height: '200px',
    marginBottom: theme.spacing(2)
  },
  inputBtn: {
    marginRight: theme.spacing(2),
    display: 'inline'
  }
}))

const connector = connect(
  (state: RootState, props: {id: number, open: boolean}) => {
    const { isLoading, dialogMessageList } = state.MDialogSlice
    return {
      isLoading,
      dialogMessageList,
      open: props.open,
      id: props.id
    }
  },
  { getDialogMessageList }
)

export type Props = ConnectedProps<typeof connector>

export const MessageDialog = connector(_MessageDialog)
export function _MessageDialog({
  isLoading,
  dialogMessageList,
  getDialogMessageList,
  id,
  open
}: Props) {

  const classes = useStyles()
  // const curCustomerId = 22
  // const dispatch = useDispatch()
  // let favorites = useSelector(selectFavorites)
  const [openMe, setOpenMe] = useState(false)
  useEffect(() => {
    getDialogMessageList(id)
    if (open) {
      setOpenMe(open)
    }
  }, [getDialogMessageList, open, id])

  function handleClose () {
    setOpenMe(false)
  }
  return (
    <Drawer anchor="right" open={openMe} onClose={handleClose}>
      <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
      </Fade>
      <Box>
        <Box className={classes.contentWindow}>
          <TalkMessage data={dialogMessageList} />
        </Box>
        <Box display="flex" className={classes.inputWindow}>
          <Grid container>
            <Grid item xs={12}>
              <TextareaAutosize
                className={classes.textarea}
                rows={5}
                placeholder="请输入消息"
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.inputBtn}>
                <input
                  accept="image/*"
                  className={classes.hide}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    上传图片
                  </Button>
                </label>
              </Box>
              <Button className={classes.inputBtn} variant="contained" color="primary">发送消息用户处理</Button>
              <Button className={classes.inputBtn} variant="contained" color="primary">发送消息继续处理</Button>
              <Button className={classes.inputBtn} variant="contained" onClick={handleClose}>关闭消息</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  )
}
