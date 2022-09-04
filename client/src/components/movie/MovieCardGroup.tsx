import MovieCard from "./MovieCard"

type propsType = {
    movies: MovieCard[]
}
// MvoieCardを　並べる
/** 
 * movie배열을 넣으면 MovieCard를 만들어 div로 묶어서 출력해줌
*/
export default function MovieCardGroup({ movies }: propsType) {
    return(
        <div className="w-full">
            {
                movies.map((movie: MovieCard, idx: number) => {
                    return <MovieCard movie={movie} key={idx} />
                })
            }
        </div>
    )
}