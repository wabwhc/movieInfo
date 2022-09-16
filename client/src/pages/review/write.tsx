import { useMutation } from "@apollo/client";
import { gql } from "../api/apollo/apollo";
import { useRef } from "react";
import { InputCheck } from "../api/InputCheck";

const PostReview = gql`
    mutation postReview($review_title: String $movie_title: String $director: String $content: String) {
        postReview(review_title: $review_title movie_title: $movie_title director: $director content: $content){
           result
        }
    }
`
//inputや　textareaの　値を　確認して　入力しなかった　ことが　あると　focusする
//const InputCheck = (inputs: Array<RefObject<HTMLInputElement | HTMLTextAreaElement>> ): boolean => {
//    for(let i = 0; i < inputs.length; i++){
//        let value = inputs[i].current?.value.trim();
//        if(value === ""){
//            window.alert("값을 입력해주세요");
//            inputs[i].current?.focus();
//            return false;
//        }
//    }
//
//    return true;
//}



export default function Write(){

    const ReviewTitle = useRef<HTMLInputElement>(null);
    const MovieTitle = useRef<HTMLInputElement>(null);
    const Director = useRef<HTMLInputElement>(null);
    const Content = useRef<HTMLTextAreaElement>(null);
    const Btn = useRef<HTMLButtonElement>(null);


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
            <br />
            <form>
                <input ref={ReviewTitle} className="block m-auto text-center w-4/5 h-10" placeholder="제목 입력" />
                <br />
                <div className="w-4/5 m-auto">
                    <div className="w-1/12 inline-block" />
                    <input ref={MovieTitle} className="text-center w-1/3 h-10" placeholder="영화 제목" />
                    <div className="w-1/6 inline-block" />
                    <input ref={Director} className="text-center w-1/3 h-10" placeholder="감독" />
                    <div className="w-1/12 inline-block" />
                </div>
                <br />
                <textarea ref={Content} className="block m-auto text-center w-4/5 h-96" placeholder="내용 입력" />
                <button ref={Btn} className="block m-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    onClick={(e) => {
                    e.preventDefault();
                    if(InputCheck([ReviewTitle, MovieTitle, Director, Content])){
                        let review_title = ReviewTitle.current?.value;
                        let movie_title = MovieTitle.current?.value;
                        let director = Director.current?.value;
                        let content = Content.current?.value;
                        mutation({ variables: {review_title, movie_title, director, content}, 
                            context: {
                                headers: {
                                  authorization: `${document.cookie}`,
                                  "Content-Type": "application/json",
                                }
                        }});
                    }
                }}>입력</button>
            </form>
        </div>
    )
}