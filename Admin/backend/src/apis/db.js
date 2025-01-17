// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
const { getFirestore,collection, getDocs,addDoc,doc,setDoc,deleteDoc, getDoc, documentId,query } =require( 'firebase/firestore/lite');
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
            const id = Date.now().toString();
            await postFilm(newfilm,id);
        }
    }
    console.log("Create database done!");
}

const postFilm = async(newfilm,id)=>{  
    try {
        const filmDocRef = doc(db, "Film", `img_${id}`);
        const termCollectionRef = collection(filmDocRef, "term");
        const uploadResult = await v2.uploader.upload(
           newfilm.img, {
            public_id: id,
            folder: 'WebFilm'});
        await setDoc(filmDocRef, { 
            name: newfilm.name,
            athor: newfilm.athor,
            title: newfilm.title,
            mainchar: newfilm.mainchar,
            ttime: newfilm.ttime,
            age: newfilm.age,
            date_start: newfilm.date_start,
            date_end: newfilm.date_end,
            descript: newfilm.descript,
            imgurl: uploadResult.secure_url
        });
        const term = JSON.parse(newfilm.term)
        // for (const key of Object.keys(term)) {
        //     console.log(key, term[key]);
        //   }
        
        for (const t of Object.keys(term)){
            let alltermdate = {};
            for (let i =0;i<term[t].length;i++){
                alltermdate[i.toString()]=term[t][i];
            }
            if(Object.keys(alltermdate).length != 0){
                //post termdate
                console.log(t, alltermdate)
                const termdocref = doc(termCollectionRef,t);
                await setDoc(termdocref,alltermdate);
            }
            
        }

        console.log(`Document ${id} successfully written!`);
        return true
        } catch (e) {
        console.error("Error writing document: ", e);
        return false;
        }
}
const deleteFilm = async(id)=>{
    try {
        await v2.api.delete_resources([`WebFilm/${id}`], { type: 'upload', resource_type: 'image' });
        const docRef = doc(db, 'Film', `img_${id}`); // Create a reference to the document
        await deleteDoc(docRef); // Delete the document
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
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

const getFilmById =  async(documentId) =>{
    console.log("id:",documentId)
    const docRef = doc(db, 'Film', documentId);
    const docSnap = await getDoc(query(docRef));
    return docSnap.data();
}
const getTermById = async(id)=>{
    const termCollectionRef = collection(doc(db, "Film", id), "term");
    const termSnapshot = await getDocs(termCollectionRef);
    //const listterm = termSnapshot.docs.map(doc => ({"id":doc.id,...doc.data()}));
    const documents = [];
    termSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
}

const getUser = async()  => {
    const user = collection(db, 'User');
    const userSnapshot = await getDocs(user);
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList);
    return userList;
}
module.exports ={ getUser,initDatabase,getAllFilm,deleteFilm,
    postFilm,getFilmById,getTermById};
