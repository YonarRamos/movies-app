import * as React from 'react';
import Cookies from 'js-cookie'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getAllMovies } from '../services/movies';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { AllMoviesAction } from '../store/movies/actions'
import { MoviesByNameAction } from '../store/movies/actions'
import SelectFilterByStudio from '../components/SelectFilterByStudio'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router'
const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = React.useState('')
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedStudio, setSelectedStudio] = React.useState('');
  const user = JSON.parse(Cookies.get('user')) 

  const clearResults = async ()=>{ 
    await getAllMovies().then( movies => {
      dispatch(AllMoviesAction(movies))
    })
    setName('')
    setSelectedStudio('')
  };

  const filterByName = (e)=> { 
    if (e.key === 'Enter') {
    if(name === '') { 
        clearResults()
      }
      else {
        dispatch(MoviesByNameAction(name))
      }
    }
  };

  const goMarket = ()=>{
    navigate("/market", {replace:true})
  }

  const goMovies = ()=>{
    navigate("/", {replace:true})
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} className="box__container">
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style= {{display:'flex', justifyContent: 'space-between'}}>
          <div style= {{display:'flex'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Button  onClick={ goMarket }>
              <p style={{color:'white'}}>Market</p>
            </Button>
            <Button  onClick={ goMovies }>
              <p style={{color:'white'}}>My movies</p>
            </Button>
          </div>
          <div style= {{display:'flex'}}>
            <p style={{color:'white', marginRight:10 }}>Money: {`$${user.money}`}</p>
            <Avatar
              alt="Remy Sharp"
              src={user.logo}
              sx={{ width: 46, height: 46, marginRight:2}}
            />
            <TextField name="name" onKeyUp={ filterByName } onChange={event => setName(event.target.value)} size="small" id="filled-basic" label="Search by name"  variant="filled"/>
          </div>
          

       </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <h3 style={{marginRight:'auto'}}>Filter By:</h3>
          <IconButton onClick={handleDrawerClose} style={{'height':'40px', marginTop: 'auto', marginBottom: 'auto'}} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

            <Grid container spacing={1} sx={{p:2}}>  
                {/* Filter by studio*/}
                <Grid item xs={12}>
                  <SelectFilterByStudio clear={ clearResults } selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio}/>
                </Grid>
                <Grid item xs={12} alignContent>
                  <Button size='large' variant="contained" onClick={ clearResults } fullWidth >Clear</Button>
                </Grid>
            </Grid>
 

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
