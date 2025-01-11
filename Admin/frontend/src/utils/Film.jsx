import { useEffect, useState } from 'react'
import "../css/Film.css"
import { Link,useNavigate,useParams } from 'react-router-dom'
import { api_url } from '../config/config'
function Film(Prop){
    const id = Prop.id;
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        async function getFilm(id) {
            const response = await fetch(`${api_url}/info_film/${id}`, { 
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                })
            if (!response.ok) {
                //alert(`HTTP error! status: ${response.status}`);
                //navigate('/');
            }
            else{
                const resfilm = await response.json()
                setFilm(resfilm)
            }
        }
        if(id !=null){
            getFilm(id)
        }
    },[id]);
    if (film!=null){
        return(
            <>
               <div className="film__body">
                <div className="film__heading">
                <span className="film__heading-label">{film.title}</span>
                <span className="film__heading-delete">Xóa</span>
                </div>
                    <div className="home__body-general">
                        <div className="film__body__img">
                            <img src={film.imgurl} alt="" className="film__body-img" />
                            <h1>{film.name}</h1>
                        </div>
                        <div className="film__body-info">
                            <h3>Đạo diễn: {film.athor}</h3>
                            <h3>Diễn viên chính: {film.mainchar}</h3>
                            <h3>Thời lượng: {film.ttime} phút</h3>
                            <h3>Độ tuổi từ: {film.age}+</h3>
                            <h3>Ngày công chiếu: {film.date_start}</h3>
                            <h3>Ngày kết thúc: {film.date_end}</h3>
                        </div>
                    </div>
                    <span className="description">{film.descript}</span>
                    <div className="btn btn--primary film__body-btn">Thay đổi</div>
               </div>
            </>
        )
    }
    else{
        return (<></>)
    }
}

export default Film