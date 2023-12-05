import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, GithubAuthProvider, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/Firebase.config";
import axios from "axios";


 export const usecontextHook = createContext(null)
 
 const Context = ({children}) => {
     const [userInfo,setUserInfo] = useState([])
     const [loading,setLoading] = useState(false)

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()
     const userCratewithEmail = (email,password) => {
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password);
     }
     const userLoginwithEmail = (email,password) => {
        setLoading(true)
       return signInWithEmailAndPassword(auth,email,password);
     }
     const singOutUser = () => {
        setLoading(true)
       return signOut(auth)
     }

     useEffect(()=>{
       const unsubscribe =  onAuthStateChanged(auth,currentUser =>{
            setUserInfo(currentUser)
            setLoading(false)
            console.log(currentUser);
            const userInfo = currentUser.email
            axios.post('https://assigment-11-six.vercel.app/jwtInfo',{userInfo},{withCredentials:true})
            .then(res =>console.log(res.data))
         })
        return ()=> unsubscribe()
     },[auth])

    const authconfig = {userCratewithEmail,userLoginwithEmail,userInfo,singOutUser,googleProvider,auth,githubProvider,loading}
    return (
        <usecontextHook.Provider value={authconfig}>
               {children}
        </usecontextHook.Provider>
    );
};

export default Context;