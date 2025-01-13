import { useEffect, useState } from 'react'
import "../css/Film.css"
import { Link,useNavigate,useParams } from 'react-router-dom'
import { api_url } from '../config/config'
import ReactLoading from 'react-loading';

function Film(Prop){
    const id = Prop.id;
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const loading = document.getElementById('add_film_loading');
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
                loading.style.display = 'none';
            }
        }
        if(id !=null){
            setFilm(null)
            loading.style.display = 'flex';
            getFilm(id)
        }
    },[id]);
    async function deleteFilm(){
        const loading = document.getElementById('add_film_loading');
        loading.style.display = 'flex';
        document.getElementById('film__body').classList.add('no_scroll');
        const response = await fetch(`${api_url}/delete_film/${id}`, { 
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })
        if (response.ok){
            loading.style.display = 'none';
            document.getElementById('film__body').classList.remove('no_scroll');
            alert("Delete Film successfull!");
            Prop.deleteEvent(true)

        }
        else{
            alert(`HTTP error! status: ${response.status}`);
        }
    }
    if (film!=null){
        return(
            <>
                <div className="loading" id='add_film_loading'>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>
               <div className="film__body" id='film__body'>
                <div className="film__heading">
                <span className="film__heading-label">{film.title}</span>
                <span className="film__heading-delete" onClick={deleteFilm}>Xóa</span>
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
                    
                    <div className="btn btn--primary film__body-btn">
                        <Link className='film__edit-link' to={`/edit_film/${id}`}>Thay đổi</Link>
                    </div>
               </div>
            </>
        )
    }
    else{
        return (<>
        <div className="loading" id='add_film_loading'>
            <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
        </div>
        <div className="film__body"></div>
        </>)
    }
}

export default Film