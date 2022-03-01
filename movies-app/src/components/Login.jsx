import React, { Fragment, useState } from "react"
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import './login.css'
import { login } from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import { loggedUserAction } from '../store/user/actions'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgServer, setMsgServer] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signIn = () => {
        login(username, password)
        .then( user => {
            dispatch(loggedUserAction(user))
            Cookies.set('token', user.token);
            Cookies.set('user', JSON.stringify(user));
        }).then(()=> navigate("/", {replace:true}))
        .catch(()=> alert('Oops, something was wrong'))
    };

    return (
        <Fragment>
            <article className="card">
            <center>
                <h1 className="title_card_login">Welcome</h1>
                <img src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-256.png" className="img" alt="logo"/>
            </center>
                <div className="card-body pb-1">     
                    <form>
                        <input placeholder="Username" className="user__field" type="text" onChange={e => setUsername(e.target.value)} />
                        <input placeholder="Password" className="pwd__field" type="password" onChange={e => setPassword(e.target.value)} />   
                    </form>
                    <Button variant="contained" size="small" fullWidth onClick={ signIn } >
                        Aceptar
                    </Button>
                </div>
            </article>
        </Fragment>
    )
}

export default Login;
