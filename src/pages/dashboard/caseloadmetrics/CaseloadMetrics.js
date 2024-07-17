import React, { useCallback, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    MenuItem,
    Select,
    Typography,
    Link,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderRight: '2px solid #000000',
    textAlign: 'center',
    padding: '8px',
}));

const ContentCell = styled(TableCell)(({ theme }) => ({
    color: '#000000',
    fontWeight: 600,
    borderRight: '2px solid #000000',
    textAlign: 'center',
    padding: '8px',
}));

const CaseloadMetrics = React.memo(({ showCalendarView, onSwitchView }) => {
    const [items, setItems] = useState('my-items');
    const handleSwitchView = useCallback(
        (event) => {
            event.preventDefault();
            onSwitchView(event);
        },
        [onSwitchView]
    );

    const handleItemsSelection = (event) => {
        setItems(event.target.value);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" component="div" color="#5fa0cf" fontWeight={600} width={200}>
                    Caseload Metrics:
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400, border: '2px solid #000000' }} aria-label="caseload metrics table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>First 1-on-1</StyledTableCell>
                                <StyledTableCell>Second 1-on-1</StyledTableCell>
                                <StyledTableCell>Third 1-on-1</StyledTableCell>
                                <StyledTableCell>Follow-ups</StyledTableCell>
                                <StyledTableCell>HI Priority</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <ContentCell>30</ContentCell>
                                <ContentCell>20</ContentCell>
                                <ContentCell>16</ContentCell>
                                <ContentCell sx={{ color: 'orange' }}>12</ContentCell>
                                <ContentCell sx={{ color: 'red' }}>7</ContentCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <RadioGroup row aria-label="caseload view" value={items} onChange={handleItemsSelection}>
                    <FormControlLabel value="my-items" control={<Radio />} label="My Items" />
                    <FormControlLabel
                        value="items-assigned"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                Items assigned to
                                <Select
                                    variant="outlined"
                                    sx={{ ml: 1 }}
                                    defaultValue=""
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {/* Add your options here */}
                                </Select>
                            </Box>
                        }
                    />
                </RadioGroup>
                <Link
                    href="#"
                    underline="always"
                    color="#0072ce"
                    fontSize="14px"
                    onClick={handleSwitchView}
                >
                    {showCalendarView ? 'Switch Caseload mode view' : 'Switch to Interview Calendar View'}
                </Link>
            </Stack>
            {!showCalendarView && <Stack direction="row" justifyContent="flex-end">
                <Box component={'span'} sx={{ color: '#5fa0cf', fontSize: '16px' }}>First 1-on-1s</Box>
            </Stack>}

        </Box>
    );
});

export default CaseloadMetrics;
