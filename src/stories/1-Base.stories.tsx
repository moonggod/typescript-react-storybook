import React from 'react'
import { Box, Avatar } from '@material-ui/core'
import { GBoxColumn } from '../components/Base/GBoxColumn'
import { GButtonWithLoading } from '../components/Base/GButtonWithLoading'

export default {
  title: 'Base',
  component: GBoxColumn
}

export const _GBoxColumn = () => <GBoxColumn><Box>标题标题标题</Box><Box>内容内容内容内容内容内容</Box></GBoxColumn>
export const _GBoxColumnWithAvatar = () => (
  <GBoxColumn avarter={
    <Avatar alt="Cindy Baker" src="https://avatars1.githubusercontent.com/u/12678455?s=96&v=4" />
  }>
    <Box>标题标题标题</Box>
    <Box>内容内容内容内容内容内容</Box>
  </GBoxColumn>
)
export const _GButtonWithLoading = () => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const handleClick = () => {
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }
  return <GButtonWithLoading onClick={handleClick} loading={loading} success={success}>提交表单</GButtonWithLoading>
}
