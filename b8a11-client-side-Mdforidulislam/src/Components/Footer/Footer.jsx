import neslaterImg from '../../assets/footerNewsplater.jpg'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin,  BsTwitter } from "react-icons/bs";
const Footer = () => {
    return (
        <footer className="footer footer-center   text-base-content rounded">
            <div className='' style={{backgroundImage:`url(${neslaterImg})`,backgroundSize:'cover',width:'100%',height:'300px', marginTop:'-180px',borderRadius:'24px'}}>
                <div className=' bg-black w-full h-full bg-opacity-40 rounded-3xl flex justify-center items-center '>
                  <div className=' space-y-6 '>
                       <h1 className='text-sm md:text-2xl font-sans font-semibold text-white'>SUBSCRIBE TO NEWSLETTER</h1>
                        <h1 className=' text-2xl md:text-5xl font-bold font-sans text-white'>Want Something Extra?</h1>
                        <div className="join w-full">
                            <input className="input input-bordered join-item w-full bg-transparent focus:border-2 border-[#ff007a]" placeholder="Email"/>
                            <button className="btn join-item rounded-r-full bg-[#ff007a] text-white hover:text-black border-[#ff007a] ">Subscribe</button>
                        </div>
                  </div>
                </div>
            </div>
        <nav>
          <div className="grid grid-flow-col gap-4 list-none text-xl ">
            <li className='border-2 p-3 rounded-full text-white hover:bg-[#ff007a] hover:border-[#ff007a]'><a href=""><span ><BsFacebook ></BsFacebook></span></a></li>
            <li className='border-2 p-3 rounded-full text-white hover:bg-[#ff007a] hover:border-[#ff007a]'><a href=""><span><BsTwitter></BsTwitter></span></a></li>
            <li className='border-2 p-3 rounded-full text-white hover:bg-[#ff007a] hover:border-[#ff007a]'><a href=""><span><BsInstagram></BsInstagram></span></a></li>
            <li className='border-2 p-3 rounded-full text-white hover:bg-[#ff007a] hover:border-[#ff007a]'><a href=""><span><BsGithub></BsGithub></span></a></li>
            <li className='border-2 p-3 rounded-full text-white hover:bg-[#ff007a] hover:border-[#ff007a]'><a href=""><span><BsLinkedin></BsLinkedin></span></a></li>
          </div>
        </nav> 
        <nav className="grid grid-flow-col gap-4 text-slate-100">
          <a className="link link-hover ">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Jobs</a> 
          <a className="link link-hover">Press kit</a>
        </nav> 
        <aside>
          <p className='text-white'>Copyright © 2023 - Foridul All Right Reserved </p>
        </aside>
      </footer>
    );
};

export default Footer;