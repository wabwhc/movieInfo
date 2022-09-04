import { useEffect, useState } from "react";
import { client, gql } from "../../pages/api/apollo/apollo";
import apollo from "../../pages/api/apollo/getapollo";

type propsTpye = {
    poster:  Poster
}


const makeImageUrl = async(movie_id: number): Promise<string> => {
    const {data} = await client.query({
        query: gql`
        query{
            image(movie_id: ${movie_id}){
                base64
            }
        }
        `
    })

    const imgUrl = convertBase64ToBlob(data.image.base64);
    return imgUrl
}

const convertBase64ToBlob = (data: string): string => {
    // base64를 blob으로 만들고 url로 만듬
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: "image/jpeg"});
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
}


export default function Poster({poster}: propsTpye){
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        apollo(poster.movie_id, makeImageUrl, setUrl);
    }, [poster])

    return(
        <div style={{ "backgroundImage" : `url(${url})`}} className="w-full aspect-PosterRatio bg-cover" />
    )
}