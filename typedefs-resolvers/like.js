const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`

    type AddLike{
        result: String
        like_count: Int
    }

    type Like{
        like_count: Int
    }
`
const resolvers = {
    Mutation: {
        addLike: (parent, args, context) => dbWorks.addLike(args, context),
    },
    Query: {
        like: (parent, args) => dbWorks.like(args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
