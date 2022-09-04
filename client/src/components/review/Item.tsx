type propsType = {
    review: ShortReview
    index: number
    size: string
}

export default function Item({ review, index, size }: propsType){
    return(
        <div className="w-full flex justify-between border-white border-b-2" onClick={() => window.location.href = '/review/' + review.review_id}>
            <div className={"text-" + size}>{index}</div>
            <div className={"text-" + size}>{review.title}</div>
            <div className={"text-" + size}>{review.create_at}</div>
        </div>
    )
}