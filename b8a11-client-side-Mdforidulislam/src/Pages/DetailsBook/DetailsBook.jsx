import { Rating } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const DetailsBook = () => {
    const bookData = useLoaderData()
    console.log(bookData);
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-6 max-w-screen-xl mx-auto gap-6">
             <Helmet>
                <title>Details Books</title>
            </Helmet>
            {  
                bookData?.map(book =>(
                    <div key={book._id} className="card  bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10 ">
                        <img  src={book?.image} alt="Shoes" className="rounded-xl w-[300px] h-[300px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{book?.name}</h2>
                        <p>Quantity: {book?.quantity}</p>
                        <p>Author: {book?.authorName}</p>
                        <p>Category: {book?.category}</p>
                        <Rating name="half-rating-read" defaultValue={book?.rating} precision={0.5} readOnly />
                        <div className="card-actions w-full">
                       <Link to={`/singleBook/${book?._id}`} className="w-full"> <button className="btn btn-primary w-full">Details</button></Link>
                        </div>
                    </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DetailsBook;