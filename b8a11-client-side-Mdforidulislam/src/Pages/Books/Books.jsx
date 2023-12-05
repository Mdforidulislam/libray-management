import { Rating } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import './style.css'
import { useContext, useState } from "react";
import { usecontextHook } from "../../Hoks/Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const Books = () => {
    const {authorName,category,image,name,quantity,rating,short_description,_id} = useLoaderData()
    const {userInfo} = useContext(usecontextHook)
    const [borrowbooks ,setBorrowData] = useState(quantity)
 

    const hanldePostBorrow = (event) =>{
        event.preventDefault()
        const retunDate = event.target.date_return.value || 'null';
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const userEmail = userInfo.email || 'null';
        const quantityBorrow = 1;
        const updateId = _id;
        const borrowBookinfo = {retunDate,updateId,formattedDate,userEmail,image,name,authorName,category,quantityBorrow,rating}
        console.log(borrowBookinfo);

      
        if (name) {
         const exiteInfo = {name,userEmail}
         axios.post('https://assigment-11-six.vercel.app/exiteData',exiteInfo,{withCredentials:true})
         .then(res => {
            if (res.data.count === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.massage,
                  });
            }else{
                if (res.data.count === 1) {
                    axios.post('https://assigment-11-six.vercel.app/borrowBook',borrowBookinfo)
                    .then(res => {
                       console.log( res.data);
                       if (res.data.acknowledged) {
                        Swal.fire(
                            'Good job!',
                            'You clicked the button!',
                            'success'
                          )
        
                          axios.put(`https://assigment-11-six.vercel.app/QunatityReduse/${_id}`)
                          .then(res => {
                              console.log(res.data);
                              setBorrowData(borrowbooks - 1 )
                             if (res.data.modifiedCount < 1) {
                              return Swal.fire({
                                  icon: "error",
                                  title: " this is error",
                                  text: res.data.massage,
                                });
                             }
                          })
        
                       }else{
                      return Swal.fire({
                            icon: "error",
                            title: "Book Qunatity Finish",
                            text: res.data.message,
                          });
                       }
                    })
                }
            }
             console.log(res.data);
           
         })


        }
       

    }



    return (
        <div className=" max-w-screen-xl mx-auto mt-14">
            <Helmet>
                <title>About Book</title>
            </Helmet>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img  src={image} className="rounded-xl w-[400px] h-[400px]" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Name: {name}</h2>
                            <p>Author : {authorName}</p>
                            <p>Category : {category}</p>
                            <p>Quantity : {borrowbooks}</p>
                            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                            <p>short description : {short_description}</p>
                            <div className="card-actions w-full">
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                             <div className=" w-full">
                             <button className="btn btn-primary w-full"
                                onClick={() => {
                                    if (quantity >= 1) {
                                    document.getElementById(`my_modal_5`).showModal();
                                    }
                                }}
                                disabled={borrowbooks < 1}
                                >
                                Borrow Now
                                </button>
                                <dialog id={`my_modal_5`} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Put Your Return Date</h3>
                                      <form  onSubmit={hanldePostBorrow} className="block space-y-5">
                                           <input name="date_return" className='w-60 h-10 border px-6 mt-6' type="date" /> <br></br><br></br>
                                           <input className="btn btn-primary" type="submit" value="Add Date" />
                                      </form>
                                    <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                    </div>
                                </div>
                                </dialog>
                             </div>
                            <Link to={`/readmore/${name}`} className=" w-full"><button className="btn btn-primary w-full">Read Now</button></Link>
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default Books;