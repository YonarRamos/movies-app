import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { getAllMoviesFromStudios } from '../src/helpers.mjs'
import { sony, warner, disney, movieAge, sonyImages } from '../constants/studio_constants.mjs'
import passport from './config/passport.mjs';
import { isLoggedIn } from './config/passport.mjs';

const app = express();
//adjuntamos imgs a las peliculas.
sony.movies.forEach((item) => {
  item.img = sonyImages[item.id]
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('constants')); 

//Inicializamos passport
app.use(passport.initialize());

app.post('/login', passport.authenticate('login'), function (req, res) {
  if(req.user){
    res.json({ 
      msg: 'Welcome to our movie store!!', 
      user : req.user  
    })
  }
});

app.get('/studios', isLoggedIn , function (req, res) {
  let disneyTemp = {...disney}
  delete disneyTemp.movies
  let warnerTemp = {...warner}
  delete warnerTemp.movies
  let sonyTemp = {...sony}
  delete sonyTemp.movies
  res.json([
    disneyTemp,
    warnerTemp,
    sonyTemp
  ])
});

app.get('/movies', isLoggedIn , function (req, res) {
  try {
    const movies = getAllMoviesFromStudios([disney, warner, sony])
    movies.forEach( movie =>{
      if(movie.url){
       movie.img = movie.url
        delete movie.url
      }
    })
    res.status(200).json(movies)
  } catch (e) {
    console.log(e)
    res.status(500).json({error:e})
  }
});

app.get('/movieAge', isLoggedIn , function (req, res) {
  res.json(movieAge)
});

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', isLoggedIn , function (req, res) {
  const { buyerStudioId, movieId } = req.body;
  const movies = getAllMoviesFromStudios([disney, warner, sony])
  const studios = [sony, warner, disney]
  let buyer = studios.find( studio => studio.id == buyerStudioId )
  const movieToBuy = movies.find( movie => movie.id == movieId )
  try {
    if(!movieToBuy){
      return res.status(404).json({
        msg:"movie not found"
      })
    }
    if( movieToBuy.price > buyer.money) {
      return res.status(404).json({
        msg:"not enough money"
      })   
    }
    if( buyer.movies.some( movie => movie.id == movieToBuy.id) ) {
      return res.status(400).json({
        msg:"movie already included"
      })   
    }

    const studio = (() => {
      switch (String(buyerStudioId)) {
        case '1':
          let index1 = warner.movies.findIndex( movie => movie.id == movieToBuy.id )
          if(index1 > 0) {
            warner.movies.splice( index1, 1 )
            warner.money += movieToBuy.price
          } else {
            let indexSony = sony.movies.findIndex( movie => movie.id == movieToBuy.id )
            sony.movies.splice( indexSony, 1 )
            sony.money += movieToBuy.price
          }
          disney.movies.push(movieToBuy)
          disney.money -= movieToBuy.price
          return disney
        case '2':
          let index2 = disney.movies.findIndex( movie => movie.id == movieToBuy.id )
          if(index2 > 0) {
            disney.movies.splice( index2, 1 )
            disney.money += movieToBuy.price
          } else {
            let indexSony = sony.movies.findIndex( movie => movie.id == movieToBuy.id )
            sony.movies.splice( indexSony, 1 )
            sony.money += movieToBuy.price
          }
          warner.movies.push(movieToBuy)
          warner.money -= movieToBuy.price
          return warner
        case '3':
          let index3 = disney.movies.findIndex( movie => movie.id == movieToBuy.id )
          if(index3 > 0) {
            disney.movies.splice( index3, 1 )
            disney.money += movieToBuy.price
          } else {
            let indexWarner = warner.movies.findIndex( movie => movie.id == movieToBuy.id )
            warner.movies.splice( indexWarner, 1 )
            warner.money += movieToBuy.price
          }
          sony.movies.push(movieToBuy)
          sony.money -= movieToBuy.price
          return sony
      }
    })();

    res.status(200).json({
      msg:'Successful purchase',
      data: studio
    })   
  } catch (error) {
    console.log('oops, something was worng', error)
  }
 
});

// TODO: 2 Add logging capabilities into the movies-app

export const server = app.listen(3000)

export default app 