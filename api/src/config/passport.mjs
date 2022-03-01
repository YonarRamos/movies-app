import passport from"passport" 
import { Strategy as LocalStrategy } from "passport-local"
import { users } from "../../constants/user_constants.mjs"
import jwt from "jsonwebtoken"
const secret = "mySecretPassword";
passport.use('login', new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
},(username, password, done)=>{

    const user = users.find((user)=> user.userName === username)

    if(!user){
        return done(null, false, {msg: 'Not user found'})
    }else {
        if(user.password === password){
            delete user.password
            const token = jwt.sign(user, secret ,{
                expiresIn: 60 * 60 * 24
            })
            user.token = token
            user.auth = true
            return done(null, user, token)
        } else {
            return done(null, false, {msg: 'Credentials error'})
        }
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    const user = users.find((user)=> user.id === id)
    if(!user){
        return done(null, false, {msg: 'Invalid user'})
    }
})
export const isLoggedIn = (req, res, done) => {
    try {
        const token = req.headers['x-access-token']

        if(token){
            jwt.verify(token, secret)
            done();             
        } else {
            return res.status(401).json({ msg: 'Token missing' });
        }
       
    } catch (error) {
        console.log('isLoggedIn_error', error)
    }

};
export default passport