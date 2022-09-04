type propsTpye = {
    shortInfo:  ShortInfo
}

export default function ShortInfo({shortInfo}: propsTpye){

    return(
        <div className="w-full bg-white aspect-ShortInfoRatio">
            <div className="h-1/2 text-center whitespace-nowrap overflow-hidden">{shortInfo.title}</div>
            <div className="h-1/2 text-sm whitespace-nowrap overflow-hidden">{shortInfo.release_date}</div>
        </div>
    )
}