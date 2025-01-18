import '../css/login.css'
import Bg_Login from '../assets/bg_login.png'
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { api_url } from '../config/config'


const Login = ()=>{
    const [unLogin,setUnLogin] = useState('');
    const [unRegister,setUnRegister] = useState('');
    const [pwLogin,setPwLogin] = useState('');
    const [pwRegister,setPwRegister] = useState('');
    const [email,setEmail] = useState('');
    const [rpwRegister,setRpwRegister] = useState('');
    const [error,setError] = useState('');
    const [allUser,setAllUser] = useState([])

    function registerForm() {
        document.getElementById("login").style.left = "-400px";;
        document.getElementById("register").style.left = "50px";
        document.getElementById("btn__box").style.left ="110px";
        document.getElementById('un_register').value='';
        document.getElementById('email').value='';
        document.getElementById('pw_register').value='';
        document.getElementById('rpw_register').value='';
        setError('');
    }

    function loginForm() {
        document.getElementById("login").style.left = "50px";;
        document.getElementById("register").style.left = "450px";
        document.getElementById('un_login').value='';
        document.getElementById('pw_login').value='';
        document.getElementById("btn__box").style.left ="0";
        setError('');
    }
    function Login(){
        if (unLogin==''){
            setError('Username không được để trống!')
        }
        else if(pwLogin == ''){
            setError('Password không được để trống!')
        }
        else{
            console.log('Login success!');
        }
    }
    async function Register(){
        if (unRegister==''){
            setError('Username không được để trống!');
        }
        else if(pwRegister == ''){
            setError('Password không được để trống!');
        }
        else if(email == ''){
            setError('Email không được để trống!');
        }
        else if(pwRegister != rpwRegister){
            setError('Mật khẩu nhập lại không khớp!');
        }
        else{
            console.log('Register success!');
            document.getElementById('login_loading').style.display = 'flex'
            const response = await fetch(`${api_url}/post_user`, { 
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({'username':unRegister,'password':pwRegister,'email':email})
                })
            document.getElementById('login_loading').style.display = 'none'
            if (!response.ok) {
                //alert(`HTTP error! status: ${response.status}`);
                //navigate('/');
            }
            else{
                const data = await response.json()
                alert(data.mes)
                
            }
        }
    }
    function rpwChange(e){
        setRpwRegister(e.target.value)

        if (pwRegister == ''){
            console.log(pwRegister)
            setError('Password không được để trống');
        }
        else if(e.target.value != pwRegister){
            setError("Mật khẩu không khớp");
        }
        else{
            setError('');
        }
        
    }
    return (
        <>
        <div className="loading" id='login_loading'>
            <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
        </div>
        <div className="container login__container">
            
            <img src={Bg_Login} alt="" className="bg_login-img" />
            <div className="overlap"></div>
            <div className="login__body">

                <div className="login__form-box">
                    <div class="login__button-box">
                        <div id="btn__box"></div>
                        <div class="login__toggle-btn" onClick={loginForm} >Đăng nhập</div>
                        <div class="login__toggle-btn" onClick={registerForm}>Đăng ký</div>
                    </div>
                    <div id="login" class="input-group">
                        <input type="text" id='un_login' class="input-field" placeholder="Tên đăng nhập" onChange={(e)=>{setUnLogin(e.target.value)}}></input>
                        <input type="password" id='pw_login' class="input-field" placeholder="Mật khẩu" onChange={(e)=>{setPwLogin(e.target.value)}}></input>
                        <span className="register__error">{error}</span>
                        <div className="login__remind">
                            <input type="checkbox" class="check-box"></input>
                            <span>Nhớ mật khẩu</span>
                        </div>
                        <button type="submit" class="submit-btn submit-btn-login" onClick={Login}>Đăng nhập</button>
                        
                    </div>
                    <div id="register" class="input-group">
                        <input type="text" id='un_register' class="input-field" placeholder="Tên đăng nhập" onChange={(e)=>{setUnRegister(e.target.value)}}></input>
                        <input type="email" id='email' class="input-field" placeholder="Email"onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <input type="password" id='pw_register' class="input-field" placeholder="Mật khẩu" onChange={(e)=>{setPwRegister(e.target.value)}}></input>
                        <input type="password" id='rpw_register' class="input-field" placeholder="Nhập lại mật khẩu" onChange={rpwChange}></input>
                        <span className="register__error">{error}</span>
                        <button type="submit" class="submit-btn submit-btn-login" onClick={Register}>Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
};
export default Login;