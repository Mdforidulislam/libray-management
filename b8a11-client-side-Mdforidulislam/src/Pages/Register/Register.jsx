import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usecontextHook } from "../../Hoks/Context/Context";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";

import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [show,setShow]= useState(false);
    const {userCratewithEmail} = useContext(usecontextHook)
    const usenvigation = useNavigate()

    const handleFormRegister = (event) => {
        event.preventDefault()

            const userEmail = event.target.email.value;
            const userPass = event.target.password.value;
            const userName = event.target.name.value;
            const userUrl = event.target.img.value;
            const termsAndConditon = event.target.checkbox.checked;

           

            const specialExprestion = /^[A-Za-z\d@$!%*#?&]{8,}$/;

            if (userPass.length < 6) {
               return  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password should be at least 6 characters',
                  })
            } else if(!termsAndConditon){
                return  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Check Terms & Condition',
                  })
            }else if(!specialExprestion.test(userPass)){
                return  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Use a spacial Charectar',
                  })
            }
            userCratewithEmail(userEmail,userPass)
            .then(resutl => {
                console.log(resutl)
                    updateProfile(resutl.user,{displayName:userName,photoURL:userUrl})
                    .then(()=>{})
                    .catch(error => console.log(error))
                    window.location.reload();
                usenvigation('/')
                Swal.fire(
                    'Good job!',
                    'SuccessFully Register!',
                    'success'
                  )
            })
            .catch(error => {
                console.log(error)
                return toast.error(error.message,{
                    position: toast.POSITION.TOP_CENTER
                  });
            })
            
    }
const handleShow =()=>{
    setShow(!show)
}
    return (
        <div className=" max-w-screen-xl mx-auto px-6 mt-20 flex justify-center items-center">
        <div className=" border p-5  md:w-[600px]">
            <ToastContainer></ToastContainer>
            <Helmet><title>Register</title></Helmet>
            <h1 className=" text-xl font-bold">Register Now</h1>
            <form  onSubmit={handleFormRegister} className="space-y-5 mt-6 " >
                <input name="name" placeholder="Name" type="text" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100"/>
                
                <input name="img" placeholder="Image Link" type="text" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100"/>

                <input name="email" placeholder="email" type="email" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100" required/>
              
                <div className=" flex relative justify-end items-center h-full">
                    <input name="password" placeholder="Password" className="block w-full px-6 py-4 rounded-lg text-base focus:outline-[#ff007a] bg-slate-100" type={`${show?'text':'password'}`} required />
                    <div  className=" absolute mr-2  pr-4">
                               <div onClick={handleShow} className=" cursor-pointer">
                                {
                                    show? <span  className=" text-2xl text-[#ff007a]"><AiFillEye></AiFillEye></span> :
                                    <span  className=" text-2xl text-[#ff007a]"><AiFillEyeInvisible></AiFillEyeInvisible></span>
                                }
                                    
                                  
                               </div>
                    </div>
                </div>
                    <span className=" flex items-center gap-4"> <input type="checkbox" name="checkbox" /> <p>Terms & Condition</p> </span>
                <button className=" btn w-full hover:text-black text-white rounded-none px-10 bg-[#ff007a]">Register</button>
            </form>
           <div className="flex justify-center p-4">
                <Link to={'/login'}><span className="text-[#ff007a] border px-6 py-2 rounded-full">Login Here</span></Link>
           </div>
        </div>
    </div>
    );
};

export default Register;