import React, { useCallback, useState } from "react";
import { Box, Grid } from '@mui/material';
import PerformanceMetrics from "./performancemetrics/PerformanceMetrics";
import CaseloadMetrics from "./caseloadmetrics/CaseloadMetrics";
import CaseModeView from "./casemodeview/CaseModeView";
import InterviewMode from "./interviewmodeview/InterviewMode";

const Dashboard = () => {

  const [isCalendarView, setIsCalendarView] = useState(true);

  const handleSwitchView = useCallback(() => {
    setIsCalendarView((prev) => !prev);
  }, []);

  return (
    <Box sx={{ marginTop: '45px'}}>
      {/* <NavBar /> */}
      <Grid container sx={{ height: 'calc(100vh - 77px)', border: '2px solid #000' }}>
        <Grid item xs={12} sm={4} xl={3}>
          <PerformanceMetrics />
        </Grid>
        <Grid item xs={12} sm={8} xl={9} maxHeight={'100%'} overflow={'auto'}>
          <Box style={{ maxHeight: '100%', overflow: 'auto' }}>
            <CaseloadMetrics showCalendarView={isCalendarView} onSwitchView={handleSwitchView}/>
            { isCalendarView ? <InterviewMode /> : <CaseModeView />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;