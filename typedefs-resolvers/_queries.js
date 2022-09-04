const { gql } = require('apollo-server')
//queryを　集めておく
const typeDefs = gql`
    type Query{
        movies: [Movie]
        shortMovies: [ShortMovie]
        movie(movie_id: Int): Movie
        genres: [Genre]
        movieByGenre(genre: String): [ShortMovie]
        image(movie_id: Int): Image
        reviews: [Review]
        reviewList(movie_id: Int): [ReviewList]
        review(review_id: Int): Review
        token: Token
        like(review_id: Int): Like
        moviesPage(page_number: Int): [Movie]
        moviesByCondition(year: String genre: String page: Int): MoviesAndCount
        reviewsByCondition(page: Int): ReviewsAndCount
        countMovies: Count
        countReviews: Count
    }
`

module.exports = typeDefs