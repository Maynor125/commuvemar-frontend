'use client'

import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
  
    return (
      <TextField
      sx={{width:'55%'}}
        placeholder="Search here..."
        variant="outlined"
        size='small'
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }}/>,
        }}
        onChange={handleInputChange}
      />
    );
  };
  
  export default SearchInput;