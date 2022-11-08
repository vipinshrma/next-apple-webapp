import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../styles/globals.css'
import {Toaster} from 'react-hot-toast'
import Header from '../components/Header'
import {SessionProvider} from 'next-auth/react'
import type {AppProps} from 'next/app'

function MyApp({ Component,  pageProps: { session, ...pageProps } }:AppProps) {
  return <SessionProvider session={session}>
    <Provider store={store}>
    <Toaster/>
    <Header/>
    <Component {...pageProps} />
  </Provider>
  </SessionProvider> 
}

export default MyApp
