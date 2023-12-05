import { Rating } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { usecontextHook } from "../../Hoks/Context/Context";
import { useState } from "react";
import { Helmet } from "react-helmet";


const Borrowed = () => {
    
    const {userInfo} = useContext(usecontextHook)
    const browserBook =useLoaderData()
    const userBorrowBook = browserBook.filter(book => book.userEmail  == userInfo.email)
    console.log(userBorrowBook);
    const [deletedBorrow ,setDeleteBorrow] = useState(userBorrowBook)
    const handleDelete =(id,UpdateId)=>{
        console.log(UpdateId);
        axios.delete(`https://assigment-11-six.vercel.app/borrowDelete/${id}`)
        .then(res =>{
            if (res.data.acknowledged) {
                Swal.fire(
                    'Good job!',
                    'You Book Returnt!',
                    'success'
                  )
            }

            const updateFilter = deletedBorrow?.filter(book => book._id !== id)
            setDeleteBorrow(updateFilter)
            
        })

        axios.put(`https://assigment-11-six.vercel.app/updateQuantity/${UpdateId}`)
        .then(res => {
            console.log(res.data);
        })
    }


    return (
        <div className=" max-w-screen-xl mx-auto px-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Helmet>
                <title>Borrow Books</title>
            </Helmet>
            {
                deletedBorrow?.map(book =>(
                    <div key={book._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img className="w-[300px] h-[300px]" src={book.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{book.name}</h2>
                        <p>{book?.authorName}</p>
                        <p>{book?.category}</p>
                        <p>{book?.quantityBorrow}</p>
                        <p>Return Date: {book?.retunDate}</p>
                        <p>Borrow Date: {book?.formattedDate}</p>
                        <Rating name="half-rating-read" defaultValue={book.rating} precision={0.5} readOnly />
                        <div className="card-actions w-full">
                        <button onClick={()=>handleDelete(book._id,book.updateId)} className="btn btn-primary w-full">Return Book</button>
                        </div>
                    </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Borrowed;