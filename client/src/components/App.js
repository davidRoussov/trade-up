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
        <select>
          <option value="NewSouthWales">New South Wales</option>
          <option value="Queensland">Queensland</option>
          <option value="SouthAustralia">South Australia</option>
          <option value="Tasmani">Tasmaniudi</option>
          <option value="Victoria">Victoria</option>
          <option value="WesternAustrlia ">Western Austrlia</option>
        </select>
        <form>
          <label>
            <input type="checkbox" name="friday" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default App;
