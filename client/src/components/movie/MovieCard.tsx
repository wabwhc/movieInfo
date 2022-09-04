import Poster from "./Poster";
import ShortInfo from "./ShortInfo";
type propsTpye = {
    movie:  MovieCard
}
//映画の　ポスターと　映画の　情報を　合わせる
/** 
 * mvoie정보를 넣으면 포스터와 정보를 합쳐 카트형태로 만들어준다
*/
export default function MovieCard(props: propsTpye){
    
    return(
        <div onClick={() => window.location.href = '/movie/' + props.movie.movie_id} className="w-1/6 bg-red-100 p-0.5 bg-clip-content aspect-MovieCardRatio inline-block">
            <Poster poster={props.movie} />
            <ShortInfo shortInfo={props.movie} />
        </div>
    )
}