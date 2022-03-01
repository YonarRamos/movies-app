import axios from "../utils/axios"
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export const getAllStudios = async ()=> {
    const studios = await axios.get('studios',{ 
        headers: { 
            'x-access-token': String(token)
        } 
    })
    return studios.data

}