import { AppProps } from 'next/app'
import Amplify from 'aws-amplify'
import '../css/tailwind.css'

const amplifyConfig = require('../../aws-exports')

export default function MyApp({ Component, pageProps }: AppProps) {
  Amplify.configure(amplifyConfig)

  return <Component {...pageProps} />
}
