import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { gql } from "../api/apollo/apollo";
import { toBase64 } from "../api/ConvertBase64";
import { InputCheck } from "../api/InputCheck";

//데이터 양이 많으니까 객체 만들어서 보냄
const PostMovie = gql`
    mutation postMovie($title: String $storyline: String $director: String $actors: [String] $genres: [String] $r18: Boolean $release_date: String $base64: String) {
        postMovie(title: $title storyline: $storyline director: $director actors: $actors genres: $genres r18: $r18 release_date: $release_date base64: $base64){
            insertMovieId
        }
    }
`

    //영화추가   영화정보변경
export default function ManagerMovie(){
    const poster = useRef<HTMLInputElement>(null);
    const title = useRef<HTMLInputElement>(null);
    const director = useRef<HTMLInputElement>(null);
    const storyline = useRef<HTMLInputElement>(null);
    const release = useRef<HTMLInputElement>(null);
    const actors = useRef<HTMLInputElement>(null);
    const genres = useRef<HTMLInputElement>(null);
    //let isR_18: boolean = false;
    const [isR_18, setR18] = useState<boolean>(false);
    const [mutation, {data}] = useMutation(PostMovie);
    
    if(data){
        window.location.href = '/'
    }

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
                    setR18(!isR_18)

                }}/>청소년 관람불가
            </div>
            <input ref={actors} id="actors" className="block" placeholder="배우" />
            <input ref={genres} id="genres" className="block" placeholder="장르" />
            <button onClick={async(e) => {
                e.preventDefault();
                if(InputCheck([poster, title, director, storyline, release, actors, genres])){
                    //    /로 구분하여 배열을 만들고 앞뒤 공백을 제거한다
                    let actorsArray = actors.current?.value.split("/");
                    let genresArray = genres.current?.value.split("/");
                    actorsArray = actorsArray?.map((e) => e.trim());
                    genresArray = genresArray?.map((e) => e.trim());
                    
                    // 입력된 파일을 base64로 전환한뒤 Mutation
                    let file = poster.current?.files?.[0];
                    if(file){
                        let base64 = await toBase64(file);
                        base64 = base64.split(";base64,").pop() as string;
                        mutation({ variables: 
                            {title: title.current?.value, r18: isR_18, director: director.current?.value,
                                storyline: storyline.current?.value,
                                release_date: release.current?.value,
                                genres: genresArray,
                                actors: actorsArray,
                                base64
                            }
                        });
                    }
                }
            }}>추가</button>
        </form>
    )
}