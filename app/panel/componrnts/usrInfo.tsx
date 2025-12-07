"use client";

import { useAppSelector } from "@/app/hooks";
import { removeToken } from "@/app/hooks/authToken";
import useAuth from "@/app/hooks/useAuth"
import { selectUser } from "@/app/store/auth";
import { useRouter } from "next/navigation";

const UserInfo=()=>{
    const router=useRouter()
    const {user}=useAuth();
    const userFromRedux = useAppSelector(selectUser);
    const logoutHandler=async()=>{
        await removeToken();
        router.push('/');
       
    }
        
    return(
        <>
            <span>username:</span>
            <h2>{user?.name}</h2>

            <hr/>

            {/* //روش دوم گرفتن اطلاعات از ریداکس */}

            <span>username from redux:</span>
            <h2>{userFromRedux?.name}</h2>

            <button onClick={logoutHandler}>خروج</button>
           
        </>
    )

}


export default UserInfo