
// const express = require('express')
// const cors = require('cors')
// const app = express()
// const {getUser,initDatabase,getAllFilm} = require("./apis/db")
// require('dotenv').config()

// const router = express.Router()
// app.use(cors)
// app.use(express.json)
// //initDatabase()
// //post method and get method
// getAllFilm()


// router.get('/get_all_film',async (req,res)=>{
//     try{
//         console.log(("receive"))
//         const data = await getAllFilm()
//         res.send(data)
//         res.json({'data':data})
//     }
//     catch(e){
//         res.status(400).json(e);
//     }
// })  
// router.get('/', (req, res) => {
//     res.send('Hello from the router!');
//   });
// app.use('/',router);

// port = process.env.PORT
// app.listen(port)
// console.log(`Server is running on localhost:${port}`)



const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const {getUser,initDatabase,getAllFilm,deleteFilm} = require("./apis/db")

const port = process.env.PORT
// Create a new router instance
const myRouter = express.Router();

// Define routes for the router
getAllFilm()

app.use(cors())
myRouter.get('/get_all_film',async (req,res)=>{
    try{
        const data = await getAllFilm()
        res.json({'data':data})
        //res.send(data)
    }
    catch(e){
        res.status(400).json(e);
    }
}) 
myRouter.get('/', (req, res) => {

  res.send('Hello from the router!');
});

myRouter.get('/about', (req, res) => {
  res.send('About us page');
});

// Use the router in your application
app.use('/', myRouter); // Mount the router at the /my-routes path
const corsOptions = {
    origin: 'http://localhost:4001', // Only allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow sending cookies
    optionsSuccessStatus: 204,
};
app.use(express.json)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
