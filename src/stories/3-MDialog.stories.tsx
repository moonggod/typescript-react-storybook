import React from 'react'
import Provider from '../Provider'
import { MessageDialog } from '../components/MDialog/MessageDialog'

export default {
  title: 'MDialog'
}

export const _MessageDialog = () => <Provider><MessageDialog id={2} open={true}/></Provider>
