import { createBrowserRouter } from 'react-router-dom';
import Root from '../Pages/Root/Root';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AllBooks from '../Pages/AllBooks/AllBooks';
import Borrowed from '../Pages/BorrowedB/Borrowed';
import Addbook from '../Pages/AddBook/Addbook';
import UpdateBook from '../Pages/UpdateBook/UpdateBook';
import PrivetRouter from '../Pages/PrivetRouter/PrivetRouter';
import DetailsBook from '../Pages/DetailsBook/DetailsBook';
import Books from '../Pages/Books/Books'
import ReadMore from '../Pages/ReadMore/ReadMore';



const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement: <Error></Error>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:'/AddBook',
                element:<PrivetRouter><Addbook></Addbook></PrivetRouter>
            },
            {
                path:'/AllBooks',
                element: <PrivetRouter><AllBooks></AllBooks></PrivetRouter>,

            },{
                path:'/updateBook/:id',
                element: <PrivetRouter><UpdateBook></UpdateBook></PrivetRouter>
            },
            {
                path:'/BorrowedBooks',
                element:<PrivetRouter><Borrowed></Borrowed></PrivetRouter>,
                loader: ()=> fetch('https://assigment-11-six.vercel.app/borroweBooksReq')
            }
            ,{
                path:'/DetailsBook/:bookName',
                element:<PrivetRouter><DetailsBook></DetailsBook></PrivetRouter>,
                loader: ({params})=> fetch(`https://assigment-11-six.vercel.app/DetailsBook/${params.bookName}`)
            },
            {
                path:'/singleBook/:id',
                element: <Books></Books>,
                loader: ({params})=> fetch(`https://assigment-11-six.vercel.app/singleBook/${params.id}`)
            },
            {
                path:'/readmore/:id',
                element:<ReadMore></ReadMore>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            
        ]

    }
])

export default Router;