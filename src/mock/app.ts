import 'reflect-metadata'
// https://github.com/typestack/routing-controllers
import { createExpressServer } from 'routing-controllers'

import { MessageListController } from '../components/MessageList/_controller'
import { MessageDialogController } from '../components/MDialog/MessageDialog/_controller'
import { ListNotificationController } from '../components/Notification/_controller'
import { CustomersController } from '../components/MyAddress/_controller'

const controllers = [MessageListController, MessageDialogController, ListNotificationController, CustomersController]

export const app = createExpressServer({
  routePrefix: process.env.REACT_APP_API_BASE_URL,
  classTransformer: true, // enable request payload validation by class-transform + class-validation
  validation: {
    whitelist: true, // required when `forbidNonWhitelisted: true`
    forbidNonWhitelisted: true, // avoid sending unwanted fields to the API
    forbidUnknownValues: true, // avoid sending unknown values to the API
    validationError: {
      // less verbose err msg
      target: false,
      value: false
    }
  },
  controllers
})
