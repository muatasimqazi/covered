/* eslint-disable no-unused-vars */
import React from 'react';
import events from './events';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PaperCard from './PaperCard';
moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])

const style = {
  height: '80vh',
}
const Calendar = () => (
  <BigCalendar
    style={style}
    events={events}
    step={60}
    views={allViews}
    defaultDate={new Date(2015, 3, 1)}
  />

);

export default Calendar;
