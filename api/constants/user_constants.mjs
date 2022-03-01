
import { sony, warner, disney } from './studio_constants.mjs'
let disneyTemp = {...disney}
delete disneyTemp.movies
let warnerTemp = {...warner}
delete warnerTemp.movies
let sonyTemp = {...sony}
delete sonyTemp.movies
export const users = [
    {
        id:1,
        userName: 'disney',
        password: '1234',
        ...disneyTemp
    },
    {
        id:2,
        userName: 'warner',
        password: '1234',
        ...warnerTemp
    },
    {
        id:3,
        userName: 'sony',
        password: '1234',
        ...sonyTemp
    }
]