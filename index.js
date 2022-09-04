const { ApolloServer } = require('apollo-server');

const queries = require('./typedefs-resolvers/_queries');
const mutations = require('./typedefs-resolvers/_mutations');
const movie = require('./typedefs-resolvers/movie');
const review = require('./typedefs-resolvers/review');
const user = require('./typedefs-resolvers/user');
const token = require('./typedefs-resolvers/token');
const like = require('./typedefs-resolvers/like');


const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = [
    queries,
    mutations,
    movie.typeDefs,
    review.typeDefs,
    user.typeDefs,
    token.typeDefs,
    like.typeDefs,
]
const resolvers = [
    movie.resolvers,
    review.resolvers,
    user.resolvers,
    token.resolvers,
    like.resolvers,
]

const server = new ApolloServer({ typeDefs, resolvers,
context: ({ req, res }) => {
    //토큰을 확인하는 부분
    //tokenを　確認する
    const token = req.headers.authorization ? req.headers.authorization.split('AccessToken=')[1] : '';
    let decoded;
    if (token) {
        try{
            decoded = jwt.verify(token, process.env.secretCode);
        }catch(err){
            res.setHeader("AccessToken", token, 0);
            if(err.message === 'jwt expired'){
                console.log('jwt expired')
            }else if(err.message === 'invalid token'){
                console.log('jwt invalid token')
            }
        }
        
        return {decoded}
    }else{
        return {decoded}
    }

} })


server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})