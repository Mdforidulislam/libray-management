
import AllbookCard from "./AllbookCard";
import { useEffect, useState } from "react";

const AllBooks = () => {

   
     
    const [availbe , setavailable ] = useState([])
    const [allbooks,setAllboks] = useState([])
    const [active,setActive]= useState(false)

    useEffect(()=>{
      fetch('https://assigment-11-six.vercel.app/allbooks',{ credentials: 'include', })
      .then(res => res.json())
      .then(data => setAllboks(data))
    },[])
    console.log(allbooks);
      useEffect(()=>{
        const availableBorrow = allbooks?.filter(books => books.quantity > 0)
        setavailable(availableBorrow)
        console.log(availableBorrow);
        
      },[allbooks])
      const handleAvailable = ()=>{
        setActive(true)
      }
      console.log(active);
    
 
    return (
 
        <div className="max-w-screen-xl mx-auto mt-10  px-6">
            <div><button onClick={handleAvailable} className="btn btn-primary">Availale borrow</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-6 mt-10">
                {

          active? availbe &&  availbe?.map(book=> <AllbookCard key={book._id} book={book}></AllbookCard>) :

          allbooks && allbooks?.map(book=> <AllbookCard key={book._id} book={book}></AllbookCard>)
                }
            </div>
        </div>
    );
};

export default AllBooks;