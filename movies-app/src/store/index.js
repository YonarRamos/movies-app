import { createStore, combineReducers } from 'redux'
import { moviesReducer } from './movies/reducers'
import { studiosReducer } from './studios/reducers'
import { userReducer } from './user/reducers'

const reducers = combineReducers({
    movies : moviesReducer,
    studios : studiosReducer,
    user: userReducer
})
const store = createStore(reducers)
export default store