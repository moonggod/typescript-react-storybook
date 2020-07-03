import React, { useEffect, ChangeEvent, useState, } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Button } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { RootState } from '../../app/store'
import { getLogList } from './_store/slice'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from './_i18n'
import {
  Delete
} from '@material-ui/icons'

const useStyles = makeStyles((theme:Theme) => ({
  table: {
    minWidth: 650,
    margin: theme.spacing(0)
  },
  clearBtn: {
    border: 'none',
    borderRadius: '16px',
    fontSize: '10px',
    backgroundColor: '#ddd',
    height: '20px',
    marginLeft: theme.spacing(1),
    minWidth: '40px',
    '&:hover': {
      backgroundColor: '#eee'
    }
  }
}))

type OwnProps = {
  customerId: number
}
const connector = connect(
  (state: RootState, {customerId}:OwnProps) => {
    const { isLoading, logList } = state.logSlice
    return {
      isLoading,
      logList,
      customerId,
    }
  },
  { 
    getLogList
  }
)

export type Props = ConnectedProps<typeof connector>

export const Log = connector(_Log)

export function _Log({
  isLoading,
  customerId,
  logList,
  getLogList
}: Props) {
  const { t } = useTranslation(I18N_NS)
  const [page, setPage] = useState(1)
  const classes = useStyles()

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  };
  const handleDelete = (id:number) => {
    console.log(id) // TODO: delete me
  };

  if (isLoading) {
    console.log('isLoading:' + isLoading) // TODO: Do something when loading
  }

  useEffect(()=>{
    if (customerId) {
      getLogList({
        params: {
          customerId
        },
        query: {
          page
        }
      })
    }
    // eslint-disable-next-line
  }, [customerId, getLogList, page])

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t(I18N.log.type)}</TableCell>
              <TableCell align="left">{t(I18N.log.content)}</TableCell>
              <TableCell align="left">{t(I18N.log.time)}</TableCell>
              <TableCell align="left">{t(I18N.log.operate)}<Button size="small" className={classes.clearBtn} variant="outlined">清空</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logList.list.map((item:any) => (
              <TableRow key={item.user}>
                <TableCell component="th" scope="item">
                  {item.designer}
                </TableCell>
                <TableCell align="left">{item.status}</TableCell>
                <TableCell align="left">{item.content}</TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} />
      <Pagination count={10} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
    </Box>
  )
}
