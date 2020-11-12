import { AppProps } from 'next/app'
import Amplify from 'aws-amplify'
import amplifyConfig from '../../aws-exports'
import '../css/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  Amplify.configure(amplifyConfig)

  return <Component {...pageProps} />
}
