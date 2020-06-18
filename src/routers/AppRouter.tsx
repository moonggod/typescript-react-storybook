import React from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

/**
 * Using `XXX_PAGE_URL` path constants:
 * Pros: get rid of the fragile string literals
 * Cons: TODO: summarize all the path consts into a single file to avoid circular dependency & good for split chunks + lazy load
 */
import {
  Message,
  MESSAGE_PAGE_URL
} from '../pages/message'

export function AppRouter() {
  const { i18n } = useTranslation()
  /**
   * Benefits of `basename`:
   * 1. <Link /> component auto-prefixed
   * 2. `history.[push|replace]` auto-prefixed
   *
   * TODO: how to handle `/`? Redirect?
   */
  const basename = `/${i18n.language}`
  return (
    <BrowserRouter basename={basename}>
      <Switch>
        <Route exact path={MESSAGE_PAGE_URL} component={Message} />
        
        <Redirect to={MESSAGE_PAGE_URL} />
      </Switch>
    </BrowserRouter>
  )
}
