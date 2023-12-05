import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const [updateInfo,setUpdateInfo] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`https://assigment-11-six.vercel.app/updateBook/${id}`)
        .then(res =>{
            console.log(res.data);
            setUpdateInfo(res.data)
        })
    },[id])


    console.log(updateInfo);
    const handleForminfo = (event) =>{
        event.preventDefault()
        const form = event.target;
        const image = form.image.value;
        const name = form.name.value;
        const quantity = parseInt(form.quantity.value);
        const authorName = form.author.value;
        const category = form.category.value;
        const short_description = form.short_description.value;
        const rating = form.rating.value;
        const bookInfo = {image,name,quantity,authorName,category,short_description,rating}
        console.log(bookInfo);
        axios.put(`https://assigment-11-six.vercel.app/bookUpdateInfo/${id}`,bookInfo,{withCredentials:true})
        .then(res =>{
            if (res.data.modifiedCount) {
                Swal.fire(
                    'Good job!',
                    'Your update Complated!',
                    'success'
                  )
                  console.log(res.data);
            } 
            
        })
       }


       
    return (
        <div className="max-w-screen-xl mx-auto bg-white rounded p-8 shadow-md mt-16">
             <Helmet>
                <title>Upate Books</title>
            </Helmet>
        <h2 className="text-2xl font-semibold mb-6">Book Information</h2>
        <form onSubmit={handleForminfo}>
            <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input type="text" name="image" id="image" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.image} required />
            </div>
            <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" name="name" id="name" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.name} required />
            </div>
            <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input type="number" name="quantity" id="quantity" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.quantity} required />
            </div>
            <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author Name</label>
            <input type="text" name="author" id="author" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.authorName} required />
            </div>
            <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <select name="category" id="category" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.category} required>
                <option value="Novel">Novel</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
            </select>
            </div>
            <div className="mb-4">
            <label htmlFor="short_description" className="block text-gray-700 font-bold mb-2">Short Description</label>
            <textarea name="short_description" id="short_description" className="w-full border rounded py-2 px-3" required defaultValue={""} />
            </div>
            <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
            <input type="number" name="rating" id="rating" className="w-full border rounded py-2 px-3" defaultValue={updateInfo.rating} required />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
        </form>
     </div>
    );
};

export default UpdateBook;