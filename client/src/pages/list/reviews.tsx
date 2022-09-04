import { useEffect, useState } from "react";
import Btn from "../../components/main/Btn";
import ReviewList from "../../components/review/ReviewList";
import { client, gql } from "../api/apollo/apollo"
import apollo from "../api/apollo/getapollo";

type stateType = {
    reviews: ShortReview[]
    count: number
}


const GetReviewsAndCount = async(page: number): Promise<stateType> => {
    const {data} = await client.query({
        query: gql`
            query {
                reviewsByCondition(page: ${page}){
                    result{
                        review_id
                        title
                        create_at
                    }
                    count
                }
            }
        `
    })
    
    const result: stateType = {
        reviews: data.reviewsByCondition.result,
        count: data.reviewsByCondition.count,
    }
    return result;
}


export default function Reviews(){
    const [state, setState] = useState<stateType>({reviews:[], count: 0});
    const [page, setPage] = useState<number>(0);
    const [condition, setCondition] = useState({year: "", genre: ""});

    useEffect(() => {
        apollo(page, GetReviewsAndCount, setState);
    }, [page])
    
    return(
        <div className="w-5/6 m-auto 2xl:w-1/2">
            <div className="w-full">
                {
                    <ReviewList reviews={state.reviews} size={"3xl"}/>
                }
            </div>
            <Btn setPage={setPage} count={state.count} condition={condition}/>
        </div>
    )
}