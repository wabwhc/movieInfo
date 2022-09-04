import { useState, useEffect } from "react";
import { client, gql } from "../../pages/api/apollo/apollo";
import MovieCard from "../movie/MovieCard";
import apollo from "../../pages/api/apollo/getapollo";
import MovieCardGroup from "../movie/MovieCardGroup";


type propsType = {
    genre: string
}

const movieByGenre = async(genre: string): Promise<MovieCard[]> => {
  const {data} = await client.query({
    query : gql`
      query {
        movieByGenre(genre: "${genre}") {
          movie_id
          genres
          title
          release_date
        }
      }
    `
  });

  return data.movieByGenre;
}


export default function GenreBar({genre}: propsType){
    const [movies, setMovies] = useState<MovieCard[]>([]);
    
    useEffect(() => {
        apollo(genre, movieByGenre, setMovies);
    }, [])

    return(
    <div className="mt-1">
        <div className="w-full h-10 bg-red-300">
            {genre}
        </div>
        <MovieCardGroup movies={movies}/>
    </div>
    )
}