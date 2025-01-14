import { useEffect, useState } from 'react'
import "../css/CalendarFilmEdit.css"
import { Link,useNavigate,useParams } from 'react-router-dom'
import { api_url } from '../config/config'
import ReactLoading from 'react-loading';
function CalendarFilmEdit(Prop){
    const [listdate,setListdate] = useState([])
    function getListDate(){
        let currentDate =  new Date() > Prop.date_start ? new Date():new Date(Prop.date_start);
        const endDate = new Date(Prop.date_end)
        const date = [];
        while(currentDate<=endDate){
            date.push((new Date(currentDate)).toLocaleDateString('vi-VN', 
                {
                    weekday: 'long', // Tên đầy đủ của thứ
                    day: 'numeric',
                    month: 'long', // Tên đầy đủ của tháng
                    year: 'numeric'
                  }
            ));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log(date)
        return date;
    }
    useEffect(()=>{
        setListdate(getListDate());
    },[Prop.date_end]);
    const calendarFilm = listdate.map(item=><li className="grid__row grid__full-width calendar__grid-item">
        <div className="grid__column-4 border__bottom border__right">
            <span className="calendar__grid-label">{item}</span>
        </div>
        <div className="grid__column-2 border__bottom border__right">
            <input type="time" />
        </div>
        <div className="grid__column-2 border__bottom border__right">
            <input type="time" />
        </div>
        <div className="grid__column-2 border__bottom border__right">
            <input type="time" />
        </div>
        <div className="grid__column-2 border__bottom border__right">
            <input type="time" />
        </div>
    </li>)
    return(<>
        <ul className="calendar__grid">
            <li className="grid__row grid__full-width">
                <div className="grid__column-4 border__bottom border__right">
                    <span className="calendar__grid-label">Ngày chiếu</span>
                </div>
                <div className="grid__column-2 border__bottom border__right">
                    <span className="calendar__grid-label">Ca 1</span>
                </div>
                <div className="grid__column-2 border__bottom border__right">
                    <span className="calendar__grid-label">Ca 2</span>
                </div>
                <div className="grid__column-2 border__bottom border__right">
                    <span className="calendar__grid-label">Ca 3</span>
                </div>
                <div className="grid__column-2 border__bottom">
                    <span className="calendar__grid-label">Ca 4</span>
                </div>
            </li>
            {calendarFilm}
        </ul>
    </>)
}
export default CalendarFilmEdit;