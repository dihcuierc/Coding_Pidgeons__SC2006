import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import './SearchBar.css';


export default function SearchBar(props) {
    return (
        <TextField
        label={props.placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon style={{fill: "white"}}/>
              </IconButton>
            </InputAdornment>
          ),
          className: props.className,
        }}
        InputLabelProps={{
            style: { color: '#fff' }
        }}
      />
    );
}