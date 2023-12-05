import { Link, NavLink } from "react-router-dom";
import './style.css'
import { useContext, useState } from "react";
import { usecontextHook } from "../../Hoks/Context/Context";
import userLog from '../../assets/user-img1.jpg'

const Header = () => {
    const {userInfo,singOutUser} = useContext(usecontextHook);
    const [active, setActive] = useState(false)
    console.log(userInfo);
    const naveBarSection = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    {
      userInfo?.email ==='librainan@gmail.com'?  <li><NavLink to={'/AddBook'}>Add Book</NavLink></li> : ' '
    }
   
    <li><NavLink to={'/AllBooks'}>All Books</NavLink></li>
    <li><NavLink to={'/BorrowedBooks'}>Borrowed Books</NavLink></li>
    </>

    const handleSingOut = () =>{
        singOutUser()
        .then(result=> console.log(result))
        .catch(error => console.log(error))
    }

    const hanleTogole = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
      // Update the data-theme attribute
      htmlElement.setAttribute('data-theme', newTheme);
    
      // Save the theme preference in localStorage
      localStorage.setItem('theme', newTheme);
    };
    
    // Check for the user's preferred theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }


    return (
       <div className=" ">
         <div className="navbar bg-slate-400 p-4 bg-opacity-50 rounded-lg ">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {naveBarSection}
                </ul>
                </div>
               <img className="w-[70px] h-[70px]" src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=740&t=st=1699120613~exp=1699121213~hmac=c022b70144cd01eb59100d404d8f0bff6be350f59815f52e57292f74de933736' alt="" />

               <label className="swap swap-rotate ml-4">
                {/* this hidden checkbox controls the state */}
                <input onClick={()=>hanleTogole(setActive(!active))} type="checkbox" />
                
                {/* sun icon */}
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                
                {/* moon icon */}
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                
              </label>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {naveBarSection}
                </ul>
            </div>
            {
                userInfo?  
                            <div className="dropdown dropdown-end flex">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                <img src={`${ userInfo.photoURL? userInfo.photoURL : userLog}`} />
                              </div>
                            </label>
                            <ul tabIndex={0} className=" z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 mt-40">
                              <li ><a className="text-xs">Name:- {userInfo?.displayName}</a></li>
                              <li ><a className="text-xs">Email:- {userInfo?.email}</a></li>
                            </ul>
                            <div className="navbar-end">
                                <Link to={'/login'}><button className="btn border-none bg-[#ff007a] text-white hover:text-black" onClick={handleSingOut}>logOut</button></Link>
                           </div>
                          </div> :
                          <div className="navbar-end">
                                <Link to={'/login'}><button className="btn border-none bg-[#ff007a] text-white hover:text-black">Login</button></Link>
                        </div> 
            }
           
         </div>
       </div>
    );
};

export default Header;