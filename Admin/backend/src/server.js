


const fs = require('fs');
const path = require('path')
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {getUser,postUser,initDatabase,getAllFilm,
  deleteFilm,postFilm,getFilmById,getTermById,getAllFilmRunning} = require("./apis/db")

const port = process.env.PORT
// Create a new router instance
const myRouter = express.Router();
app.use(express.json())
// Define routes for the router
getAllFilm()

app.use(cors())

myRouter.get('/delete_film/:id',async (req,res) =>{
  try{
    const {id} =req.params;
    const idNumber = id.split('_')[id.split('_').length-1]
    await deleteFilm(idNumber)
    res.json({'mes':`delete film id: ${id}`})
  }
  catch(e){
    res.status(400).json({'mes':e})
  }
})
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
myRouter.get('/get_all_film_running',async (req,res)=>{
  try{
    const data = await getAllFilmRunning()
    res.json({'data':data})
    //res.send(data)
}
catch(e){
    res.status(400).json(e);
}
})
//0

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
myRouter.get('/term_film/:id',async(req,res)=>{
  try{
    const {id} =req.params;
    const data = await getTermById(id)
    console.log(data)
    res.json(data)
  }
  catch(e){
    res.status(400).json(e)
  }
})
myRouter.get('/all_user',async (req,res)=>{
  const data = await getUser();
  const userInfo = data.map(({password, ...user})=>user)
  console.log(userInfo)
  res.json(userInfo);
})
myRouter.post('/verify_user',async (req,res) =>{
  const data = await getUser();
  const usercheck = req.body
  if (data.some(user => user.username === usercheck.username && user.password === usercheck.password)){
    res.json({'login':true});
  }
  else{
    res.json({'login':false})
  }
})

myRouter.post('/post_user',async (req,res) =>{
  try{
    id = Date.now().toString();
    postUser(id,req.body)
    res.json({'mes':'success'})
  } 
  catch(error){
    res.json({'mes':error})
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
