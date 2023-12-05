import { Rating } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { usecontextHook } from "../../Hoks/Context/Context";
import { Helmet } from "react-helmet";

const AllbookCard = ({book}) => {
    const {userInfo} = useContext(usecontextHook)
    const {image,name,authorName,category,rating,quantity,_id} = book

    return (
        <div>
            <div className="card card-compact  bg-base-100 shadow-xl">
            <Helmet>
                <title>All Books</title>
            </Helmet>
            <figure><img className="w-[200px] h-[200px]" src={image}alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Author: {authorName}</p>
                <p>category: {category}</p>
                <p>quantity:  {quantity}</p>
                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                <div className="card-actions w-full">
                <Link className="w-full" to={`/updateBook/${_id}`}><button className={` ${userInfo?.email === 'librainan@gmail.com'?'btn btn-primary w-full':'hidden'}`}>update</button></Link>
        
                </div>
            </div>
            </div>
        </div>
    );
};

export default AllbookCard;