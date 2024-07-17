import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from '@mui/material';
import CaseModeTableRow from './CaseModeTableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  borderRight: '2px solid #000000',
  textAlign: 'center',
  padding: '8px',
}));

const CaseModeView = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([
      { claimant: 'Karen Grey', claimantId: 2094, bye: '5/17/2025', stage: 'First 1-on-1', status: 'Failed – Issue?', statusNumber: '6/28', weeks: 12, followUp: '', indicators: '', statusColor: 'red', followUpColor: '', indicatorColor: '' },
      { claimant: 'David Sample', claimantId: 1122, bye: '6/7/2025', stage: 'First 1-on-1', status: 'Completed', statusNumber: '7/1', weeks: 4, followUp: '7/9/2024', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
      { claimant: 'Frank Tiles', claimantId: 2134, bye: '5/31/2025', stage: 'First 1-on-1', status: 'Failed – RTW?', statusNumber: '7/1', weeks: 4, followUp: '', indicators: '', statusColor: 'red', followUpColor: '', indicatorColor: '' },
      { claimant: 'Gary Manning', claimantId: 4509, bye: '5/24/2025', stage: 'First 1-on-1', status: 'SCHEDULE', statusNumber: '7/2', weeks: 10, followUp: '7/2/2024', indicators: 'HI', statusColor: 'red', followUpColor: 'red', indicatorColor: 'red' },
      { claimant: 'Lily Shepard', claimantId: 4785, bye: '6/7/2025', stage: 'First 1-on-1', status: 'Scheduled', statusNumber: '7/2', weeks: 5, followUp: '', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
      { claimant: 'John Marks', claimantId: 9456, bye: '6/14/2025', stage: 'First 1-on-1', status: 'Scheduled', statusNumber: '7/2', weeks: 4, followUp: '', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
      { claimant: 'Rick Woods', claimantId: 5043, bye: '5/31/2025', stage: 'First 1-on-1', status: 'Rescheduled (1)', statusNumber: '7/8', weeks: 5, followUp: '', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
      { claimant: 'Linda Thomas', claimantId: 5093, bye: '6/14/2025', stage: 'First 1-on-1', status: 'Rescheduled (F)', statusNumber: '7/8', weeks: 4, followUp: '', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
      { claimant: 'Daisy Smith', claimantId: 7356, bye: '6/21/2025', stage: 'First 1-on-1', status: 'Scheduled', statusNumber: '7/9', weeks: 4, followUp: '', indicators: '', statusColor: '', followUpColor: '', indicatorColor: '' },
    ])
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Claimant</StyledTableCell>
              <StyledTableCell>BYE</StyledTableCell>
              <StyledTableCell>Stage</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell># Weeks</StyledTableCell>
              <StyledTableCell>Follow-up</StyledTableCell>
              <StyledTableCell>Indicators</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <CaseModeTableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseModeView;
