import "../../styles/globals.css"
import type { AppProps } from "next/app"
import Top from "../components/layout/Top"
import Fotter from "../components/layout/Fotter"
import { ApolloProvider } from "@apollo/client"
import {client} from "./api/apollo/apollo";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <div className="w-100 h-full">
        <Top />
        <Component {...pageProps} />
        <Fotter />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
