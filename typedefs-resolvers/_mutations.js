const { gql } = require('apollo-server')
//mutationを　集めておく
const typeDefs = gql`
    type Mutation{
        signup(user_id: String, password: String): SignupResult
        login(user_id: String, password: String): LoginResult
        addLike(review_id: Int): AddLike
    }
`

module.exports = typeDefs