import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CalendarView = () => {
  const createData = (time, monday, tuesday, wednesday, thursday, friday) => {
    return { time, monday, tuesday, wednesday, thursday, friday };
  };

  const rows = [
    createData('8:00 am', 'Jack Smith', 'Lily Shepard', 'Elisa Testa', 'State Holiday', 'Time off'),
    createData('9:00 am', 'David Sample', 'John Marks', 'AVAILABLE', 'State Holiday', 'Time off'),
    createData('10:00 am', 'Peter Penn', 'Jane Cohen', 'Matt White', 'State Holiday', 'Time off'),
    createData('11:00 am', '', '', '', 'State Holiday', 'Time off'),
    createData('12:00 pm', '', '', '', 'State Holiday', 'Time off'),
    createData('1:00 pm', 'Training: Tools and Resources for Job Referrals', '', '', 'State Holiday', 'Time off'),
    createData('2:00 pm', 'Frank Tiles', 'Doug Blazer', '', 'State Holiday', 'Time off'),
    createData('3:00 pm', 'Robert Mason', 'Marla Grace', '', 'State Holiday', 'Time off'),
    createData('4:00 pm', '', 'Joe Grand', '', 'State Holiday', 'Time off')
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Monday – 7/1</TableCell>
            <TableCell>Tuesday – 7/2</TableCell>
            <TableCell>Wednesday – 7/3</TableCell>
            <TableCell>Thursday – 7/4</TableCell>
            <TableCell>Friday – 7/5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.time}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.monday}</TableCell>
              <TableCell>{row.tuesday}</TableCell>
              <TableCell>{row.wednesday}</TableCell>
              <TableCell>{row.thursday}</TableCell>
              <TableCell>{row.friday}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CalendarView;
