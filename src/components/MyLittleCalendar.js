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
    const weeks = this.generateWeeks(year, month);
    this.state = {
      weeks, month, year
    };
  }
  handleClick = (e) => {
    let d;
    if (e.target.name === 'today') {
      d = new Date();
    } else if (e.target.name === 'prev') {
      d = new Date(this.state.year, this.state.month - 2, 1);
    } else if (e.target.name === 'next') {
      d = new Date(this.state.year, this.state.month + 0, 1);
    }
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    this.setState({
      year,
      month,
      weeks: this.generateWeeks(year, month)
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
        const date = currentDay.getDate();
        const isOffRange = currentDay < firstOfMonth || currentDay >= firstOfNextMonth;
        const isToday = currentDay.getFullYear() === today.getFullYear()
                      && currentDay.getMonth() === today.getMonth()
                      && currentDay.getDate() === today.getDate()
                      && !isOffRange;
        const yyyymmdd = (currentDay.getFullYear() * 10000 + (currentDay.getMonth() + 1 ) * 100 + currentDay.getDate()).toString();

        let nScheduled = 0;
        dataStore.employeesArray.forEach(emp => {
          if (emp.shifts[yyyymmdd]) {
            ++nScheduled;
          }
        });
        week.push({ 
          date,
          yyyymmdd,
          isOffRange,
          isToday,
          nScheduled,
          nNeeded: i === 0 || i === 6 ? 2 : 2
        });
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }
  render() {
    function addColors(classes, day) {
      if (day.nScheduled < day.nNeeded * 0.50) {
        classes.push('rbc-red');
      } else if (day.nScheduled < day.nNeeded) {
        classes.push('rbc-yellow');
      } else if (day.nScheduled === day.nNeeded) {
        classes.push('rbc-green');
      } else {
        classes.push('rbc-blue');
      }
    }
    const rowBgClass = (day) => {
      const result = ['rbc-day-bg'];
      if (day.isOffRange) {
        result.push('rbc-off-range-bg');
      }
      if (day.isToday) {
        result.push('rbc-today');
      }
      addColors(result, day);
      return result.join(' ');
    }
    const rbcEventClass = (day) => {
      const result = ['rbc-event', 'rbc-event-allday'];
      addColors(result, day);
      return result.join(' ');
    }
    const dayText = (day) => {
      return day.nScheduled + '/' + day.nNeeded;
    }
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div className="rbc-calendar" style={{height: '80vh', cursor: 'pointer'}}>
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
            {dayNames.map(dayName =>
              <div className="rbc-header" style={{flexBasis: "14.2857%", maxWidth: '14.2857%'}}>
                <span>{dayName}</span>
              </div>
            )}
          </div>
          {this.state.weeks.map(week => 
            <div className="rbc-month-row">
              <div className="rbc-row-bg">
                {week.map(day =>
                  <div className={rowBgClass(day)} style={{flexBasis: "14.2857%", maxWidth: '14.2857%'}}>
                  </div>
                )}
              </div>
              <div className="rbc-row-content">
                <div className="rbc-row">
                  {week.map(day =>
                    <div className={`rbc-date-cell ${day.isOffRange ? 'rbc-off-range-bg' : ''} ${day.isToday ? 'rbc-now rbc-current' : ''}`} style={{flexBasis: "14.2857%", maxWidth: '14.2857%'}}>
                      <a>{day.date}</a>
                    </div>
                  )}
                </div>
                <div className="rbc-row-content">
                  <div className="rbc-row">
                    {week.map(day =>
                      <div className='rbc-row-segment' style={{flexBasis: "14.2857%", maxWidth: '14.2857%'}}>
                        {day.nNeeded > 0 &&
                          <div className={rbcEventClass(day)}>
                            <div className="rbc-event-content" title="">{dayText(day)}</div>
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