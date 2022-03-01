import axios from '../utils/axios'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export const getAllMovies = async ()=> {
    const movies = await axios.get('/movies',{ 
        headers: { 
            'x-access-token': String(token)
        } 
        })
    return movies.data;
}

export const purchaseMovie = async (buyerStudioId, movieId )=> {
    const response = await axios.post('/transfer',{ buyerStudioId, movieId },{ 
        headers: { 
            'x-access-token': String(token)
        } 
        })
    return response;
}