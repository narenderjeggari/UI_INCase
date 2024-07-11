import React from 'react';
import { Typography, Button, Paper, Checkbox, FormControlLabel, TextField } from '@mui/material';


const CaseloadMetrics = () => (
    <Paper elevation={3} sx={{ padding: 2, margin: 1 }}>
        <Typography variant="h6" gutterBottom>
            Caseload Metrics
        </Typography>
        <Typography>1<sup>st</sup> 1-on-1: 30</Typography>
        <Typography>2<sup>nd</sup> 1-on-1: 20</Typography>
        <Typography>3<sup>rd</sup> 1-on-1: 16</Typography>
        <Typography>Follow-ups: 12</Typography>
        <Typography>HI Priority: 7</Typography>
        <FormControlLabel control={<Checkbox />} label="My Items" />
        <TextField label="Items assigned to:" variant="outlined" size="small" sx={{ marginLeft: 1 }} />
        <Button variant="text">Switch to Caseload mode view</Button>
    </Paper>
);

export default CaseloadMetrics;