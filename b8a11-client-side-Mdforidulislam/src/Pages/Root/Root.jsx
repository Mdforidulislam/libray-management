import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Root = () => {
    return (
        <div>
             {/* Header section */}
             <div className=" max-w-screen-xl mx-auto px-6 sticky top-6 z-10">
                   <Header ></Header>
            </div>
           <Outlet></Outlet>

              {/* Footer Section */}
              <div className=" bg-[#1a1831]  mt-52">
                <div className=" max-w-screen-xl mx-auto px-6">
                    <Footer></Footer>
                </div>
           </div>
        </div>
    );
};

export default Root;