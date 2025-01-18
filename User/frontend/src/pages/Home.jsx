import { useState } from "react"
import Login from '../pages/Login'

const Home = ()=> {
    const[token,setToken] = useState(null)

    if (token == null){
        return <Login/>
    }
}
export default Home