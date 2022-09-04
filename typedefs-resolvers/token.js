const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Token {
        user_id: String
        manager: Boolean
    }

`
const resolvers = {
    Query: {
        token: (parent, args, context) => dbWorks.token(args, context),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}


