import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Portfolio = () => {
    const [portfoli,setPorfolio] = useState([])
    useEffect(()=>{
       fetch('/porfolio.json')
       .then(responce => responce.json())
       .then(data => setPorfolio(data))
    },[])

    useEffect(()=>{
        AOS.init()
    },[])
    return (
        <div style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtAnYLGWq2abWrBC6c4rTcESdH0YYBteHtQ&usqp=CAU)`,backgroundSize:'cover',width:'100%',height:'100%',backgroundPosition:'center'}}>
            <div   className=' bg-[#0c0161] w-full h-full bg-opacity-50 flex'>
                <div className=' block md:flex  justify-between max-w-screen-xl mx-auto px-6 gap-6'>
                    <div className=' flex items-center'>
                        <div className=' grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10 xl:gap-32'>
                           {
                            portfoli?.map(item => (
                                <div data-aos="flip-left" key={item.id} className=' space-y-4 text-center w-auto h-auto bg-blue-800 p-5 rounded-xl'>
                                    <h1 className='text-2xl md:text-5xl font-bold text-white'>{item?.text1}</h1>
                                    <h1 className='text-xl md:text-3xl font-semibold text-white'>{item?.text2}<br></br>{item.text3}</h1>
                                </div>
                            ))                    
                           }   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;