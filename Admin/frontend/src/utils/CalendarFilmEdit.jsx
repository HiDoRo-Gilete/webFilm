import { useContext, useEffect, useState } from 'react'
import "../css/CalendarFilmEdit.css"
import { Link,useNavigate,useParams } from 'react-router-dom'
import { api_url } from '../config/config'
import ReactLoading from 'react-loading';
import AddFilmContext from '../utils/context,js'
import AddIcon from '../assets/add.png'
function CalendarFilmEdit(Prop){
    const [listdate,setListdate] = useState([])
    const {term,setTerm} = useContext(AddFilmContext)
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
        //console.log(date)
        return date;
    }
    function formatDate(dateString) {
        let datePart = dateString.split(", ")[1];
        let yearPart =  dateString.split(", ")[2];
      
        // Thay thế "tháng" và khoảng trắng bằng "_"
        let formattedDate = datePart.replace(" tháng ", "_")+'_'+yearPart;
        return formattedDate;
      }
    function  dateShow(dateString){
        let datePart = dateString.split(", ")[1];
        let yearPart =  dateString.split(", ")[2];
      
        // Thay thế "tháng" và khoảng trắng bằng "_"
        let formattedDate = datePart.replace(" tháng ", "/")+'/'+yearPart+` (${dateString.split(", ")[0]})`;
        return formattedDate;
      }
    function Addterm(i,event){
        const key =  Object.keys(term)[i];
        let newterm = {... term};
        newterm[key].push('00:00')
        setTerm(newterm)
    }
    function termChange(i,j,event){
        let newterm = {... term};
        const key = Object.keys(newterm)[i];
        newterm[key][j]= event.target.value;
        setTerm(newterm)
    }
    useEffect(()=>{
        
        const term_date = {}
        const temp = getListDate();
        for(let i=0;i<temp.length;i++){
            if (`${formatDate(temp[i])}` in Object.keys(term)){
                term_date[`${formatDate(temp[i])}`] = term[`${formatDate(temp[i])}`]
            }
            else{
                term_date[`${formatDate(temp[i])}`] = []
            }
            
        }
        //console.log('termdate: ',term_date)
        setListdate(temp);
 
        async function getTermById(id){
            const response = await fetch(`${api_url}/term_film/${id}`, { 
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                })
            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);
                //navigate('/');
            }
            else{
                const data = await response.json();
                for(const item of data) {
                    term_date[item.id] = []
                    for (let key of Object.keys(item)){
                        if (key !='id'){
                            term_date[item.id].push(item[key]);
                        }
                    }
                }
                setTerm({... term_date})
                console.log('test1')
            }
        }
        if (Prop.edit){
            getTermById(Prop.id)
        }
        
        setTerm(term_date)
    },[Prop.date_end]);
    const calendarFilm = [];
    console.log('test',term)
    for (let i =0;i<Object.keys(term).length;i++){
        let termlist = []
        
        const key =  Object.keys(term)[i];
        for(let j =0;j<term[key].length;j++){
            termlist.push(<div className="grid__column-2  border__right">
                <input type="time" onChange={(event) => termChange(i,j,event)} value={term[key][j]}/>
            </div>)
        }
        calendarFilm.push(<li className="grid__row grid__full-width calendar__grid-item">
            <div className="grid__column-2 border__bottom border__right">
                <span className="calendar__grid-label">{dateShow(listdate[i])}</span>
            </div>
            <div className="grid__column-10 calendar__grid-timezone border__bottom">
                {termlist}
                <div className="grid__column-2  border__right">
                    <img src={AddIcon} alt="" className="calendar__add-icon" onClick={(event)=>Addterm(i,event)} />
                </div>
            </div>
            
            {/* <div className="grid__column-2 border__bottom border__right">
                <input type="time" onChange={(event) => termChange(i,'term1',event)}/>
            </div>
            <div className="grid__column-2 border__bottom border__right">
                <input type="time"  onChange={(event) => termChange(i,'term2',event)}/>
            </div>
            <div className="grid__column-2 border__bottom border__right">
                <input type="time"  onChange={(event) => termChange(i,'term3',event)}/>
            </div>
            <div className="grid__column-2 border__bottom border__right">
                <input type="time"  onChange={(event) => termChange(i,'term4',event)}/>
            </div> */}
        </li>)
    }
    // const calendarFilm = listdate.map(item=><li className="grid__row grid__full-width calendar__grid-item">
    //     <div className="grid__column-4 border__bottom border__right">
    //         <span className="calendar__grid-label">{item}</span>
    //     </div>
    //     <div className="grid__column-2 border__bottom border__right">
    //         <input type="time" />
    //     </div>
    //     <div className="grid__column-2 border__bottom border__right">
    //         <input type="time" />
    //     </div>
    //     <div className="grid__column-2 border__bottom border__right">
    //         <input type="time" />
    //     </div>
    //     <div className="grid__column-2 border__bottom border__right">
    //         <input type="time" />
    //     </div>
    // </li>)
    return(<>
        <ul className="calendar__grid">
            <li className="grid__row grid__full-width">
                <div className="grid__column-2 border__bottom border__right">
                    <span className="calendar__grid-label">Ngày chiếu</span>
                </div>
                <div className="grid__column-10 border__bottom border__right">
                    <span className="calendar__grid-label">Các xuất chiếu</span>
                </div>
                {/* <div className="grid__column-2 border__bottom border__right">
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
                </div> */}
            </li>
            {calendarFilm}
        </ul>
    </>)
}
export default CalendarFilmEdit;