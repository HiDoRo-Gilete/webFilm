import { useEffect, useState } from 'react'
import BgHome from '../assets/bg_home.png'
import '../css/Home.css'

import Nextpage from "../assets/nextpage.png"
import Prepage from "../assets/previouspage.png"


const Home = () =>  {
    const [allFilm,setAllFilm] = useState([])
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
            setAllFilm(res.data);
            setIndex(ide)
            console.log(`index ${ide}, data: ${res.data}`)
        }
        get_all_film()
    },[])
    function setNextpage(ide){
        let temp = [... index];
        if (index[ide] != allFilm[ide].films.length-1){
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
            temp[ide] = allFilm[ide].films.length-1;
        }
        setIndex(temp);
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
                    <div className="home__wraping">
                        <img src={row.films[item].imgurl} id ={row.films[item].id} onClick={filmEdit} alt="" className="home__body2__img" />
                        <span className="home__body2__number">{item+1}</span>
                    </div>
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
    let allfilmHTML =  allFilm.map(getViewRow);
    // if(response.status(200)){    
    //     allFilm = response.data;
    // }
    //console.log(allFilm)
    // const allFilm = [
    //     {
    //         "title": "Thiếu nhi",
    //         "key": 'TN',
    //         "films": [{'id':1,"name":"Connan movie 18","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG1},
    //             {'id':2,"name":"Connan movie 20","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG2},
    //             {'id':3,"name":"Connan movie 22","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG3},
    //             {'id':6,"name":"Movie 2: Shin cậu bé bút chì","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG6},
    //             {'id':7,"name":"Connan movie 19","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG7},
    //             {'id':8,"name":"Connan movie 21","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG8},
    //             {'id':9,"name":"Kimetsu no yaiba movie","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG9}
    //         ]
    //     },
    //     {
    //         "title": "Phim Việt Nam",
    //         "key": 'PVN',
    //         "films": [{'id':10,"name":"Bố già","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG10},
    //             {'id':11,"name":"Nhà bà nữ","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG11},
    //             {'id':12,"name":"Mai","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG12},
    //             {'id':4,"name":"Chị mười ba: 3 ngày sinh tử","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG4},
    //             {'id':5,"name":"Siêu lầy gặp siêu lừa","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG5},
    //             {'id':13,"name":"Lật mặt 5","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG13},
    //             {'id':14,"name":"Lật mặt 6","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG14}
    //         ]
    //     },
    //     {
    //         "title": "Phim nước ngoài",
    //         "key": 'PNN',
    //         "films": [{'id':15,"name":"Fast & Furious 10","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG15},
    //             {'id':16,"name":"Fast & Furious 11","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG16},
    //             {'id':17,"name":"Spiderman 1","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG17},
    //             {'id':18,"name":"Ironman","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG18},
    //             {'id':19,"name":"Batman","date_start":"20/1/2025","date_end":"27/2/2025",'img':PNG19}
    //         ]
    //     },
    // ];
    
    return(
        <>
            <div className="home__container">
                <div className="home__body1">
                    <img src={BgHome} alt="" className="img home__bg" />
                    <div className="home__body1up">
                        <div className="home__header">
                            <h1 className="home__headerlb">PHIM HAY</h1>
                        </div>
                        <div className="home__textfield">
                            <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung hấp dẫn khác</h1>
                            <h2>Dễ dàng quản lý danh sách phim và thông tin phim</h2>
                            <h2>Page này được dành riêng cho admin</h2>
                        </div>
                    </div>
                    <input type="text" className="home__find" placeholder='Tìm kiếm phim'/>
                </div>
                <div className="home__body2">
                    
                    <ul className="grid">
                        {allfilmHTML}
                        {/* <li className="frid__full-width">
                            <h1 className="home__body__titlefilm">Thiếu Nhi</h1>
                            <div className="home__body__line">
                                <div className="hidden nextpage">
                                    <div className="btn btn_right">
                                        <img src={Nextpage} alt="" className="btn__nextpage" />
                                    </div>
                                </div>
                                <div className="hidden previouspage">
                                    <div className="btn btn_left">
                                            <img src={Prepage} alt="" className="btn__previouspage" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid__row">
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG1} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">1</span>
                                    </div>
                                    <span className="home__body__namef">Connan Movie 18</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG2} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">2</span>
                                    </div>
                                    <span className="home__body__namef">Connan Movie 20</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG3} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">3</span>
                                    </div>
                                    <span className="home__body__namef">Connan Movie 22</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG4} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">4</span>
                                    </div>
                                    <span className="home__body__namef">Chị mười ba: 7 ngày sinh tử</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG5} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">5</span>
                                    </div>
                                    <span className="home__body__namef">Siêu lầy gặp siêu lừa</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                                <div className="grid__column-2">
                                    <div className="home__wraping">
                                        <img src={PNG6} alt="" className="home__body2__img" />
                                        <span className="home__body2__number">6</span>
                                    </div>
                                    <span className="home__body__namef">Movie 2: Shin cậu bé bút chì</span>
                                    <span className="home__body__datelb">Từ ngày: 20/1/2025</span>
                                    <span className="home__body__datelb">Đến ngày: 27/2/2025</span>
                                </div>
                            </div>
                        </li> */}
                        
                    </ul>
                    
                </div>
            </div>
        </>
    )
};

export default Home;