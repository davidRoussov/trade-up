import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import calendarStyle from '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

class App extends Component {
  constructor() {
    super();
    BigCalendar.momentLocalizer(moment);
  }

  render() {
    return (
      <div style={{padding: '40px'}}>
        <BigCalendar
          events={[]}
          startAccessor='startDate'
          endAccessor='endDate'
          style={{height: '800px'}}
        />
      </div>
    )
  }
}

export default App;