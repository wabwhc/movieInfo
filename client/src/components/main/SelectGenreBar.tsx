type propsType = {
    genres: Genre[]
    condition: conditionType
    setCondition: (arg: conditionType) => void
}

type Genre = {
    genre: string
}

type conditionType = {
    year: string
    genre: string
}


export default function SelectGenreBar({genres, setCondition, condition}: propsType ) {
    return(
        <div className="text-center">
            {
                genres.map((genre, idx) => <button className="mx-1 bg-white" key={idx}
                    onClick={ () => setCondition({...condition, genre: genre.genre})}
                >{genre.genre}</button>)
            }
        </div>
    )
}