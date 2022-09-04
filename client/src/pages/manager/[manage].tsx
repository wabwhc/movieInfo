import { useRouter } from "next/router"


export default function Manage(){
    const router = useRouter();
    console.log(router.query);



    return<div>Manager</div>
}