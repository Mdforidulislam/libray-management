const express = require('express');
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;



const corsOptions = {
  origin: [
    'https://comapany-userautentication.web.app',
],
  credentials: true, // Allow cookies
};


app.use(cors(corsOptions))
app.use(express.json())
app.use(cookiesParser())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.raemxbz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("libray-management-system")
    const book_categroy = database.collection("books-category");
    const books = database.collection('books')
    const borrowBooks = database.collection('borrowBooks')
    const BookInfo = database.collection('bookName')
    const userRollInfo = database.collection('userRoll')


/// create api for jsonwebtoken 

app.post('/jwtInfo', async (req, res) => {
  const { userInfo} = req.body; // Extract the email from req.body
  console.log(userInfo);

  const query = { userEmail: userInfo };
  const findUser = await userRollInfo.findOne(query);
  console.log(findUser);

  if (findUser) {
    const userAdmin = { userInfo, userRoll: 'admin' };

    const token = jwt.sign(userAdmin, process.env.sec_token, { expiresIn: '1h' });
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      expires: oneHourFromNow,
    }).send({ msg: 'success', token });

  } else {
    const rollUser = { userInfo, userRoll: 'user' };

    const token = jwt.sign(rollUser, process.env.sec_token, { expiresIn: '1h' });
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      expires: oneHourFromNow,
    }).send({ msg: 'success', token });
  }
});
  
     // madalware to 
     const verifyUser = async (req, res, next) => {
      const token = await req.cookies?.token ;
      console.log('token', token);
      if (!token) {
        return res.status(401).send({ status: 'Unauthorized Access', code: '401' });
      }
    
      jwt.verify(token, process.env.sec_token, (error, decode) => {
        if (error) {
          return res.status(401).send({ status: 'Unauthorized Access', code: '401' });
        } else {
          console.log('decode',decode);
          const userEmail = decode.userInfo;
          const userRoll = decode.userRoll;
          const iat = decode.iat;
          const exp = decode.exp;

          console.log('userEmail:', userEmail);
          console.log('userRoll:', userRoll);
          console.log('iat:', iat);
          console.log('exp:', exp);

          req.user = { userEmail, userRoll, iat, exp };
          console.log('from verify', req.user.userRoll);
          next();
        }
      });
    };
    


    // create api for book info added delected updated
    app.get('/categroyName',async(req,res)=>{
          const cursor = book_categroy.find()
          const result = await cursor.toArray();
          res.send(result)
    })
    app.get('/allbooks',verifyUser,async(req,res)=>{
      console.log('all book',req.user.userRoll);
      if (req.user?.userRoll === 'admin' || req.user?.userRoll === 'user') {
        const cursor = books.find();
        const result = await cursor.toArray()
        res.send(result)
      }else{
        res.status(403).send({ status: 'Forbidden', code: '403' });
      }
    })
    app.get('/updateBook/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await books.findOne(query)
        res.send(result) 
    })
    app.put('/bookUpdateInfo/:id',verifyUser,async(req,res)=>{
      console.log('update here',req.user.userRoll);
      if (req.user?.userRoll === 'admin') {
        const id = req.params.id;
        const infoBook = req.body;
        const filter = {_id:new ObjectId(id)}
        const options = {upsert: true}
        const updateDocument = {
            $set:{
                ...infoBook
            }
        
        }
        const result = await books.updateOne(filter,updateDocument,options)
        res.send(result)
      }else{
        res.status(403).send({ status: 'Forbidden', code: '403' });
      }
    })
    app.get('/DetailsBook/:booksName',async(req,res)=>{
        const book = req.params.booksName;
        const query = {category:book}
        const result = await books.find(query).toArray()
        res.send(result)
    })

    app.post('/borrowBook', async (req, res) => {
      const borrow = req.body;
      const existingProduct = await borrowBooks.findOne({ name: borrow.name ,userEmail:borrow.userEmail });
      if (existingProduct) {
        res.status(400).send({ message: 'Product already exists', existingProduct });
      } else {
        const result = await borrowBooks.insertOne(borrow);
        res.send(result);
      }
    });

    app.post('/exiteData/',async(req,res)=>{
        const {name,userEmail} = req.body;
        const query ={name:name, userEmail:userEmail }
        console.log(name);
        const result = await borrowBooks.findOne(query);
        if (result) {
         return res.send({massage:'book already Exiest',count:0})
        }
        res.send({massage:'data not exite',count:1})
    })

    app.put('/QunatityReduse/:id',async(req, res)=>{
        const booksId = req.params.id;
        const query = {_id: new ObjectId(booksId)}
        const options = {upsert: true}
        const updated = [
            {
                $set: {
                  quantity: {
                    $cond: {
                      if: { $gt: ['$quantity', 0] },
                      then: { $subtract: ['$quantity', 1] }, 
                      else: '$quantity'
                    }
                  }
                }
              }
        ]
        const result = await books.updateOne(query,updated,options)
        res.send(result)
    })
    app.post('/addedBook',verifyUser,async(req,res)=>{
      if (req.user?.userRoll === 'admin') {
        const booksInfo = req.body;
        const result = await books.insertOne(booksInfo)
        res.send(result)
      }else{
        res.status(403).send({ status: 'unauthorize', code: '403' });
      }
    })
    app.get('/singleBook/:id',async(req,res)=>{
       const id = req.params.id;
       const query = {_id: new ObjectId(id)}
       const result = await books.findOne(query);
       res.send(result)
    })
    app.put('/updateQuantity/:updateId',async(req,res)=>{
        const bookName = req.params.updateId;
        const query ={_id: new ObjectId(bookName)}
        const options ={upsert: true}
        const updateQuantity = {$inc:{quantity:  1 }}
        const result = await books.updateOne(query,updateQuantity,options)
        res.send(result)
    })

    app.get('/borroweBooksReq',async(req,res)=>{
        const cursor = borrowBooks.find()
        const result = await cursor.toArray();
        res.send(result)
    })
    app.delete('/borrowDelete/:bookId',async(req,res)=>{
        const borrowId = req.params.bookId;
        console.log(borrowId);
        const query = {_id: new ObjectId(borrowId)}
        const result = await borrowBooks.deleteOne(query)
        res.send(result)
    })

    app.post('/readmore', async (req, res) => {
      const name = req.body.bookName;
      const query = { name: name };
    
      const result = await BookInfo.findOne(query);
    
      if (result === null) {
        res.status(404).send('Book does not exist');
        return;
      }
    
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(port,()=>{
    console.log(`my server is running${port}`);
})