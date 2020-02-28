import jwtDecode from 'jwt-decode';
import backend from "../services/backend_api";
export const decoder = async function(){

    const token_info = jwtDecode(sessionStorage.getItem('token'))
    const user = await backend(`/user/${token_info.sub}`, {
        headers: { Authorization: sessionStorage.getItem('token') }})
    return user.data
}