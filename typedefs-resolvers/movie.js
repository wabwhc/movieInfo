const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Movie {
        movie_id: Int
        r_18: Boolean
        title: String
        actors: String
        genres: String
        director: String
        storyline: String
        release_date: String
    }
    
    type MoviesAndCount {
        result: [Movie]
        count: Int
    }

    type ShortMovie {
        movie_id: Int
        title: String
        release_date: String
        genres: String
    }
    
    type Genre {
        genre: String
    }
    
    type Image {
        base64: String
    }

    type Count {
        count: Int
    }
`
const resolvers = {
    Query: {
        movies: dbWorks.movies,
        shortMovies: dbWorks.shortMovies,
        movie: (parent, args) => dbWorks.movie(args),
        genres: dbWorks.genres,
        movieByGenre: (parent, args) => dbWorks.movieByGenre(args),
        image: (parent, args) => dbWorks.image(args),
        moviesPage: (parent, args) => dbWorks.moviesPage(args),
        moviesByCondition: (parent, args) => dbWorks.moviesByCondition(args),
        countMovies: dbWorks.countMovies,
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
