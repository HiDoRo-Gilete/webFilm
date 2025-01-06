import { useState } from 'react'
import "../css/addFilm.css"
import FilmIcon from "../assets/filmicon.png"

function AddFilm(){
    const [file,setFile] = useState(FilmIcon)
    function fileChange(event){
        const seletedFile = event.target.files[0];
        let url = window.URL.createObjectURL(seletedFile);
        alert(url)
        setFile(url)
    }
    return(
        <>
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
                    <img src={file}  alt="" className='add__img' />
                    <label class="label">
                        <input type="file" required onChange={fileChange}/>
                        <span className='add__body__imglb'>Select image file</span>
                    </label>
                </div>
                <div className="add__body__inforight">
                    <input type="text" className="add__info" placeholder='Tên phim'/>
                    <input type="text" className="add__info" placeholder='Tác giả'/>
                    <input type="text" className="add__info" placeholder='Diễn viên chính'/>
                    <input type="number" className="add__info" placeholder='Thời lượng'/>
                    <div className='date__input '>
                        <span className="home__body__datelb">Ngày khởi chiếu</span>
                        <input type="date" className="add__info" />
                    </div>
                    <div className='date__input '>
                        <span className="home__body__datelb">Ngày kết thúc</span>
                        <input type="date" className="add__info" />
                    </div>
                </div>
            </div>
            <span>Tóm tắt / mô tả</span>
            <textarea name="" id="" className="film_description"></textarea>
            <div className="btn">Xong</div>
            <div className="btn">Huỷ</div>
        </div>
        </>
    )
}

export default AddFilm