import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import React from 'react';

interface SearchAppBarProps{}

export const SearchAppBar : FC<SearchAppBarProps> = (props:SearchAppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MusicBrainz Dataset
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
