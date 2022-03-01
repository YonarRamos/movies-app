import * as React from "react";
import Cookies from 'js-cookie'
import { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getAllMovies } from '../services/movies'
import { getAllStudios } from '../services/studios'
import { AllMoviesAction } from '../store/movies/actions'
import { AllStudiosAction } from '../store/studios/actions'
import { useSelector } from "react-redux";
/* Components */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
/* CSS */
import "./MovieCard.css"

export default function MovieCard({user}) {

  const dispatch = useDispatch()
  useEffect(()=>{
    getAllMovies().then( movies => {
      dispatch(AllMoviesAction(movies))
    })
    getAllStudios().then( studios => {
      dispatch(AllStudiosAction(studios))
    })
  }, [])
  const studios = useSelector((state) => state.studios)
  const movies = useSelector((state) => {
  return state.movies.filter( movie => movie.studioId === user.id )
  })
  
  

  const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {movies.map((movie, index) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <Card className="card__movie">
              <div className="card__img__wraper">
                <img
                  className="card__img"
                  src={ movie.img ? movie.img : defaultAvatar}
                  alt={movie.name}
                />                
              </div>
              <CardContent className="card__content">
                <Typography gutterBottom variant="h6" component="div">
                  {movie.name}
                </Typography>

                <Typography>
                  {
                    studios.map(studio => {
                      if (movie.studioId === studio.id) {
                        return studio.name
                      }
                    })
                  }
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}