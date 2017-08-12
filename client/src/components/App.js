import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';

class App extends Component {
  componentDidMount() {
    $('#calendar').fullCalendar({});
  }

  render() {
    return (
      <div style={{padding: '40px'}}>
        <div id='calendar'></div>
      </div>
    )
  }
}

export default App;