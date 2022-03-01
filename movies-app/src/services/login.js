import axios from "../utils/axios"

export const login = async (username, password)=> {
    try {
        const loggedUSer = await axios.post('login',{ username, password } )
        return loggedUSer.data.user        
    } catch (error) {
        console.log('Login_Error', error)
    }

}