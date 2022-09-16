import "../../styles/globals.css"
import type { AppProps } from "next/app"
import Top from "../components/layout/Top"
import Fotter from "../components/layout/Fotter"
import { ApolloProvider } from "@apollo/client"
import { client, gql } from "./api/apollo/apollo";
import apollo from "./api/apollo/getapollo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type userType = {
  user_id: string | null | undefined
  manager: boolean
}

const getUser =async(cookie: string): Promise<userType> => {
  const {data} = await client.query({
    query : gql`
      query {
        token {
            user_id
            manager
        }
      }
    `,
    context: {
      headers: {
        authorization: `${document.cookie}`,
        "Content-Type": "application/json",
      }
    }
  });
  
  return data.token
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<userType>({user_id: undefined, manager: false});
  const url = useRouter();

  useEffect(() => {
      apollo(document.cookie, getUser, setUser);
  }, [])

  useEffect(() => {

    if(user.user_id === null){
      document.cookie = "AccessToken=; Max-Age=0";
    }

    if(url.pathname === "/review/write"){
      if(user.user_id === null){
        window.alert("로그인 필요");
        window.location.href = "/login"
      }
    }
  }, [user])

  return (
    <ApolloProvider client={client}>
      <div className="w-100 h-full">
        <Top user={user}/>
        <Component {...pageProps} />
        <Fotter />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
