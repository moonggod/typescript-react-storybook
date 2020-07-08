import React, { useEffect, ChangeEvent, useState, MouseEvent, Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Button, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { RootState } from '../../app/store'
import { getLogList, deleteLog, clearLog } from './_store/slice'
import { useTranslation } from 'react-i18next'
import { I18N, I18N_NS } from './_i18n'
import {
  Delete
} from '@material-ui/icons'
import GCLayout from '../../components/GCLayout'
import { getLoginInfo } from '../../_cache_stores/login'

const useStyles = makeStyles((theme:Theme) => ({
  wrapper: {
    maxWidth: '1000px',
    margin: theme.spacing(5, 'auto')
  },
  tableContent: {
    boxShadow: 'none',
    '& .MuiTableCell-head': {
      color: '#0061D2'
    }
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
  },
  titleRow: {
    position: 'relative',
    padding: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(3),
  },
  backBtn: {
    color: '#006EEF',
    fontSize: '12px',
    marginLeft: theme.spacing(-3.9)
  },
  title: {
    fontSize: '24px',
    color: '#01408A',
  },
  tip: {
    fontSize: '16px',
  },
  pagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'center'
    }
  }
}))

const connector = connect(
  (state: RootState) => {
    const { isLoading, logList, deleteSuccess, clearSuccess } = state.logSlice
    return {
      isLoading,
      logList,
      deleteSuccess,
      clearSuccess
    }
  },
  { 
    getLogList,
    deleteLog,
    clearLog,
  }
)

export type Props = ConnectedProps<typeof connector>

export const Log = connector(_Log)

export function _Log({
  isLoading,
  logList,
  getLogList,
  deleteSuccess,
  clearSuccess,
  deleteLog,
  clearLog,
}: Props) {
  const login = getLoginInfo()
  const { t } = useTranslation(I18N_NS)
  const [page, setPage] = useState(1)
  const classes = useStyles()

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  };
  const handleClear = (event: MouseEvent) => {
    event.preventDefault()
    clearLog({
      params: {
        customerId: login.member.id
      }
    })
  };
  const handleDelete = (id:number) => {
    deleteLog({
      params: {
        customerId: login.member.id
      },
      query: {
        id
      }
    })
  }

  useEffect(()=>{
    if (login?.member?.id) {
      getLogList({
        params: {
          customerId: login.member.id
        },
        query: {
          page
        }
      })
    }
    // eslint-disable-next-line
  }, [login?.member?.id, getLogList, page])

  useEffect(()=>{
    if (deleteSuccess || clearSuccess) {
      getLogList({
        params: {
          customerId: login.member.id
        },
        query: {
          page
        }
      })
    }
    // eslint-disable-next-line
  }, [deleteSuccess, clearSuccess, page])

  return (
    <GCLayout>
      <Box className={classes.wrapper}>
        <Box className={classes.titleRow}>
          <Button className={classes.backBtn} variant="text" startIcon={<ArrowBack />}>{t(I18N.log.back)}</Button>
          <Typography className={classes.title} component="h2">{t(I18N.log._self)}</Typography>
          <Typography className={classes.tip} component="p">{t(I18N.log.tip)}</Typography>
        </Box>
        {
          !isLoading ? (
            <Fragment>
              <TableContainer className={classes.tableContent} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t(I18N.log.type)}</TableCell>
                      <TableCell align="left">{t(I18N.log.content)}</TableCell>
                      <TableCell align="left">{t(I18N.log.time)}</TableCell>
                      <TableCell align="center">{t(I18N.log.operate)}<Button size="small" className={classes.clearBtn} variant="outlined" onClick={handleClear}>清空</Button></TableCell>
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
                        <TableCell align="center">
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
              <Pagination className={classes.pagination} count={10} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
            </Fragment>
          ) : null
        }
        
      </Box>
    </GCLayout>
  )
}

export const HISTORY_NOTIFICSTION_PAGE = '/history-notification'