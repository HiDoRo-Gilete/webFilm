import { useEffect, useState } from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import "../css/addFilm.css"
import FilmIcon from "../assets/filmicon.png"
import { api_url } from '../config/config'
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types'

const AddFilm = (Prop)=>{
    const {id} = useParams();
    const [file,setFile] = useState(null)
    const [fileurl,setFileurl] = useState(FilmIcon);
    const [name,setName] = useState("");
    const [athor,setAthor] = useState("");
    const [mainchar,setMainchar] = useState("");
    const [ttime,setTtime] = useState(0);
    const [type,setType] = useState("");
    const [age,setAge] = useState(12);
    const [dateStart,setDateStart] = useState(null);
    const [dateEnd,setDateEnd] = useState(null);
    const [descript,setDescript] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const loading = document.getElementById('add_film_loading');
        async function getFilmById(id) {
            const response = await fetch(`${api_url}/info_film/${id}`, { 
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                })
            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);
                navigate('/');
            }
            else{
                const film = await response.json();
                const input_name = document.getElementById('input_name')
                input_name.value=film.name
                setName(film.name)

                const input_athor = document.getElementById('input_athor')
                input_athor.value=film.athor
                setAthor(film.athor)

                const input_maichar = document.getElementById('input_maichar')
                input_maichar.value=film.mainchar
                setMainchar(film.mainchar)

                const input_age = document.getElementById('input_age')
                input_age.value=film.age
                setAge(film.age)

                const input_dateS = document.getElementById('input_dateS')
                input_dateS.value=film.date_start
                setDateStart(film.date_start)
                const input_dateE = document.getElementById('input_dateE')
                setDateEnd(film.date_end)
                input_dateE.value=film.date_end

                const input_ttime = document.getElementById('input_ttime')
                input_ttime.value=film.ttime
                setTtime(film.ttime)

                const input_type = document.getElementById('input_type')
                input_type.value=film.title
                setType(film.title)

                const input_descript = document.getElementById('input_descript')
                input_descript.value=film.descript
                setDescript(film.descript)
                
                const filefromurl = await fetch(film.imgurl);
                const blob = await filefromurl.blob();
                const filename = film.imgurl.split('/')[film.imgurl.split('/').length - 1]
                setFile(new File([blob], filename, { type: blob.type }))
                setFileurl(film.imgurl)

                loading.style.display = 'None'
                document.body.classList.remove('no_scroll');
    
            }
        }
        if (Prop.isEdit){
            loading.style.display = 'flex';
            document.body.classList.add('no_scroll');
            getFilmById(id)
        }
    },[])
    function fileChange(event){
        let seletedFile = event.target.files[0];
        let url = window.URL.createObjectURL(seletedFile);
        setFileurl(url)
        setFile(seletedFile)
    }
    async function postFilm(){
        const data = new FormData();
        data.set('name',name);
        data.set('athor',athor);
        data.set('mainchar',mainchar);
        data.set('ttime',ttime);
        data.set('descript',descript);
        data.set('title',type);
        data.set('age',age);
        data.set('date_start',dateStart);
        data.set('date_end',dateEnd);
        data.set('img',file);
        if (Prop.isEdit){
            data.set('id',id);
        }
        // const newFilm = {"name":name,"athor":athor,"mainchar":mainchar,"ttime":ttime,"descript":descript,
        //     "title":type,"age":age,"date_start":dateStart,"date_end":dateEnd,"img":file};
        const loading = document.getElementById('add_film_loading');
        loading.style.display = 'flex';
        document.body.classList.add('no_scroll');
        const response = await fetch(`${api_url}/post_film`, { 
            method: 'POST',
            body: data,
            })
        loading.style.display = 'None';
        document.body.classList.remove('no_scroll');
        if(response.ok){
            alert("This film is Post");
            navigate('/');
        }
        else{
            response.json().then(mes=>{
                alert(mes.e);
            })
        }
        //alert(`${name} ${athor} ${mainchar} ${ttime} ${type} ${age} ${dateStart} ${dateEnd}`)
    }
    return(
        <>
            <div className="loading" id='add_film_loading'>
                <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
            </div>
            <div className="home__header">
                <h1 className="home__headerlb">PHIM HAY</h1>
            </div>
            <div className="add__body">
                <div className="home__textfield">
                    <h1>Thêm phim mới vào trang web</h1>
                    <h2>Page này được dành riêng cho admin</h2>
                </div>
                <div className="add__body__input">
                    <div className="add__body__img">
                        <img src={fileurl}  alt="" className='add__img' />
                        <label className="label">
                            <input type="file" id='input_file' required onChange={fileChange}/>
                            <span className='add__body__imglb'>Select image file</span>
                        </label>
                    </div>
                    <div className="add__body__inforight">
                        <input type="text" className="add__info" placeholder='Tên phim' id='input_name' onChange={(event)=>{setName(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Tác giả' id='input_athor' onChange={(event)=>{setAthor(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Diễn viên chính' id='input_maichar' onChange={(event)=>{setMainchar(event.target.value)}}/>
                        <input type="number" className="add__info" placeholder='Thời lượng (phút)' id='input_ttime' onChange={(event)=>{setTtime(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Thể loại' id='input_type' onChange={(event)=>{setType(event.target.value)}}/>
                        <input type="number" className="add__info" placeholder='Độ tuổi' id='input_age' onChange={(event)=>{setAge(event.target.value)}}/>
                        <input type="date" className="add__info add__info_start"id='input_dateS' placeholder='MM-DD-YY' onChange={(event)=>{setDateStart(event.target.value)}}/>
                        <input type="date" className="add__info add__info_end"id='input_dateE'  onChange={(event)=>{setDateEnd(event.target.value)}}/>
                        
                    </div>
                </div>
                <span>Tóm tắt / mô tả</span>
                <textarea name="" id="input_descript" className="film_description" onChange={(event)=>{setDescript(event.target.value)}}></textarea>
                <div className="add__body__btnfield">
                    <div className="btn btn--primary" onClick={postFilm}>
                    Xong</div>
                    <div className="btn btn--primary"><Link to="/" >Huỷ</Link></div>
                </div>
            </div>
        </>
    )
}
AddFilm.protoTypes = {
    isEdit : PropTypes.bool,
}
AddFilm.defaultProps= {
    isEdit: false,
}
export default AddFilm