import React from "react";
import { Box, Grid } from '@mui/material';
// import NavBar from "./navbar/NavBar";
import PerformanceMetrics from "./performancemetrics/PerformanceMetrics";
// import CaseloadMetrics from "./caseloadmetrics/CaseloadMetrics";
import CalendarView from "./calendarview/CalendarView";

const Dashboard = () => {
  return (
    <Box >
      <Grid container sx={{ border: '2px solid #000' }}>
        <Grid item xs={12} sm={4} xl={3}>
          <PerformanceMetrics />
        </Grid>
        <Grid item xs={12} sm={8} xl={9} >
          {/* <Box style={{ maxHeight: '100%', overflow: 'auto' }}> */}
            {/* <CaseloadMetrics />*/}
            <CalendarView />
          {/* </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;