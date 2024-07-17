import React from 'react';
import { TableCell, TableRow, Checkbox, Box } from '@mui/material';

const CaseModeTableRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <span>{row.claimant}</span>
          <span>{row.claimantId}</span>
        </Box>
      </TableCell>
      <TableCell>{row.bye}</TableCell>
      <TableCell>{row.stage}</TableCell>
      <TableCell sx={{ color: row.statusColor }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <span>{row.status}</span>
          <span>{row.statusNumber}</span>
        </Box>
      </TableCell>
      <TableCell>{row.weeks}</TableCell>
      <TableCell sx={{ color: row.followUpColor }}>{row.followUp}</TableCell>
      <TableCell sx={{ color: row.indicatorColor }}>{row.indicators}</TableCell>
    </TableRow>
  );
};

export default CaseModeTableRow;
