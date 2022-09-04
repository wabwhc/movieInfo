//mysql2를 이용해 연결
//mysql2を　使って　つなぐ
const mysql = require("mysql2/promise");
require("dotenv").config();
const con = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    dateStrings: process.env.dateStrings,
})

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
//sql문을 모아둔다.
//ｓｑｌを　集めておく
const dbWorks = {
    movies: async() => {
        const [result] = await con.query("select * from movies order by release_date desc");
        return result
    },
    shortMovies: async() => {
       const [result] = await con.query("select movie_id, title, release_date, genres from movies order by release_date desc") 
       return result
    },
    countMovies: async() => {
        const [result] = await con.query("select count(*) count from movies");
        return result[0]
    },
    moviesByCondition: async(args) => {
        const All = await dbWorks.movies();
        let result = [];
        
        if(args.year){
            result = All.filter((movie) => {
                return movie.release_date.substr(0,4) === args.year
            })
        }else{
            result = All;
        }

        if(args.genre){
            const [genre] = await dbWorks.genre(args)
            result = result.filter((movie) => {
                return JSON.parse(movie.genres).includes(genre.egenre)
            })
        }
        //개수 제한
        let count = result.length;
        result = result.slice(18* args.page, 18* (args.page + 1));

        return {result, count};
    },
    moviesPage: async(args) => {
        const [result] = await con.query(`select * from movies order by release_date desc limit 10 offset ?`, [args.page_number * 10]);
        return result
    },
    movie: async(args) => {
        const [result] = await con.query("select * from movies where movie_id = ?", [args.movie_id]);
        return result[0]
    },
    genres: async() => {
        const [result] = await con.query("select * from genres");
        return result
    },
    genre: async(args) => {
        const [result] = await con.query("select egenre from genres where genre = ?", [args.genre]);
        return result
    },
    movieByGenre: async(args) => {
        const [genre] = await dbWorks.genre(args);
        const [result] = await con.query(`select * from movies where json_contains(genres, '"${genre.egenre}"') > 0 order by release_date desc limit 8`);
        return result
    },
    image: (args) => {
        let base64;
        try{
            base64 = fs.readFileSync(path.join(__dirname, "/public/img/" + args.movie_id + ".jpg")).toString("base64");
        }catch{
            base64 = fs.readFileSync(path.join(__dirname, "/public/img/lalaland.jpg")).toString("base64");
        }
        return {base64};
    },
    reviews: async() => {
        const [result] = await con.query("select * from reviews order by create_at desc");
        return result
    },
    reviewsByCondition: async(args) => {
        let [result] = await con.query("select review_id, create_at, title from reviews order by create_at desc");

        const count = result.length;
        result = result.slice(18* args.page, 18* (args.page + 1));

        return {result, count};
    },
    countReviews: async() => {
        const [result] = await con.query("select count(*) count from reviews");
        return result[0]
    },
    reviewList: async(args) => {
        const [result] = await con.query("select review_id, title, create_at from reviews where movie_id = ? order by create_at desc", [args.movie_id]);
        return result
    },
    review: async(args) => {
        const {review_id} = args;
        const [review] = await con.query("select * from reviews where review_id =?", [review_id]);
        const like = await dbWorks.like({review_id});
        const result = Object.assign({}, review[0], like);
        return result
    },
    signup: async(args) => {
        const {user_id, password} = args;
        try{
            await con.query("insert into users (user_id, password) values (?, ?)", [user_id, password]);
        }catch(err){
            return {
                status: "fail"
            }
        }
        return {
            status: "suc"
        }
    },
    login: async(args) => {
        const {user_id, password} = args;
        const [result] = await con.query("select * from users where user_id = ?", [user_id]);
        if(result.length === 0){
            return { AccessToken: "존재하지 않는 아이디"}
        }else if(result[0].password !== password){
            return { AccessToken: "틀린 비밀번호입니다."}
        }else {

            const AccessToken = jwt.sign(
                {
                    "user_id": result[0].user_id,
                    "manager": result[0].manager,
                },
                process.env.secretCode,
                {algorithm: "HS256", expiresIn: "1d"}
            )
            
            return { AccessToken }
        }
    },
    like: async(args) => {
        const { review_id } = args;
        const [result] = await con.query("select count(*) like_count from review_likes group by review_id having review_id = ?", [review_id]);
        if(result.length === 0){
            return {like_count : 0}
        }else{
            return {like_count : result[0].like_count}
        }

    },
    addLike: async(args, context) => {
        const { review_id } = args;

        if(context.decoded){
            const {user_id} = context.decoded;
            const [already] = await con.query("select * from review_likes where review_id = ? and user_id = ?", [review_id, user_id]);
            if(already.length === 0){
                let [result] = await con.query("insert into review_likes (review_id, user_id) values(?, ?)", [review_id, user_id]);
                const {like_count} = await dbWorks.like({review_id});
                return { result: "add", like_count }
            }else{
                let [result] = await con.query("delete from review_likes where review_id = ? and user_id = ?", [review_id, user_id]);
                const {like_count} = await dbWorks.like({review_id});
                return { result: "cancel", like_count }
            }
        }else{
            return { result: "require login" }
        }
    },
    token: (args, context) => {
        if(context.decoded){
            const {user_id, manager} = context.decoded;
            return {user_id, manager}
        }else{
            
            return {}
        }
    }
}

module.exports = dbWorks;