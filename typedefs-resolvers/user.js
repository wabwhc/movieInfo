const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type SignupResult {
        status: String
    }

    type LoginResult {
        AccessToken: String
    }
`
const resolvers = {
    Mutation: {
        signup: (parent, args) => dbWorks.signup(args),
        login: (parent, args) => dbWorks.login(args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
