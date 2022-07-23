import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WebSocketProviders } from '../src/contextProviders/WebSocketProviders'
import { GameStateProviders } from '../src/contextProviders/GameStateProvider'
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      {!isSSR && <GameStateProviders>
        <WebSocketProviders>
          <Component {...pageProps} />
        </WebSocketProviders>
      </GameStateProviders>}
    </>


  )
}

export default MyApp
