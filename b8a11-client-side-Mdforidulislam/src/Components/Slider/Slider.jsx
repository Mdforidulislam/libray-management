import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay,EffectFade  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'
import  './slide.css'

const Slider = () => {
    const [banner,setBanner] = useState([])
    useEffect(()=>{
        fetch('/banner.json')
        .then(res => res.json())
        .then(data =>setBanner(data) )
    },[])

  
    return (
        <div>
        <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y,EffectFade,Autoplay]}
        effect='fade'
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
       autoplay={{ Autoplay: true}}
        >
                <div className=' '>
                        {
                            banner?.map(singleBaner => <SwiperSlide key={singleBaner.id}>
                                <div style={{ backgroundImage: `url(${singleBaner?.bg_image})`,backgroundSize:'cover',width:'100%',height:'100vh' }}>
                                    <div className=' bg-black w-full h-full bg-opacity-50 flex justify-center items-center'>
                                        <div className=' flex justify-center '>
                                            <div className=' text-center w-3/4 space-y-7'>
                                            <h1 className=' text-white text-xl md:text-6xl font-bold titleAnimation'>{singleBaner?.title}</h1>
                                            <p className=' text-white text-base'>{singleBaner?.description}</p>
                                            <div className=' flex gap-4 justify-center'>
                                                <button className='btn bg-[#ff0079] border-none rounded-none px-10 text-white hover:text-black'>{singleBaner?.btn_text1}</button>
                                                <button className='btn bg-[#4381fd] border-none rounded-none px-10 text-white  hover:text-black'>{singleBaner?.btn_text2}</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>)
                        }
                </div>
    </Swiper>
        </div>
    );
};

export default Slider;