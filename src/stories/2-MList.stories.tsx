import React from 'react'
import { Box } from '@material-ui/core'
import Provider from '../Provider'
import { BaseList } from '../components/MList/BaseList'
import { CardList } from '../components/MList/CardList'
import { MessageList } from '../components/MessageList'
import { NotificationWithButton } from '../components/Notification/indexWithButton'
import { Log } from '../components/Log'

export default {
  title: 'MList'
}

export const _BaseList = () => <Provider><BaseList/></Provider>

export const _CardList = () => <Provider><CardList/></Provider>

export const _MessageList = () => <Provider><MessageList/></Provider>

export const _ListNotification = () => <Provider><Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}><NotificationWithButton/></Box></Provider>

export const _Log = () => <Provider><Log customerId={7749}/></Provider>