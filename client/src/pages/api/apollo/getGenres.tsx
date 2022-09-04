import { client, gql } from "./apollo";
type genres = {
  genre: string
}
// genreを　持ってくる
export default async function getGenres(notUse: any): Promise<genres[]>{
    const {data} = await client.query({
        query : gql`
          query {
            genres {
              genre
            }
          }
        `
    });
    return data.genres
}