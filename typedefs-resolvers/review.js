const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Review {
        review_id: Int
        movie_id: Int
        user_id: String
        title: String
        content: String
        create_at: String
        like_count: Int
    }

    type ReviewList {
        review_id: Int
        title: String
        create_at: String
    }

    type ReviewsAndCount {
        result: [ReviewList]
        count: Int
    }

`
const resolvers = {
    Query: {
        reviews: dbWorks.reviews,
        reviewList: (parent, args) => dbWorks.reviewList(args),
        review: (parent, args) => dbWorks.review(args),
        countReviews: dbWorks.countReviews,
        reviewsByCondition: (parent, args) => dbWorks.reviewsByCondition(args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
