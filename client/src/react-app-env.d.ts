interface ShortInfo {
    title: string,
    release_date: string
}

interface Poster {
    movie_id: number,
}

interface MovieCard extends  Poster, ShortInfo{
    genres: string|string[]
}

interface Movie {
    movie_id: number,
    r_18: boolean ,
    title: string ,
    actors: (string | number)[] ,
    genres: string[] ,
    director: string ,
    storyline: string ,
    release_date: string ,
}

interface ShortReview {
    review_id: int,
    title: string,
    create_at: string,
}

interface Review {
    review_id: number,
    user_id: string,
    movie_id: number,
    title: string,
    content: string,
    create_at: string,
    like_count: number,
}