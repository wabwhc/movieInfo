import { gql } from "./api/apollo/apollo";
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
        if(data.login.AccessToken === "-1" || data.login.AccessToken === "-2"){
            window.alert("정보가 틀립니다.");
        }else{
            document.cookie = "AccessToken=" + data.login.AccessToken;
            window.location.href = "/"
        }
    }
    
    const login = (): void => {
        const id: HTMLInputElement = document.getElementById("id") as HTMLInputElement;
        const pwd: HTMLInputElement = document.getElementById("pwd") as HTMLInputElement;

        const user_id = id.value
        const password = pwd.value

        mutationlogin({variables: {user_id, password}})
    }

    return(
        <form  className="w-1/2 h-60 my-6 m-auto bg-white flex-col flex items-center">
            {/* <input id="id" placeholder="아이디" className="border-2" />
            <input id="pwd" type="password" placeholder="비밀번호" className="border-2" />
            <button onClick={(e) => {
                e.preventDefault();
                login();
            }}>로그인</button> */}
           
            <div className="my-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="id"
                  placeholder="아이디"
                />
            </div>

            <div className="my-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="pwd"
                  placeholder="비밀번호"
                />
            </div>

            <button
                type="button"
                className="inline-block px-7 py-3 bg-blue-200 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
            >
                Login
            </button>
        </form>
    )
}