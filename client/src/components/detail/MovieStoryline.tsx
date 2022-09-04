type propsType = {
    storyline: string
}
export default function MovieStoryLine({ storyline }: propsType){    
    
    return(
        <div>
            <div className="bg-white  border-x-2 border-t-2 h-10 text-center">줄거리</div>
            <p className="bg-white text-center border-x-2 border-b-2" dangerouslySetInnerHTML={{__html: storyline}} />
        </div>
    )
}