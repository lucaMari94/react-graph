import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, FormEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArtistDefinition } from '../App';

interface TableDataVisualizationProps{
    areaValue:string;
    artistList: Array<ArtistDefinition>;
}

const TableDataVisualization:FC<TableDataVisualizationProps> = (props:TableDataVisualizationProps) => {

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Data Visualization ({props.artistList.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper} sx={{ maxHeight: 450, overflow: 'auto'}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Artist Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Score</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.artistList.map((artist) => (
                        <TableRow key={artist.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {artist.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {artist.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {artist.type}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {artist.gender ? artist.gender : '-'}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {artist.score}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TableDataVisualization;