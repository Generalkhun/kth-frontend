import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WebSocketProviders } from '../contextProviders/WebSocketProviders'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebSocketProviders>
      <Component {...pageProps} />
    </WebSocketProviders>

  )
}

export default MyApp
