const { gql } = require('apollo-server')
//mutationを　集めておく
const typeDefs = gql`
    type Mutation{
        signup(user_id: String, password: String): SignupResult
        login(user_id: String, password: String): LoginResult
        addLike(review_id: Int): AddLike
        postReview(review_title: String movie_title: String director: String content: String): TestResult
    }

    type TestResult{
        result: Boolean
    }
`

module.exports = typeDefs