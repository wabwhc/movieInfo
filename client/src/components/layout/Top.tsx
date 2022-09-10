import { client, gql } from "../../pages/api/apollo/apollo";
import { useEffect, useState } from "react";
import apollo from "../../pages/api/apollo/getapollo";
import { useRouter } from "next/router";

type statType = {
  user_id: string | null | undefined
  manager: boolean
}

const getUser =async(cookie: string): Promise<statType> => {
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

export default function Top(){
    const [user, setUser] = useState<statType>({user_id: undefined, manager: false});
    const url = useRouter();

    useEffect(() => {
        apollo(document.cookie, getUser, setUser);
    }, [])

    useEffect(() => {
      if(url.pathname === "/review/write"){
        if(user.user_id === null){
          window.alert("로그인 필요");
          window.location.href = "/login"
        }
      }
    }, [user])

    return(
        <div>
            <div className="h-16 text-5xl flex justify-between">
                <a href="/">영화 정보 사이트</a>
                <div className="w-56">
                    <div className="h-1/3"></div>
                    {
                      user.user_id === null ?
                      <a href="/login" className="block h-1/3 text-base text-end">로그인/회원가입</a>
                      :<>
                      <div className="h-1/3 text-base text-end">{user.user_id}</div>  
                      <button className="block w-full h-1/3 text-base text-end"
                      onClick={() => {
                        document.cookie = "AccessToken=; Max-Age=0";
                        location.href = "/";
                      }}>로그아웃</button>
                      </>
                    }
                </div>
            </div>
            <div className="h-16 bg-blue-200">
                <div className="h-1/6"></div>
                <div className="h-4/6">
                    <div className="h-full w-4/5 inline-block">
                        <ul className="flex">
                          <li className="mx-3">
                            <a className="text-blue-500 hover:text-blue-800 text-3xl" href="/list/movies">영화 목록</a>
                          </li>
                          <li className="mx-3">
                            <a className="text-blue-500 hover:text-blue-800 text-3xl" href="/list/reviews">영화 리뷰</a>
                          </li> 
                          <li className="mx-3">
                            <a className="text-blue-500 hover:text-blue-800 text-3xl" href="/review/write">리뷰 작성</a>
                          </li>
                          {
                            user.manager &&
                            <li className="mx-3">
                              <a className="text-blue-500 hover:text-blue-800 text-3xl" href="/manager/movie">영화 편집</a>
                            </li>
                          }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}