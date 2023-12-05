import axios from "axios";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookCategory = () => {
    const [categroy, setCategroyName] = useState([])

        
        useEffect(()=>{
            axios.get('https://assigment-11-six.vercel.app/categroyName')
            .then(res => setCategroyName(res.data))
        },[])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           {
            categroy?.map(category => (
                <div key={category._id} className="card  bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={category.image} alt="Shoes" className="rounded-xl w-full h-[200px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{category.categoryName}</h2>
                    <div className="card-actions w-full">
                    <Link className="w-full" to={`/DetailsBook/${category.categoryName}`}><button className="btn btn-primary w-full">Book Store</button></Link>
                    </div>
                </div>
                </div>
            ))
           }
        </div>
    );
};

export default BookCategory;