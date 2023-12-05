import Slider from "../../Components/Slider/Slider";
import Portfolio from "../../Components/Portfolio/Portfolio";
import Speacker from "../../Components/Speacker/Speacker";
import {Helmet} from "react-helmet";
import OutSponsors from "../../Components/OurSponsors/OutSponsors";
import 'aos/dist/aos.css';
import BookCategory from "../../Components/BookCategory/BookCategory";
const Home = () => {
   
    return (
        <div>
            {/* Main Section */}
            {/* slider added */}
          <div className=" -mt-24 -z-10">
              <Slider></Slider>
          </div>
<Helmet><title>Home</title></Helmet>

          {/* Event OutComes added */}
          <div className=" max-w-screen-xl mx-auto px-6 mb-10">
             <div className="text-center py-7">
                <p className=" text-base font-bold">Explore Book</p>
                <h1 className=" text-5xl font-semibold">Book Category</h1>
             </div>
                <BookCategory></BookCategory>
          </div>


          {/* Portfolio Added */}

          <div className=" w-full h-[400px] z-40 bg-yellow-400">
            <Portfolio></Portfolio>
          </div>
            {/* Speacker Section */}
            <div className="">
                <div className=" max-w-screen-xl mx-auto px-6">
                   <Speacker></Speacker>
                </div>
            </div>



            {/* our Sponsor */}

            <div className=" mt-16">
                <OutSponsors></OutSponsors>
            </div>


         
        </div>
    );
};

export default Home;