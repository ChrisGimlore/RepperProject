import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { RepperProvider } from '../context/RepperContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <RepperProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </RepperProvider>
    </MoralisProvider>
  )
}

export default MyApp
