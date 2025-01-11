
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


const fs = require('fs');
const path = require('path')
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {getUser,initDatabase,getAllFilm,deleteFilm,postFilm,getFilmById} = require("./apis/db")

const port = process.env.PORT
// Create a new router instance
const myRouter = express.Router();
app.use(express.json())
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
myRouter.get('/info_film/:id',async (req,res) =>{
  try{
    const {id} =req.params;
    const data = await getFilmById(id)
    data.id = id;
    console.log(data)
    res.json(data)
  }
  catch(e){
    res.status(400).json(e)
  }
})
myRouter.post('/post_film',upload.single('img'),async (req,res) => {
  if (!req.file) {
    console.log("No File to post")
    return res.status(400).json({"e":"No file uploaded."});
  }
  try{
    let data = req.body;
    let id =''
    if (!('id' in data)){
      id = Date.now().toString();
    }
    else{
      id = data.id.split('_')[data.id.split('_').length - 1];
    }
    const {originalname,path} = req.file;
    const parts = originalname.split();
    const ext = parts[parts.length -1];
    fs.renameSync(path,path+'.'+ext);
    data.img = path+'.'+ext;
    console.log(data)
    const result = await postFilm(data,id);
    if(result){
      res.json({"success":true})
    }
    else {
      res.status(400).json({"e":"error when post Film"})
    }
    fs.rmSync(path+'.'+ext)
  }
  catch(e){
    console.log(e)
    res.status(400).json(e)
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
