import { useEffect, useState } from "react";

type propsType = {
    setPage: (arg: number) => void
    count: number
    condition: conditionType
}

type conditionType = {
    year: string
    genre: string
}

export default function Btn({setPage, count, condition}: propsType){
    const maxPage: number = Math.ceil(count / 18);
    const [currentSet, setCurrent] = useState<number>(0);
    const [btnArr, setBtnArr] = useState<HTMLCollectionOf<HTMLButtonElement>>();
    const btnArrLength: number = 5;

    useEffect(() => {
        const btnArr: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByClassName("btn") as HTMLCollectionOf<HTMLButtonElement>;

        for(let i = 0; i < btnArr.length; i++){
            btnArr[i].addEventListener("click", (e) => {
                e.preventDefault();
                let btnNumber: number = Number(btnArr[i].innerHTML);
                console.log(btnNumber);
                setPage(btnNumber - 1);
            })
        }
        setBtnArr(btnArr);
    }, [])

    useEffect(() => {
        setPage(0);
        setCurrent(0);
    }, [condition])

    useEffect(() => {
        if(btnArr){
            if((currentSet + 1) * btnArrLength >= maxPage){
                const last = maxPage % btnArrLength;
                for(let i = last; i < btnArrLength; i++){
                    btnArr[i].style.display = "none"
                }
                for(let i = 0; i< last; i++){
                    btnArr[i].style.display = "";
                }
            }else{
                const last = maxPage % btnArrLength;
                for(let i = last; i < btnArrLength; i++){
                    btnArr[i].style.display = "";
                }
            }
        }
    }, [currentSet, count])

    const moveRight = () => {
        if((currentSet + 1) * btnArrLength < maxPage){
            setCurrent(currentSet + 1);

        }else if((currentSet + 1) * btnArrLength >= maxPage){
            setCurrent(currentSet);
        }
    }

    const moveLeft = () => {
        if(currentSet > 0){
            setCurrent(currentSet - 1);
        }else if(currentSet <= 0){
            setCurrent(0);
        }
    }


    return(
        <div className="w-fit m-auto">
            <button onClick={moveLeft}>이전</button>
            <button className="btn border-4">{currentSet * btnArrLength + 1}</button>
            <button className="btn border-4">{currentSet * btnArrLength + 2}</button>
            <button className="btn border-4">{currentSet * btnArrLength + 3}</button>
            <button className="btn border-4">{currentSet * btnArrLength + 4}</button>
            <button className="btn border-4">{currentSet * btnArrLength + 5}</button>
            <button onClick={moveRight}>다음</button>
        </div>
    )
}