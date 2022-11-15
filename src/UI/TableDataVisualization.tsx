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
import { ArtistDefinition } from '../utils/definitions';

interface TableDataVisualizationProps{
    artistList: Array<ArtistDefinition>;
    countTotalArtist: number;
}

const TableDataVisualization:FC<TableDataVisualizationProps> = (props:TableDataVisualizationProps) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Artists Table Visualization ({props.artistList.length}/{props.countTotalArtist})</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper} sx={{ maxHeight: 450, overflow: 'auto'}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Artist Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Country</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.artistList.map((artist: ArtistDefinition, i: number) => (
                        <TableRow key={artist.id + "-" + i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {i}
                            </TableCell>
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
                            <TableCell component="th" scope="row">
                                {artist.area ? artist.area.name : artist.country} ({artist.country})
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