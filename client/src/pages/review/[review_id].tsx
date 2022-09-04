import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Poster from "../../components/movie/Poster";
import { client, gql } from "../api/apollo/apollo";
import { useMutation } from "@apollo/client";

import apollo from "../api/apollo/getapollo";

const MutationLike = gql`
    mutation addLike($review_id: Int) {
        addLike(review_id: $review_id){
            result
            like_count
        }
    }
`   


const GetReview = async(review_id: number): Promise<Review> => {
    const {data} = await client.query({
        query: gql`
            query {
                review(review_id: ${review_id}) {
                    review_id
                    user_id
                    movie_id
                    title
                    content
                    create_at
                    like_count
                }
            }
        `
    });
    return data.review
}


export default function Review(){
    const router = useRouter();
    const {review_id} = router.query;
    const [review, setReview] = useState<Review>({
        review_id: 0,
        user_id: "",
        movie_id: 0,
        title: "",
        content: "",
        create_at: "",
        like_count: 0,
    });
    const [mutationLike, {data, error, loading} ] = useMutation(MutationLike);

    useEffect(() => {
        if(review_id !== undefined){
            apollo(Number(review_id), GetReview, setReview);
        }
    }, [review_id])
    
    useEffect(() => {
        if(data){
            if(data.addLike.result === 'cancel'){
                window.alert("좋아요를 취소했습니다.");
            }else if(data.addLike.result === 'require login'){
                window.alert("로그인이 필요합니다.");
            }
            setReview({
                ...review,
                like_count: data.addLike.like_count
            });
        }

    }, [data])


    
    const LikeButtonClick = async(review_id: number): Promise<void> => {
        await mutationLike({ variables: {review_id}, context: {
            headers: {
              authorization: `${document.cookie}`,
              "Content-Type": "application/json",
            }
        }});
    }

    return(
        <div className="w-5/6 m-auto">
            <div className="w-full h-fit text-3xl text-center bg-white">
                {
                    review.title
                }
            </div>
            <br />
            <div className="w-full bg-white">
                <div className="w-full flex">
                    <div className="w-1/3">
                        {
                            review.movie_id !== 0 &&
                            <Poster poster={{ movie_id: Number(review.movie_id)}} />
                        }
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 flex-col flex items-center justify-center">
                        <div className="inline-block">작성자: {review.user_id}</div>
                        <br />
                        <div>작성일자</div>
                        <div className="inline-block">{review.create_at}</div>
                        <div>좋아요</div>
                        <div className="inline-block">{review.like_count}</div>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    {
                        review.content
                    }
                </p>
                <button onClick={() => {
                    //좋아요 추가하는 부분
                    LikeButtonClick(Number(review_id));
                }}>좋아요</button>
            </div>
        </div>
    )
}