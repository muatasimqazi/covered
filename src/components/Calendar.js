/* eslint-disable no-unused-vars */
import React from 'react';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from './MyLittleCalendar';// 'react-big-calendar';//
import moment from 'moment';
import PaperCard from './PaperCard';
import { dataStore } from './../DataStore';
import { observer } from 'mobx-react';

moment.locale('en-GB');
// BigCalendar.momentLocalizer(moment);

function verifyDate(date) {
  // date is date of calendar square being clicked. It is midnight on that date.
  const now = new Date();
  const currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // currDate is midnight of today's date
  
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
@observer
class Calendar extends React.Component {
  render() {
    return (
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
  }
}

export default Calendar;
