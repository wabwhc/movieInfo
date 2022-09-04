import type { NextPage } from "next";
import { client, gql } from "./api/apollo/apollo";
import { useState, useEffect } from "react";
import GenreBar from "../components/main/GenreBar";
import apollo from "./api/apollo/getapollo";
import getGenres from "./api/apollo/getGenres";


type Genre = {
  genre: string
}

//장르 3개 고름
//genreを　選ぶ
const choiceGenres = (genres: Genre[], resultLength: number): string[] => {
  let result:string[] = [];
  while(result.length < resultLength){
    let index = Math.floor(Math.random() * genres.length);
    if(!result.includes(genres[index].genre)){
      result.push(genres[index].genre);
    }
  }

  return result
}

const makeGenreArr = async(notUse: number): Promise<string[]> => {
  const data: Genre[] = await getGenres(0);
  //genre　三つを　選ぶ
  const genres: string[] = choiceGenres(data, 3);
  return genres
}


const Home: NextPage = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    apollo(0, makeGenreArr, setGenres);
    
  }, [])


  return (
    <div className="w-5/6 m-auto 2xl:w-1/2">
      {
        genres.length === 0 ? 
        <div>로딩중</div>
        :genres.map((genre: string, idx: number) => {
          return <GenreBar key={idx} genre={genre} />
        })
      }
    </div>
  );
};

export default Home;