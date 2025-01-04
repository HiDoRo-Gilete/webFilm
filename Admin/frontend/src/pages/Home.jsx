import { useState } from 'react'
import BgHome from '../assets/bg_home.png'
import '../css/Home.css'
import PNG1 from "../assets/1.png"
import PNG2 from "../assets/2.png"
import PNG3 from "../assets/3.png"
import PNG4 from "../assets/4.png"
import PNG5 from "../assets/5.png"
import PNG6 from "../assets/6.png"

const Home = () => {
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
                    <div className="grid">
                        <div className="grid__row grid__full-width">
                            <div className="grid__column-2">
                                <div className="home__wrapimg">
                                    <img src={PNG1} alt="" className="home__body2__img" />
                                </div>
                            </div>
                            <div className="grid__column-2">
                            <div className="home__wrapimg">
                                    <img src={PNG2} alt="" className="home__body2__img" />
                                </div>
                            </div>
                            <div className="grid__column-2">
                            <div className="home__wrapimg">
                                    <img src={PNG3} alt="" className="home__body2__img" />
                                </div>
                            </div>
                            <div className="grid__column-2">
                            <div className="home__wrapimg">
                                    <img src={PNG4} alt="" className="home__body2__img" />
                                </div>
                            </div>
                            <div className="grid__column-2">
                            <div className="home__wrapimg">
                                    <img src={PNG5} alt="" className="home__body2__img" />
                                </div>
                            </div>
                            <div className="grid__column-2">
                                <div className="home__wrapimg">
                                    <img src={PNG6} alt="" className="home__body2__img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;