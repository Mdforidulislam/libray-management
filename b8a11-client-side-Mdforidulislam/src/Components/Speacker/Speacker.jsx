import { Navigation, Pagination, Scrollbar, A11y , EffectCoverflow } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'
import { useEffect, useState } from 'react';

const Speacker = () => {
const [speacker,setSpeaker] = useState([])
     useEffect(()=>{
        fetch('/Speackers.json')
        .then(res => res.json())
        .then(data => setSpeaker(data))
     },[])
    return (
        <div>
            <div className=' text-center py-10'>
                <p className=' font-semibold'>Top Brower</p>
                <h1 className=' text-3xl font-bold'>Best booking browing person</h1>
            </div>
            <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y,EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={4}
      pagination={{ clickable: true }}
      autoplay={true}
      effect='coverflow'
    >
        {
            speacker?.map(speaker => 
            <SwiperSlide key={speaker.id}>
                        <div style={{backgroundImage:`url(${speaker?.img})`, width:'300px', height:'300px', backgroundSize:'cover'}} className='  bg-black'>
                            <div className=' flex justify-center items-end h-full w-full'>
                               <div className=' bg-black bg-opacity-25 w-full text-center p-3'>
                                    <h1 className=' text-white text-xl font-semibold text'>{speaker?.name}</h1>
                                    <h1 className=' text-white'>{speaker?.title}</h1>
                                    <button className=' text-xs capitalize bg-[#ff0079] px-4 py-2 text-white'>About Info</button>
                               </div> 
                            </div>
                        </div>
            </SwiperSlide>)
        }
    </Swiper>
        </div>
    );
};

export default Speacker;