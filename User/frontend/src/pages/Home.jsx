import { useState,useEffect } from "react"
import Login from '../pages/Login'
import ReactLoading from 'react-loading';
import userContext from "../utils/Context"
import '../css/home.css'
const Home = ()=> {
    const[token,setToken] = useState('null')
    const [allFilms,setAllFilms] = useState([]);
    function SeeMore(e,id){
        if (e.target.innerHTML === "Xem thêm"){
            document.getElementById(id).style.whiteSpace='normal'
            e.target.innerHTML = "Thu gọn";
            console.log("test")
        } 
        else{
            document.getElementById(id).style.whiteSpace='nowrap'
            e.target.innerHTML = "Xem thêm"
        }
    }
    function Status(date_start){
        if (new Date(date_start) <= new Date()){
            return 'Đang khởi chiếu'
        }
        else{
            return `Ngày khởi chiếu - ${date_start}`
        }
    }
    useEffect(()=>{
            async function get_all_film(){
                const response = await fetch("http://localhost:4000/get_all_film_running",{
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const res = await response.json();
                setAllFilms(res.data);
                console.log(res.data)
            }
            get_all_film()
        },[])
    if (token == null){
        return (<>
            <userContext.Provider value={{token,setToken}}>
                <Login/>
            </userContext.Provider>
        </>)
        
        
    }
    else{
        const filmsHTML = [];
        for (let i =0 ;i <allFilms.length;i++){
            filmsHTML.push(
            <div className="film__box">
                <h1>{allFilms[i].name}</h1>
                <div className="film__box-general">
                    <div className="film__wrap-img">
                        <img src={allFilms[i].imgurl} alt="" className="film-img" />
                        <div className="film-index">{i+1}</div>
                    </div>
                    <div className="film__box-general-info">
                        <span className="film__info-label">Diễn viên: {allFilms[i].mainchar}</span>
                        <span className="film__info-label">Tác giả: {allFilms[i].athor}</span>
                        <span className="film__info-label">Thời lượng: {allFilms[i].ttime}</span>
                        <span className="film__info-label">Thể loại: {allFilms[i].title}</span>
                        <span className="film__info-label">Độ tuổi: {allFilms[i].age}</span>
                        <span className="film__info-label">Tình trạng: {Status(allFilms[i].date_start)}</span>
                    </div>
                    
                </div>
                <span className="film__box-descript">Nội dung</span>
                <h2 id={`descript_${i}`}>{allFilms[i].descript}</h2>
                <span className="seemore"onClick={(e) => SeeMore(e, `descript_${i}`)}>Xem thêm</span>
            </div>)
        }
        return (<>
            <userContext.Provider value={{token,setToken}}>
                <div className="loading" id='login_loading'>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>
                <div className="home__container">
                    <div className="home__header">
                        <h1 className="home__headerlb">PHIM HAY</h1>
                        <h2>Đặt vé xem phim online</h2>
                        <div className="btn btn--primary">Đăng xuất</div>
                    </div>
                    <div className="film__body">
                        {filmsHTML}
                    </div>
                </div>
            </userContext.Provider>
        </>)
    }
}
export default Home