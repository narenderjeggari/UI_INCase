import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

const generateCurrentWeekEvents = () => {
  const startOfWeek = moment().startOf('week');

  const events = [
    { title: 'Jack Smith', start: startOfWeek.clone().add(1, 'days').hour(8).minute(30).second(0).format(), end: startOfWeek.clone().add(1, 'days').hour(9).minute(30).second(0).format(), color: '#dcebf7', textColor: '#000000' },
    { title: 'David Sample', start: startOfWeek.clone().add(1, 'days').hour(9).minute(30).second(0).format(), end: startOfWeek.clone().add(1, 'days').hour(10).minute(30).second(0).format(), color: '#e9e7e9', textColor: '#000000' },
    { title: 'Peter Penn', start: startOfWeek.clone().add(1, 'days').hour(10).minute(30).second(0).format(), end: startOfWeek.clone().add(1, 'days').hour(11).minute(30).second(0).format(), color: '#dcebf7', textColor: '#000000'  },
    { title: 'Training: Tools and Resources for Job Referrals', start: startOfWeek.clone().add(1, 'days').format(), end: startOfWeek.clone().add(1, 'days').format(), color: '#fbe3d6', textColor: '#000000' },
    { title: 'Frank Tiles', start: startOfWeek.clone().add(1, 'days').hour(14).minute(0).second(0).format(), end: startOfWeek.clone().add(1, 'days').hour(15).minute(0).second(0).format() },
    { title: 'Robert Mason', start: startOfWeek.clone().add(1, 'days').hour(15).minute(0).second(0).format(), end: startOfWeek.clone().add(1, 'days').hour(16).minute(0).second(0).format() },
    { title: 'Lily Shepard', start: startOfWeek.clone().add(2, 'days').hour(8).minute(0).second(0).format(), end: startOfWeek.clone().add(2, 'days').hour(9).minute(0).second(0).format() },
    { title: 'John Marks', start: startOfWeek.clone().add(2, 'days').hour(9).minute(0).second(0).format(), end: startOfWeek.clone().add(2, 'days').hour(10).minute(0).second(0).format() },
    { title: 'Jane Cohen', start: startOfWeek.clone().add(2, 'days').hour(10).minute(0).second(0).format(), end: startOfWeek.clone().add(2, 'days').hour(11).minute(0).second(0).format() },
    { title: 'Doug Blazer', start: startOfWeek.clone().add(2, 'days').hour(13).minute(45).second(0).format(), end: startOfWeek.clone().add(2, 'days').hour(15).minute(0).second(0).format() },
    { title: 'Marla Grace', start: startOfWeek.clone().add(2, 'days').hour(15).minute(0).second(0).format(), end: startOfWeek.clone().add(2, 'days').hour(16).minute(0).second(0).format() },
    { title: 'Elisa Testa', start: startOfWeek.clone().add(3, 'days').hour(8).minute(0).second(0).format(), end: startOfWeek.clone().add(3, 'days').hour(9).minute(0).second(0).format() },
    { title: 'Matt White', start: startOfWeek.clone().add(3, 'days').hour(10).minute(0).second(0).format(), end: startOfWeek.clone().add(3, 'days').hour(11).minute(0).second(0).format() },
    { title: 'AVAILABLE', start: startOfWeek.clone().add(3, 'days').hour(9).minute(0).second(0).format(), end: startOfWeek.clone().add(3, 'days').hour(10).minute(0).second(0).format(), color: 'red' },
    { title: 'Holiday', start: startOfWeek.clone().add(5, 'days').hour(8).minute(0).second(0).format(), end: startOfWeek.clone().add(5, 'days').hour(17).minute(0).second(0).format(), color: '#fbe3d6', textColor: '#000000' },
    { title: 'Time off', start: startOfWeek.clone().add(4, 'days').hour(8).minute(0).second(0).format(), end: startOfWeek.clone().add(4, 'days').hour(17).minute(0).second(0).format(), color: '#cdcbcd', textColor: '#000000' },
  ];

  return events;
};

const InterviewMode = () => {
  const [currentWeekEvents, setCurrentWeekEvents] = useState([]);

  useEffect(() => {
    setCurrentWeekEvents(generateCurrentWeekEvents());
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', margin: '16px' }}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        initialDate={moment().startOf('week').format('YYYY-MM-DD')}
        events={currentWeekEvents}
        slotMinTime="08:00:00"
        slotMaxTime="16:00:00"
        allDaySlot={false}
        height="auto"
        weekends={false}
      />
    </div>
  );
};

export default InterviewMode;