import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import "../css/addFilm.css"
import FilmIcon from "../assets/filmicon.png"
import { api_url } from '../config/config'
import ReactLoading from 'react-loading';

function AddFilm(){
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
    function fileChange(event){
        let seletedFile = event.target.files[0];
        let url = window.URL.createObjectURL(seletedFile);
        setFileurl(url)
        setFile(seletedFile)
    }
    async function postFilm(){
        console.log("test",file)
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
        // const newFilm = {"name":name,"athor":athor,"mainchar":mainchar,"ttime":ttime,"descript":descript,
        //     "title":type,"age":age,"date_start":dateStart,"date_end":dateEnd,"img":file};
        const loading = document.getElementById('add_film_loading');
        loading.style.display = 'flex';
        const response = await fetch(`${api_url}/post_film`, { 
            method: 'POST',
            body: data,
            })
        loading.style.display = 'None';
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
                            <input type="file" required onChange={fileChange}/>
                            <span className='add__body__imglb'>Select image file</span>
                        </label>
                    </div>
                    <div className="add__body__inforight">
                        <input type="text" className="add__info" placeholder='Tên phim' onChange={(event)=>{setName(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Tác giả' onChange={(event)=>{setAthor(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Diễn viên chính' onChange={(event)=>{setMainchar(event.target.value)}}/>
                        <input type="number" className="add__info" placeholder='Thời lượng (phút)' onChange={(event)=>{setTtime(event.target.value)}}/>
                        <input type="text" className="add__info" placeholder='Thể loại' onChange={(event)=>{setType(event.target.value)}}/>
                        <input type="number" className="add__info" placeholder='Độ tuổi' onChange={(event)=>{setAge(event.target.value)}}/>
                        <input type="date" className="add__info add__info_start" placeholder='MM-DD-YY' onChange={(event)=>{setDateStart(event.target.value)}}/>
                        <input type="date" className="add__info add__info_end"  onChange={(event)=>{setDateEnd(event.target.value)}}/>
                        
                    </div>
                </div>
                <span>Tóm tắt / mô tả</span>
                <textarea name="" id="" className="film_description" onChange={(event)=>{setDescript(event.target.value)}}></textarea>
                <div className="add__body__btnfield">
                    <div className="btn btn--primary" onClick={postFilm}>
                    Xong</div>
                    <div className="btn btn--primary"><Link to="/" >Huỷ</Link></div>
                </div>
            </div>
        </>
    )
}

export default AddFilm