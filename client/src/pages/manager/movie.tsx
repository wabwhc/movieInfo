import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { gql } from "../api/apollo/apollo";
import { InputCheck } from "../api/InputCheck";

//데이터 양이 많으니까 객체 만들어서 보냄
const PostMovie = gql`
    mutation postMovie($review_title: String $movie_title: String $director: String $content: String) {
        postMovie(review_title: $review_title movie_title: $movie_title director: $director content: $content){
           result
        }
    }
`


    //영화추가   영화정보변경
export default function ManagerMovie(){
    const poster = useRef<HTMLInputElement>(null);;
    const title = useRef<HTMLInputElement>(null);;
    const director = useRef<HTMLInputElement>(null);;
    const storyline = useRef<HTMLInputElement>(null);;
    const release = useRef<HTMLInputElement>(null);;
    const actors = useRef<HTMLInputElement>(null);;
    const genres = useRef<HTMLInputElement>(null);;
    let isR_18 = false;

    return(
        <form className="w-5/6 m-auto 2xl:w-1/2 h-full bg-white">
            <h1>영화정보를 입력하면 영화를 추가하거나 영화정보를 변경합니다.</h1>

            <input ref={poster} id="poster" className="block" type="file" />
            <input ref={title} id="title" className="block" placeholder="영화제목" />
            <input ref={director} id="director" className="block" placeholder="감독" />
            <input ref={storyline} id="storyline" className="block" placeholder="줄거리" />
            <input ref={release} id="release" className="block" placeholder="개봉일" />
            <div>
                <input type="checkbox" id="r_18" onClick={() => {
                    //변수하나 만들고 boolean값 계속 변경해서 체크 확인함
                    isR_18 != isR_18;

                }}/>청소년 관람불가
            </div>
            <input ref={actors} id="actors" className="block" placeholder="배우" />
            <input ref={genres} id="genres" className="block" placeholder="장르" />
            <button onClick={(e) => {
                e.preventDefault();
                if(InputCheck([title, director, storyline, release, actors, genres])){
                    
                }
            }}>추가</button>
        </form>
    )
}