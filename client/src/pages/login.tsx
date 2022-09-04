import { client, gql } from "./api/apollo/apollo";
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

const LOGIN = gql`
    mutation Log($user_id: String!, $password: String!) {
        login(user_id: $user_id, password: $password){
            AccessToken
        }
    }
`   
export default function Login() {
    
    const [mutationlogin, {data, error, loading}] = useMutation(LOGIN)
    
    if(data){
        console.log(data.login);
        document.cookie = "AccessToken=" + data.login.AccessToken;
    }
    
    const login = (): void => {
        const id: HTMLInputElement = document.getElementById("id") as HTMLInputElement;
        const pwd: HTMLInputElement = document.getElementById("pwd") as HTMLInputElement;

        const user_id = id.value
        const password = pwd.value

        mutationlogin({variables: {user_id, password}})
    }

    return(
        <div className="w-5/6 m-auto bg-white flex-col flex items-center">
            <input id="id" placeholder="아이디" className="border-2" />
            <input id="pwd" placeholder="비밀번호" className="border-2" />
            <button onClick={(e) => {
                e.preventDefault();
                login();
                window.location.href = "/"
            }}>로그인</button>
        </div>
    )
}