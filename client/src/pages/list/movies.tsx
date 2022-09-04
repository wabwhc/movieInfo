import { useEffect, useState } from "react";
import MovieCard from "../../components/movie/MovieCard";
import { client, gql } from "../api/apollo/apollo";
import apollo from "../api/apollo/getapollo";
import Btn from "../../components/main/Btn";
import getGenres from "../api/apollo/getGenres";
import SelectGenreBar from "../../components/main/SelectGenreBar";
import MovieCardGroup from "../../components/movie/MovieCardGroup";


type stateType = {
    movies: MovieCard[]
    count: number
}

type conditionType = {
    year: string
    genre: string
}

type Genre = {
    genre: string
}

const GetMoviesAndCount = async(args: any): Promise<stateType> => {
    const {data} = await client.query({
        query: gql`
            query {
                moviesByCondition(page: ${args.page} year: "${args.year}" genre: "${args.genre}"){
                    result{
                        movie_id
                        title
                        release_date
                        genres
                    }
                    count
                }
            }
        `
    });
    const result: stateType = {
        movies: data.moviesByCondition.result,
        count: data.moviesByCondition.count
    }
    return result
}

export default function Movies(){
    const [condition, setCondition] = useState<conditionType>({
        year: "",
        genre: ""
    });
    const [page, setPage] = useState<number>(0);
    const [state, setState] = useState<stateType>({movies: [], count: 0})
    const [genres, setGenres] = useState<Genre[]>([]);
    
    useEffect(() => {
        apollo({page:page, year:condition.year, genre: condition.genre}, GetMoviesAndCount, setState);
        apollo(0, getGenres, setGenres);
    },[page, condition])


    
    return(
        <div className="w-full">
            <SelectGenreBar condition={condition} setCondition={setCondition} genres={genres} />

            <div className="w-5/6 m-auto 2xl:w-1/2">
                <MovieCardGroup movies={state.movies}/>
            </div>

            <Btn setPage={setPage} count={state.count} condition={condition}/>
        </div>
    )
}