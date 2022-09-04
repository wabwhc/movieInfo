import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import MovieStoryLine from "../../components/detail/MovieStoryline";
import Poster from "../../components/movie/Poster";
import ReviewList from "../../components/review/ReviewList";
import { client, gql } from "../api/apollo/apollo";
import apollo from "../api/apollo/getapollo";
import convet from "../api/convertStrToJsonInObject";


const GetShortReview = async(movie_id: number): Promise<ShortReview[]> => {
    const {data} = await client.query({
        query: gql`
            query{
                reviewList(movie_id: ${movie_id}){
                    review_id
                    title
                    create_at
                }
            }
        `
    });


    return  data.reviewList
}
const GetMovie = async(movie_id: number): Promise<Movie> => {
    const {data} = await client.query({
        query: gql`
            query{
                movie(movie_id: ${movie_id}){
                    movie_id
                    r_18
                    title
                    actors
                    genres
                    director
                    storyline
                    release_date
                }
            }
        `
    });
    let movieData: Movie = convet(data.movie, "actors", "genres") as Movie;
    //let movieData =  Object.assign({}, data.movie);
    //movieData.actors = JSON.parse(data.movie.actors);
    //movieData.genres = JSON.parse(data.movie.genres);

    return movieData
}


export default function AboutMovie(){
    const router = useRouter();
    const { movie_id } = router.query;
    const [movie, setMovie] = useState<Movie>({
        movie_id: 0,
        r_18: false,
        title: "",
        actors: [""],
        genres: [""],
        director: "",
        storyline: "",
        release_date: "",
    }); 
    const [reviews, setReviews] = useState<ShortReview[]>([])
    
    useEffect(() => {
        if(movie_id !== undefined){
            apollo(Number(movie_id), GetMovie, setMovie);
            apollo(Number(movie_id), GetShortReview, setReviews);
        }

    }, [movie_id])


    return(
        <div className="w-5/6 m-auto h-max">
            <div className="w-full h-20 mt-5 bg-white">
                {movie.title}
            </div>
            <div className="flex w-full h-1/2 mt-5 bg-white">
                <div className="inline-block h-5/6 min-h-minPoster aspect-PosterRatio my-auto mx-5">
                    {
                        movie_id !== undefined &&
                        <Poster poster={ { movie_id: Number(movie_id)} } />
                    }
                </div>
                <div className="flex flex-col justify-center h-5/6 bg-red-200 my-auto">
                    <div className="te">
                        제목: {movie.title}
                    </div>
                    <div className="te">
                        장르: {
                            movie.genres.map((genre, idx) => {
                                let txt = genre;
                                if(idx !== movie.genres.length - 1){
                                    txt += ", ";
                                }
                                return txt;
                            })
                        }
                    </div>
                    <div className="te">
                        감독: {movie.director}
                    </div>
                    <div className="te">
                        배우: {
                            <div className="inline-block">
                                {
                                    movie.actors.map((genre, idx) => {
                                        let txt = genre;
                                        if(idx !== movie.actors.length - 1){
                                            txt += ", ";
                                        }
                                        return txt;
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="te">
                        방영일: {movie.release_date}
                    </div>
                </div>
            </div>
            <br></br>
            <div className="w-full">
                <MovieStoryLine storyline={movie.storyline} />
            </div>
            <br></br>
            {
                reviews.length !== 0 &&
                <ReviewList reviews={reviews} size={"xs"}/>
            }
        </div>
    )
}