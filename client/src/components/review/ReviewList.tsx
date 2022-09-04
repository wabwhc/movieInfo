import Item from "./Item"

type propsType = {
    reviews: ShortReview[]
    size: string
}
export default function ReviewList({ reviews, size }: propsType){
   
    return(
        <div className="w-full border-y-2 border-black mt-2 py-0.5">
            {
                reviews.map((review, index) => <Item key={index} review={review} index={reviews.length - index} size={size}/>)
            }
        </div>
    )
}