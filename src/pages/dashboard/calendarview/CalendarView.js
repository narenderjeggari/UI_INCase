import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const ScheduleContainer = styled(Paper)({
  padding: '16px',
  margin: '16px 0',
});

const TimeSlot = styled(Paper)(({ bgColor, height, colspan }) => ({
  padding: '8px',
  margin: '4px 0',
  backgroundColor: bgColor || '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: height,
  gridColumn: colspan ? `span ${colspan}` : undefined,
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

// Utility functions
const calculateRowSpan = (start, end) => {
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

  return Math.ceil((endInMinutes - startInMinutes) / 60); // Calculate rowspan in hours
};

const preprocessScheduleData = (scheduleData) => {
  const processedData = scheduleData.map(day => {
    const timeSlots = {};
    day.slots.forEach(slot => {
      const key = `${slot.label}-${slot.start}-${slot.end}`;
      if (!timeSlots[key]) {
        timeSlots[key] = { ...slot, rowspan: calculateRowSpan(slot.start, slot.end) };
      }
    });
    return { day: day.day, slots: Object.values(timeSlots) };
  });

  // Handle column spans for full-week meetings
  const fullWeekMeetings = [];
  for (const day of scheduleData) {
    for (const slot of day.slots) {
      if (slot.colspan) {
        fullWeekMeetings.push(slot);
      }
    }
  }

  if (fullWeekMeetings.length > 0) {
    for (const meeting of fullWeekMeetings) {
      processedData.forEach(day => {
        day.slots.push({
          ...meeting,
          colspan: scheduleData.length
        });
      });
    }
  }

  return processedData;
};

const generateTimeSlots = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'am' : 'pm';
    times.push(`${hour}:00 ${period}`);
  }
  return times;
};

// Main component
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

  const processedData = preprocessScheduleData(scheduleData);

  return (
    <Container>
      <ScheduleContainer>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <HeaderSlot>Time</HeaderSlot>
            {generateTimeSlots().map(time => (
              <HeaderSlot key={time}>{time}</HeaderSlot>
            ))}
          </Grid>
          {processedData.map((day, index) => (
            <Grid item xs={2} key={index}>
              <HeaderSlot>{day.day}</HeaderSlot>
              {day.slots.map((slot, idx) => (
                <TimeSlot
                  key={idx}
                  bgColor={slot.bgColor}
                  style={{ gridRow: `span ${slot.rowspan}`, gridColumn: slot.colspan ? `span ${slot.colspan}` : undefined }}
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
