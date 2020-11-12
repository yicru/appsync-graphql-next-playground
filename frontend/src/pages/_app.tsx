import { AppProps } from 'next/app'
import Amplify from 'aws-amplify'

const amplifyConfig = require('../../aws-exports')

export default function MyApp({ Component, pageProps }: AppProps) {
  Amplify.configure(amplifyConfig)

  return <Component {...pageProps} />
}
