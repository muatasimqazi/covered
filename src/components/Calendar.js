/* eslint-disable no-unused-vars */
import React from 'react';
import events from './events';
import BigCalendar from './MyLittleCalendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PaperCard from './PaperCard';
import { dataStore } from './../DataStore';


moment.locale('en-GB');
// BigCalendar.momentLocalizer(moment);

// provides today's date to the calendar 
function getCurrDate() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth()+1;
  let year = today.getFullYear();

  if(day < 10) {
    day = '0' + day;
  }

  if(month < 10) {
    month = '0'+month;
  }

  return `${year},${month},${day}`;
}

function verifyDate(date) {
  let currDate = new Date();
  if (date >= currDate) {
    return date;
  }  else {
    return dataStore.targetDate;
  }
}

const style = {
  height: '80vh',
  cursor: 'pointer'
}
const Calendar = () => (
  <BigCalendar
    selectable
    style={style}
    events={events}
    step={60}
    views={['month']}
    onSelectSlot={ event => dataStore.targetDate = verifyDate(event.slots[0])}
    defaultDate={new Date()}
  />

);

export default Calendar;
