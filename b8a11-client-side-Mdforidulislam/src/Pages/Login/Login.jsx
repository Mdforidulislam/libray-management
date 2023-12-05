import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { usecontextHook } from "../../Hoks/Context/Context";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const {userLoginwithEmail,googleProvider,auth,githubProvider,userInfo} = useContext(usecontextHook);
    const usernavigation = useNavigate()
    const handleUserLogin = (event) =>{
            event.preventDefault();
            const userEmail = event.target.email.value;
            const userPassword = event.target.password.value;
            userLoginwithEmail(userEmail,userPassword)
            .then(result => {
                console.log(result)
                usernavigation('/')
                Swal.fire(
                    'Good job!',
                    'SuccessFully Login!',
                    'success'
                  )
        
            })
            .catch(error =>  {
                console.error(error)
                return toast.error(error.message,{
                    position: toast.POSITION.TOP_CENTER
                  });
               })
    }
    const handleSingWithSocial = (provider) => {
            signInWithPopup(auth,provider)
            .then(resutl => {
                console.log(resutl);
                Swal.fire(
                    'Good job!',
                    'SuccessFully Login!',
                    'success'
                  )
                  usernavigation('/')
            })
            .catch(error => {
                console.log(error)
                 if  (error.message) {
                   return toast.error(error.message,{
                        position: toast.POSITION.TOP_CENTER
                      });
                }
            })

    }
    return (
        <div className=" max-w-screen-xl mx-auto px-6 mt-20 flex justify-center items-center">
            <div className=" border p-5  md:w-[600px]">
              <ToastContainer />
                <Helmet><title>Login</title></Helmet>
                <h1 className=" text-xl font-bold">Login</h1>
               <form className="space-y-5 mt-6" onSubmit={handleUserLogin}>
                    <input name="email" placeholder="email" type="email" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100" required/>
                        <input name="password" placeholder="Password" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100" type="password" required />
                        <div>
                            <span className=" flex items-center gap-4"> <input type="checkbox" name="checkbox" /> <p>Remember Me</p> </span>
                        </div>
                        <button className=" btn w-full hover:text-black text-white rounded-none px-10 bg-[#ff007a]">Log In</button>
               </form>
               <div className=" flex justify-around rounded-sm p-5 m-3">
                    <button onClick={()=>handleSingWithSocial(googleProvider)} className=" flex gap-3 items-center border-2 rounded-full px-10 py-3 font-bold"><span className="text-3xl"><FcGoogle></FcGoogle></span>Sing In</button>
                    <button onClick={()=>handleSingWithSocial(githubProvider)} className=" flex gap-3 items-center border-2 rounded-full px-10 py-3 font-bold"><span className="text-3xl"><AiFillGithub></AiFillGithub></span>Sing In</button>
               </div>
               <div className=" flex justify-center ">
                   <Link to={'/register'}><span className="text-[#ff007a] text-center border p-2 rounded-full">Register Now</span></Link>
               </div>
            </div>
        </div>
    );
};

export default Login;