const { gql } = require('apollo-server')
//mutationを　集めておく
const typeDefs = gql`
    type Mutation{
        signup(user_id: String, password: String): SignupResult
        login(user_id: String, password: String): LoginResult
        addLike(review_id: Int): AddLike
        postReview(review_title: String movie_title: String director: String content: String): PostReviewResult
        postMovie(title: String storyline: String director: String actors: [String] genres: [String] r18: Boolean release_date: String base64: String): PostMovieResult
    }

    type PostReviewResult{
        result: Boolean
    }
    type PostMovieResult{
        insertMovieId: Int
    }
`

module.exports = typeDefs