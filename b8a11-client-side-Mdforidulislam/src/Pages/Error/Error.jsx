
import {Helmet} from "react-helmet";
const Error = () => {
    return (
        <div className=" flex justify-center items-center h-screen">
            <Helmet><title>Error Pages</title></Helmet>
            <h1 className=" text-6xl text-center font-openSans font-bold block">Opps </h1>
            <h1 className=" text-4xl text-center font-openSans font-bold ">Page Error</h1>
        </div>
    );
};

export default Error;