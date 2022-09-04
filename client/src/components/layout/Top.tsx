import { client, gql } from "../../pages/api/apollo/apollo";
import { useEffect, useState } from "react";
import apollo from "../../pages/api/apollo/getapollo";


const getUser =async(cookie: string): Promise<string> => {
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
  
  return data.token.user_id
}

export default function Top(){
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        apollo(document.cookie, getUser, setUser);
    }, [])


    return(
        <div>
            <div className="h-16 text-5xl flex justify-between">
                <a href="/">영화 정보 사이트</a>
                <div className="w-56">
                    <div className="h-1/3"></div>
                    {
                      user === null ?
                      <a href="/login" className="block h-1/3 text-base text-end">로그인/회원가입</a>
                      :<>
                      <div className="h-1/3 text-base text-end">{user}</div>  
                      <button className="block w-full h-1/3 text-base text-end">로그아웃</button>
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
                        </ul>
                    </div>
                    <input className="w-1/5" placeholder="검색"></input>
                </div>
            </div>
        </div>
    )
}