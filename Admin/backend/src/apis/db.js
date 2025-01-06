// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
const { getFirestore,collection, getDocs,addDoc,doc,setDoc } =require( 'firebase/firestore/lite');
const {allFilm} = require("../config/film");

const {v2 } = require('cloudinary');
const {firebaseConfig,cloudinaryConfig} = require( "../config/config");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//cloudinary.config(cloudinaryConfig);

// Initialize Firebase
const dbapp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(dbapp);
//Config Cloudinary
v2.config(cloudinaryConfig)

const initDatabase = async() =>{
    for(let i =0;i<allFilm.length;i++){
        for (let j=0;j<allFilm[i].films.length;j++){
            const newfilm = {"name":allFilm[i].films[j].name,
                            "img": allFilm[i].films[j].img,
                            "title":allFilm[i].title,
                            "date_start":allFilm[i].films[j].date_start,
                            "date_end":allFilm[i].films[j].date_end}
            await postFilm(newfilm);
        }
    }
    console.log("Create database done!");
}

const postFilm = async(newfilm)=>{
    const id = Date.now().toString();
    try {
        const uploadResult = await v2.uploader.upload(
           newfilm.img, {
            public_id: id,
            folder: 'WebFilm'});
        await setDoc(doc(db, "Film", `img_${id}`), { 
            name: newfilm.name,
            title: newfilm.title,
            date_start: newfilm.date_start,
            date_end: newfilm.date_end,
            imgurl: uploadResult.secure_url
        });
        console.log(`Document ${id} successfully written!`);
        return true
        } catch (e) {
        console.error("Error writing document: ", e);
        return false;
        }
}
const getAllFilm = async() =>{
    const Films = collection(db, 'Film');
    const FilmSnapshot = await getDocs(Films);
    const listFilm = FilmSnapshot.docs.map(doc => ({"id":doc.id,...doc.data()}));
    const classify = [...new Set(listFilm.map(listFilm => listFilm.title))];
    const listFilmClassify = [];
    for (let i = 0;i<classify.length;i++){
        const films = listFilm.filter(item => item.title === classify[i]);
        const pushfilms =  films.map(({ title, ...item}) => item);
        listFilmClassify.push({"title":classify[i],"films":pushfilms});
    }
    //console.log(listFilmClassify[0].films[0])
    return listFilmClassify
}

const getUser = async()  => {
    const user = collection(db, 'User');
    const userSnapshot = await getDocs(user);
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList);
    return userList;
}
module.exports ={ getUser,initDatabase,getAllFilm};
