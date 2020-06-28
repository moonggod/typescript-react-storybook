import React, { FunctionComponent } from 'react'
import { Box, Avatar, Link } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const MyProfile: FunctionComponent = () => {
  const classes = useStyles()
  return (
      <Box width="1000px">
        <Box>
          <h3 className={classes.title}>基本资料</h3>
          <Box display="flex">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Box>
              <Box display="flex"><h4>BLACK</h4><span>Lv.5</span></Box>
              <Box>GClub账号: 265454</Box>
            </Box>
          </Box>
          <h3>账户安全</h3>
          <Box>
            <Box display="flex">
              <h5>密码：</h5>
              <span>112121</span>
              <Link
                component="button"
                variant="body2">
                修改
              </Link>
            </Box>
            <Box display="flex">
              <h5>邮箱：</h5>
              <span>bia****@gmail.com</span>
              <Link
                component="button"
                variant="body2">
                设置
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
  )
}

export const MY_PROFILE_PAGE_URL = '/my-profile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(6, 0, 8)
    },
    title: {
      flex: '1',
      margin: theme.spacing(0, 0, '16px', 0)
    }
  })
)
