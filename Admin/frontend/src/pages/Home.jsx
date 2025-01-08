import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import BgHome from '../assets/bg_home.png'
import '../css/Home.css'
import AddIcon from "../assets/add.png"
import Nextpage from "../assets/nextpage.png"
import Prepage from "../assets/previouspage.png"




const Home = () =>  {
    const [AllFilms,setAllFilms] = useState([]);
    const [Films,setFilms] = useState([])
    const [searchdata,setSearchdata] = useState('');
    //let AllFilms = [];
    const [index,setIndex] = useState([])
    useEffect(()=>{
        async function get_all_film(){
            const response = await fetch("http://localhost:4000/get_all_film",{
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const res = await response.json();
            let ide = [];
            res.data.map(item=> ide.push(0))
            setFilms(res.data);
            setAllFilms([... res.data]);
            console.log("len",AllFilms.length)
            setIndex(ide)
            console.log(`index ${ide}, data: ${res.data}`)
        }
        get_all_film()
    },[])
    function setNextpage(ide){
        let temp = [... index];
        if (index[ide] != Films[ide].films.length-1){
            temp[ide] +=1;
        }
        else{
            temp[ide] =0;
        }
        setIndex(temp)
    }
    function setPrepage(ide){
        let temp = [... index];
        if (index[ide] != 0){
            temp[ide] -=1;
        }
        else{
            temp[ide] = Films[ide].films.length-1;
        }
        setIndex(temp);
    }
    function Filter(e){
        const text = e.target.value;
        if(text == ''){
            //console.log(AllFilms)
            let newListFilm = [... AllFilms]
            setFilms(newListFilm)
        }
        else{
            let newListFilm = []
            for(let i =0;i<AllFilms.length;i++){
                let item = []
                AllFilms[i].films.map((ite) =>{
                    if (ite.name.search(text) != -1) {
                        const newite = ite;
                        item.push(newite)
                    }
                })
                if (item.length != 0){
                    newListFilm.push({"title":AllFilms[i].title,"films":item})
                }
            }
            console.log(newListFilm)
            setFilms(newListFilm)
        }
    }
    const getViewRow = (row,ide)=> {
        function filmEdit(event){
            alert(event.target.getAttribute('id'))
            console.log("Clicked element ID: " + event);
        }
        const cells = [];
        
        const minitem = Math.min(5,row.films.length);
        for (let i = index[ide]; i < index[ide]+minitem; i++) {
            let item = null;
            if(i>=row.films.length){
                item = i-row.films.length;
            }
            else{
                item = i;
            }
            // console.log(item)
            // console.log(row.films[item].id)
            cells.push(
                <div className="grid__column-2">
                    <Link to={`/info/${row.films[item].id}`}>
                        <div className="home__wraping">
                            <img src={row.films[item].imgurl} id ={row.films[item].id} onClick={filmEdit} alt="" className="home__body2__img" />
                            <span className="home__body2__number">{item+1}</span>
                        </div>
                    </Link>
                    <span className="home__body__namef">{row.films[item].name}</span>
                    <span className="home__body__datelb">Từ ngày: {row.films[item].date_start}</span>
                    <span className="home__body__datelb">Đến ngày: {row.films[item].date_end}</span>
                </div>)
          }
          return (<li className="frid__full-width" id={row.key}>
          <h1 className="home__body__titlefilm">{row.title}</h1>
          <div className="home__body__line">
              <div className="hidden nextpage">
                  <div className="btn btn_right" onClick={() => setNextpage(ide)}>
                      <img src={Nextpage} alt="" className="btn__nextpage" />
                  </div>
              </div>
              <div className="hidden previouspage">
                  <div className="btn btn_left" onClick={() => setPrepage(ide)}>
                          <img src={Prepage} alt="" className="btn__previouspage" />
                  </div>
              </div>
          </div>
          <div className="grid__row">
                {cells}
          </div>
          </li>)
    }
    let allfilmHTML =  Films.map(getViewRow);
    
    
    return(
        <>
            <div className="home__container">
                <div className="home__body1">
                    <img src={BgHome} alt="" className="img home__bg" />
                    <div className="home__body1up">
                        <div className="home__header">
                            <h1 className="home__headerlb">PHIM HAY</h1>
                            <Link to="/add_film"><img src={AddIcon} alt="" className="add-icon" /></Link>
                            
                        </div>
                        <div className="home__textfield">
                            <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung hấp dẫn khác</h1>
                            <h2>Dễ dàng quản lý danh sách phim và thông tin phim</h2>
                            <h2>Page này được dành riêng cho admin</h2>
                        </div>
                    </div>
                    <input type="text" className="home__find" placeholder='Tìm kiếm phim' onChange={Filter}/>
                </div>
                <div className="home__body2">

                    <ul className="grid">
                        {allfilmHTML}
                        
                    </ul>
                    
                </div>
            </div>
        </>
    )
};

export default Home;