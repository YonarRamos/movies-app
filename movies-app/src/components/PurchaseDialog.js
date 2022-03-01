import * as React from 'react';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MovieDetail from './MovieDetail'
import { purchaseMovie, getAllMovies } from '../services/movies'
import { AllMoviesAction } from '../store/movies/actions'
import { useDispatch } from 'react-redux';
import './PurchaseDialog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({movie, user}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const purchase = ( buyerStudioId, movieId, price )=>{
    try {
        purchaseMovie(buyerStudioId, movieId).then(()=>{
            getAllMovies().then( movies => {
                dispatch(AllMoviesAction(movies))
              })
              alert('Purchase succesfull')
        })
        handleClose()   
        if(price <= user.money){
          user.money -= price
          Cookies.set('user', JSON.stringify(user))   
        }       
        return user   
    } catch (error) {
        //console.log(error.data.response.msg)
        alert('Oops, somethig was wrong, check your money')
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth onClick={handleClickOpen}>
        Buy this movie
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className='dialog'
      >
        <DialogTitle className='dialog__title'>{movie.name}</DialogTitle>
        <DialogContent className='dialog__content'>
          <DialogContentText id="alert-dialog-slide-description">
            <MovieDetail movie={movie}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog__title'>
          <Button variant='error' onClick={handleClose}>Cancel</Button>
          <Button onClick={ ()=> purchase(user.id, movie.id, movie.price ) }>Buy</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}