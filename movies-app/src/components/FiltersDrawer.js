import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getAll } from '../services/brastlewark';
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
import { useDispatch } from 'react-redux'
import { brastlewarkFilterAge } from '../store/brastlewark/actions'
import { brastlewarkFilterByName } from '../store/brastlewark/actions'
import { brastlewarkInit } from '../store/brastlewark/actions'
import SelectHairColor from '../components/SelectHairColor'
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
  const [minAge, setminAge] = React.useState('')
  const [name, setName] = React.useState('')
  const [maxAge, setmaxAge] = React.useState('')
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const filterByAge = ()=>{ 
    dispatch(brastlewarkFilterAge(minAge, maxAge))
  };
  const filterByName = (e)=> { 
    if (e.key === 'Enter') {
    if(name === '') { 
        getAll().then( data => {
          const brastlewarks = data.Brastlewark
          dispatch(brastlewarkInit(brastlewarks))
        }) 
      }
      else {
        dispatch(brastlewarkFilterByName(name))
      }
    }
  };
  const clearResults = ()=>{ 
    getAll().then( data => {
      const brastlewarks = data.Brastlewark
      dispatch(brastlewarkInit(brastlewarks))
    })
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
            <Typography variant="h6" noWrap component="div" sx={{mt:0.5}}>
              Brastlewarks
            </Typography>
          </div>

          <TextField name="name" onKeyUp={ filterByName } onChange={event => setName(event.target.value)} size="small" id="filled-basic" label="Search by name"  variant="filled"/>

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
            {/* Filter by age */}
              <Grid item xs={12} >
                <Typography gutterBottom variant="subtitle1" textAlign="left" component="div">
                  Age:
                </Typography>
              </Grid>  
              <Grid item xs={4}>
                <TextField name="minAge"   onChange={event => setminAge(event.target.value)} size="small" id="filled-basic" label="Min"/>
              </Grid>
              <Grid item xs={4}>
                <TextField name="maxAge"   onChange={event => setmaxAge(event.target.value)} size="small" id="filled-basic" label="Max"/>
              </Grid>
              <Grid item xs={4}>
                <IconButton onClick={ filterByAge } color="primary" style={{'height':'40px', marginTop: 'auto', marginBottom: 'auto'}} >
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
              {/* Filter by age hair color*/}
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1" textAlign="left" component="div">
                  Hair color:
                </Typography>
              </Grid>  
              <Grid item xs={12}>
                <SelectHairColor/>
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
