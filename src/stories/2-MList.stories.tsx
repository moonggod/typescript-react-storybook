import React from 'react'
import Provider from '../Provider'
import { BaseList } from '../components/MList/BaseList'
import { CardList } from '../components/MList/CardList'
import { MessageList } from '../components/MessageList'
import { ListNotification } from '../components/MList/ListNotification'

export default {
  title: 'MList'
}

export const _BaseList = () => <Provider><BaseList/></Provider>

export const _CardList = () => <Provider><CardList/></Provider>

export const _MessageList = () => <Provider><MessageList/></Provider>

export const _ListNotification = () => <Provider><ListNotification/></Provider>
