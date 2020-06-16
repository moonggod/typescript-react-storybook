import 'reflect-metadata'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { HelmetProvider } from 'react-helmet-async'
import './i18n'

type ProviderProps = {
  [propName: string]: any
}

const ProviderWrapper = (props:ProviderProps) => (
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        { props.children }
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
)

export default ProviderWrapper