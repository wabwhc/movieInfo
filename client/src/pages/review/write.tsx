import { useMutation } from "@apollo/client";
import { gql } from "../api/apollo/apollo";
import { useRef } from "react";


const PostReview = gql`
    mutation postReview($review_title: String $movie_title: String $director: String $content: String) {
        postReview(review_title: $review_title movie_title: $movie_title director: $director content: $content){
           result
        }
    }
`


export default function Write(){

    const ReviewTitle = useRef<HTMLInputElement | null>(null);
    const MovieTitle = useRef<HTMLInputElement | null>(null);
    const Director = useRef<HTMLInputElement | null>(null);
    const Content = useRef<HTMLTextAreaElement | null>(null);


    const [mutation, {data, error, loading}] = useMutation(PostReview);

    if(data){
        if(data.postReview.result){
            window.location.href = "/"
        }else{
            window.alert("실패")
            window.location.href = "/"
        }
    }

    return(
        <div className="w-5/6 m-auto 2xl:w-1/2">
            <form>
                <input ref={ReviewTitle} className="block m-auto" placeholder="제목 입력" />
                <input ref={MovieTitle} className="block m-auto" placeholder="영화 제목" />
                <input ref={Director} className="block m-auto" placeholder="감독" />
                <textarea ref={Content} className="block m-auto text-center" placeholder="내용 입력" />
                <button onClick={async(e) => {
                    e.preventDefault();
                    let review_title = ReviewTitle.current?.value;
                    let movie_title = MovieTitle.current?.value;
                    let director = Director.current?.value;
                    let content = Content.current?.value;
                    await mutation({ variables: {review_title, movie_title, director, content}, 
                        context: {
                            headers: {
                              authorization: `${document.cookie}`,
                              "Content-Type": "application/json",
                            }
                    }});
                }}>입력</button>
            </form>
        </div>
    )
}

const submit = () => {

}