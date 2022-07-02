import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WebSocketProviders } from '../src/contextProviders/WebSocketProviders'
import { GameStateProviders } from '../src/contextProviders/GameStateProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameStateProviders>
      <WebSocketProviders>
        <Component {...pageProps} />
      </WebSocketProviders>
    </GameStateProviders>

  )
}

export default MyApp
