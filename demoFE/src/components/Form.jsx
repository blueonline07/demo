import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const";
export default function Form({route, method}){
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const resp = await api.post(route, {
                username: e.target.username.value,
                password: e.target.password.value
            })
            if(method == 'login'){
                localStorage.setItem(ACCESS_TOKEN, resp.data.access)
                localStorage.setItem(REFRESH_TOKEN, resp.data.refresh)
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input name ="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <button type="submit">{method}</button>
        </form>
    )
}