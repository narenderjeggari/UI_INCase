import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ScheduleContainer = styled(Paper)({
  padding: '16px',
  margin: '16px 0',
});

const TimeSlot = styled(Paper)(({ theme, bgColor, height }) => ({
  padding: '8px',
  margin: '4px 0',
  backgroundColor: bgColor || theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: height,
}));

const HeaderSlot = styled(Paper)(({ theme }) => ({
  padding: '8px',
  margin: '4px 0',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
}));

const calculateHeight = (start, end) => {
  const [startHour, startMinute, startPeriod] = start.split(/[: ]/);
  const [endHour, endMinute, endPeriod] = end.split(/[: ]/);

  let startInMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
  let endInMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

  if (startPeriod.toLowerCase() === 'pm' && parseInt(startHour) !== 12) {
    startInMinutes += 12 * 60;
  }

  if (endPeriod.toLowerCase() === 'pm' && parseInt(endHour) !== 12) {
    endInMinutes += 12 * 60;
  }

  return (endInMinutes - startInMinutes) * 1.5; // 1.5px per minute
};

const CalendarView = () => {
  const scheduleData = [
    {
      day: 'Monday - 7/1',
      slots: [
        { start: '8:30 am', end: '9:30 am', label: 'Jack Smith', bgColor: '#e0e0e0' },
        { start: '9:30 am', end: '10:30 am', label: 'David Sample', bgColor: '#e0e0e0' },
        { start: '10:30 am', end: '11:00 am', label: 'Peter Penn', bgColor: '#bbdefb' },
        { start: '12:00 pm', end: '1:00 pm', label: 'Training: Tools and Resources for Job Referrals', bgColor: '#ffe0b2' },
        { start: '2:00 pm', end: '3:00 pm', label: 'Frank Tiles', bgColor: '#e0e0e0' },
        { start: '3:00 pm', end: '4:00 pm', label: 'Robert Mason', bgColor: '#e0e0e0' },
      ]
    },
    {
      day: 'Tuesday - 7/2',
      slots: [
        { start: '8:00 am', end: '9:00 am', label: 'Lily Shepard', bgColor: '#e0e0e0' },
        { start: '9:00 am', end: '10:00 am', label: 'John Marks', bgColor: '#e0e0e0' },
        { start: '10:00 am', end: '11:00 am', label: 'Jane Cohen', bgColor: '#c8e6c9' },
        { start: '12:00 pm', end: '1:00 pm', label: 'Training: Tools and Resources for Job Referrals', bgColor: '#ffe0b2' },
        { start: '2:00 pm', end: '3:00 pm', label: 'Doug Blazer', bgColor: '#e0e0e0' },
        { start: '3:00 pm', end: '4:00 pm', label: 'Marla Grace', bgColor: '#c8e6c9' },
        { start: '4:00 pm', end: '5:00 pm', label: 'Joe Grand', bgColor: '#c8e6c9' },
      ]
    },
    {
      day: 'Wednesday - 7/3',
      slots: [
        { start: '8:00 am', end: '9:00 am', label: 'Elisa Testa', bgColor: '#e0e0e0' },
        { start: '9:00 am', end: '10:00 am', label: 'AVAILABLE', bgColor: '#ffebee' },
        { start: '10:00 am', end: '11:00 am', label: 'Matt White', bgColor: '#e0e0e0' },
        { start: '11:00 am', end: '12:00 pm', label: 'Time Off', bgColor: '#e0e0e0' }
      ]
    },
    {
      day: 'Thursday - 7/4',
      slots: [
        { start: '8:00 am', end: '5:00 pm', label: 'State Holiday', bgColor: '#d3d3d3', colspan: true }
      ]
    },
    {
      day: 'Friday - 7/5',
      slots: [
        { start: '8:00 am', end: '5:00 pm', label: 'Time Off', bgColor: '#ffe0b2', colspan: true }
      ]
    },
  ];

  return (
    <Container>
      <ScheduleContainer>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <HeaderSlot>Time</HeaderSlot>
            {['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'].map(time => (
              <HeaderSlot key={time}>{time}</HeaderSlot>
            ))}
          </Grid>
          {scheduleData.map((day, index) => (
            <Grid item xs={2} key={index}>
              <HeaderSlot>{day.day}</HeaderSlot>
              {day.slots.map((slot, idx) => (
                <TimeSlot
                  key={idx}
                  bgColor={slot.bgColor}
                  height={`${calculateHeight(slot.start, slot.end)}px`}
                >
                  {slot.label}
                </TimeSlot>
              ))}
            </Grid>
          ))}
        </Grid>
      </ScheduleContainer>
    </Container>
  );
};

export default CalendarView;
