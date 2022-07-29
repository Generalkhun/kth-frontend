import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WebSocketProviders } from '../src/contextProviders/WebSocketProviders'
import { GameStateProviders } from '../src/contextProviders/GameStateProvider'
import { useState, useEffect } from 'react';
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic';

const TopProgressBar = dynamic(
  () => {
    return import("../src/components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      {!isSSR && <GameStateProviders>
        <WebSocketProviders>
          <TopProgressBar />
          <Component {...pageProps} />
        </WebSocketProviders>
      </GameStateProviders>}
    </>


  )
}

export default MyApp
