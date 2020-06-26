import React, {  } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, ListItem, } from '@material-ui/core'
import { Template, GetTemplateListRes } from '../_controller/_types'
import { TemplateMock } from '../_controller/_types/index.mock'

const useStyles = makeStyles((theme:Theme) => ({
  listItem: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    margin: theme.spacing(2, 0)
  },
  fontWeight: {
    fontWeight: 500
  }
}));

type propsType = {
  list?: GetTemplateListRes['templateList'],
  handleMe?: any
}

export function TemplateList(props: propsType) {
  const classes = useStyles()
  return (
    <Box>
    {
      (props.list || [TemplateMock.build()]).map((item:Template) => {
        return (
          <ListItem className={classes.listItem}  key={item.id}>
            I am {item.designer}
          </ListItem>
        )
      })
    }
    </Box>
  )
}