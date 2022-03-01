import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux'
import { MoviesByStudioAction } from '../store/movies/actions'

export default function SelectFilterByStudio( props ) {
  const dispatch = useDispatch()
  const studios = useSelector( state => state.studios);
  

  const filterByStudio = (e)=>{ 
    props.clear().then(()=>{
      props.setSelectedStudio(e.target.value)
      dispatch(MoviesByStudioAction(e.target.value))      
    })
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Studios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectedStudio}
          label="Studios"
          onChange={filterByStudio}
        >
          {
            studios.map((item, index)=>(
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}
