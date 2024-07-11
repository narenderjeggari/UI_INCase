import React from "react";
import { Box, Grid } from '@mui/material';
import NavBar from "./navbar/NavBar";
import PerformanceMetrics from "./performancemetrics/PerformanceMetrics";
// import CaseloadMetrics from "./caseloadmetrics/CaseloadMetrics";
// import CalendarView from "./calendarview/CalendarView";

const Dashboard = () => {
    return (
      <Box sx={{ flexGrow: 1 }} width={1} height={1}>
        <NavBar />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12} sm={4} xl={3}>
            <PerformanceMetrics />
          </Grid>
          <Grid item xs={12} sm={8} xl={9}>
            {/* <CaseloadMetrics />
            <CalendarView /> */}
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default Dashboard;