/*

MyLittleCalendar is a very barebones calendar component that bears a superficial
resemblance to react-big-calendar but has almost none of the functionality.

The one advantage of MLC over rbc is that we can color the day squares.

The main data structure is the weeks array, which is an array of 4 or 5
(depending on the month) week arrays. Each week array is an array of 7
days. Each day contains its date (year, month, date), the number of
employees scheduled to work that day, and the number of employees needed
that day. Those two numbers determine the color of the day's
square on the calendar. The text in the square depends on whether
the current user is an employee or a supervisor.

N.B. Although JavaScript date functions treat months as 0-based, I store
all month information as 1-based (i.e., 1 = January).

*/

import React from 'react';
import { dataStore } from '../DataStore';
import { observer } from 'mobx-react';

@observer
class MyLittleCalendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    this.state = {
      month, 
      year,
      clickedYyyymmdd: (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()).toString()
    };
  }
  handleClick = (e) => {
    let d;
    if (e.target.name === 'today') {
      d = new Date();
    } else if (e.target.name === 'prev') {
      const today = new Date();
      if (today.getFullYear() === this.state.year && today.getMonth() + 1 === this.state.month) {
        return; // If displaying the present month, ignore 'prev' click.
      }
      d = new Date(this.state.year, this.state.month - 2, 1);
    } else if (e.target.name === 'next') {
      d = new Date(this.state.year, this.state.month + 0, 1);
    }
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    this.setState({
      month,
      year
    });
  }
  generateWeeks(year, month) {
    const weeks = [];
    const today = new Date();
    const firstOfMonth = new Date(year, month - 1, 1);
    const firstOfNextMonth = new Date(year, month, 1);
    const startOfMonth = new Date(year, month - 1, 1 - firstOfMonth.getDay());
    // startOfMonth is the first day shown on the calendar
    let currentDay = startOfMonth;

    while (currentDay < firstOfNextMonth) {
      const week = [];
      for (let i = 0; i < 7; ++i) {
        const year = currentDay.getFullYear();
        const month = currentDay.getMonth() + 1;
        const date = currentDay.getDate();
        const isOffRange = currentDay < firstOfMonth || currentDay >= firstOfNextMonth;
        const isToday = year === today.getFullYear()
          && month === today.getMonth() + 1
          && date === today.getDate()
          && !isOffRange;
        const yyyymmdd = (year * 10000 + month * 100 + date).toString();

        let nScheduled = 0;
        dataStore.employeesArray.forEach(emp => {
          if (emp.shifts && emp.shifts[yyyymmdd]) {
            ++nScheduled;
          }
        });

        const nNeeded = dataStore.coverageObject[yyyymmdd] || 0; // num of emps needed for this day
        const userIsSupervisor = dataStore.currentUser.role === 'supervisor';
        let text = '';
        
        if (userIsSupervisor) {
          text = nNeeded ? `${Math.round(nScheduled / nNeeded * 100)}% coverage` : '';
        }
        else {
          const shift = dataStore.currentUser.shifts &&  dataStore.currentUser.shifts[yyyymmdd];
          if (shift) {
            function formatTime(timeEntry) {
              let entryArr = timeEntry.split(":");
              // format hour as number in order to use comparison operators
              entryArr[0] = +entryArr[0];

              if (entryArr[0] === 0) {
                return `${12}:${entryArr[1]}am`;
              } else if(entryArr[0] <= 11) {
                return `${entryArr[0]}:${entryArr[1]}am`;
              } else if (entryArr[0] === 12) {
                return `${entryArr[0]}:${entryArr[1]}pm`
              } else {
                return `${entryArr[0] - 12}:${entryArr[1]}pm`;
              }
              
            }

            text = `${formatTime(shift.shiftStart)} - ${formatTime(shift.shiftEnd)}`;
          }
        }

        const isBeforeToday = yyyymmdd < (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()).toString();

        if (isBeforeToday) {
          text = '';
        }
        week.push({
          year,
          month,
          date,
          yyyymmdd,
          isOffRange,
          isToday,
          isBeforeToday,
          nScheduled,
          nNeeded,                      
          text,
          userIsSupervisor
        });
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }
  handleCalendarClick = (day) => {
    if (day.isBeforeToday) {
      return;
    }
    this.setState({
      clickedYyyymmdd: day.yyyymmdd
    });
    
    // Here we fake the onSelectSlot event of react-big-calendar
    const slots = [];

    slots.push(new Date(day.year, day.month - 1, day.date));
    this.props.onSelectSlot({ slots });
  }
  render() {
    function addColors(classes, day) {
      if (day.isBeforeToday) {
        // no color
      } else if (day.nNeeded === 0) {
        // no color
      } else if (day.nScheduled < day.nNeeded * 0.50) {
        classes.push('rbc-red');
      } else if (day.nScheduled < day.nNeeded) {
        classes.push('rbc-yellow');
      } else if (day.nScheduled === day.nNeeded) {
        classes.push('rbc-green');
      } else {
        classes.push('rbc-blue');
      }
    }
    const rbcDayBgClass = (day) => {
      const result = ['rbc-day-bg'];
      if (day.isOffRange) {
        result.push('rbc-off-range-bg');
      }
      if (day.isToday) {
        result.push('rbc-today');
      }
      if (day.yyyymmdd === this.state.clickedYyyymmdd) {
        result.push('rbc-clicked');
      }
      addColors(result, day);
      return result.join(' ');
    }
    const rbcEventClass = (day) => {
      const result = ['rbc-event', 'rbc-event-allday'];
      if (day.userIsSupervisor) {
        addColors(result, day);
      } 
      return result.join(' ');
    }
    const rbcDateCellClass = (day) => {
      const result = ['rbc-date-cell'];
      if (day.isOffRange) {
        result.push('rbc-off-range-bg');
      }
      if (day.isToday) {
        result.push('rbc-now');  
        result.push('rbc-current');  
      }
      return result.join(' ');
    }
    const weeks = this.generateWeeks(this.state.year, this.state.month);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const stylin = { flexBasis: "14.2857%", maxWidth: '14.2857%' };

    return (
      <div className="rbc-calendar" style={{ height: '80vh', cursor: 'pointer' }}>
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            <button name="today" onClick={this.handleClick} type="button">Today</button>
            <button name="prev" onClick={this.handleClick} type="button">Prev</button>
            <button name="next" onClick={this.handleClick} type="button">Next</button>
          </span>
          <span className="rbc-toolbar-label">{monthNames[this.state.month - 1]} {this.state.year}</span>
          <span className="rbc-btn-group"></span>
        </div>
        <div className="rbc-month-view">
          <div className="rbc-row rbc-month-header">
            {dayNames.map((dayName, i) =>
              <div key={i} className="rbc-header" style={stylin}>
                <span>{dayName}</span>
              </div>
            )}
          </div>
          {weeks.map((week, i) =>
            <div className="rbc-month-row" key={i}>
              <div className="rbc-row-bg">
                {week.map((day, i) =>
                  <div
                    key={i}
                    className={rbcDayBgClass(day)}
                    onClick={() => this.handleCalendarClick(day)}
                    style={stylin}
                  >
                  </div>
                )}
              </div>
              <div className="rbc-row-content">
                <div className="rbc-row">
                  {week.map((day, i) =>
                    <div
                      key={i}
                      className={rbcDateCellClass(day)}
                      onClick={() => this.handleCalendarClick(day)}
                      style={stylin}
                    >
                      <a>{day.date}</a>
                    </div>
                  )}
                </div>
                <div className="rbc-row-content">
                  <div className="rbc-row">
                    {week.map((day, i) =>
                      <div
                        key={i}
                        className='rbc-row-segment'
                        onClick={() => this.handleCalendarClick(day)}
                        style={stylin}
                      >
                        {day.text &&
                          <div className={rbcEventClass(day)}>
                            <div className="rbc-event-content" title={day.text}>{day.text }</div>
                          </div>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyLittleCalendar;