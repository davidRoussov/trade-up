import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';
import '../bootstrap.css';

class App extends Component {
  componentDidMount() {
    const data = {
      resource_id: '31eec35e-1de6-4f04-9703-9be1d43d405b'
    };
    $.ajax({
      url: 'http://data.gov.au/api/action/datastore_search',
      data: data,
      success: data => {
        this.setState({ holidayData: data });
        this.displayCalendar();
      },
      error: error => console.log(error)
    });
  }

  displayCalendar() {
    $('#calendar').fullCalendar({});
    $('.fc-next-button').click(() => this.colorHolidays());
    $('.fc-prev-button').click(() => this.colorHolidays());
  }

  colorHolidays() {
    $('td[data-date]').each(function() {
      $(this).css('background-color', 'transparent');
    });

    const relevantHolidays = this.state.holidayData.result.records.filter(holiday => holiday.ApplicableTo.includes(this.state.currentState)); 
    $('td[data-date]').each(function() {
      const tdDate = $(this).attr('data-date');
      const formatted = tdDate.slice(0, 4) + tdDate.slice(5, 7) + tdDate.slice(8, 10);
      const isDayHoliday = relevantHolidays.filter(holiday => holiday.Date === formatted).length;
      if (isDayHoliday) $(this).css('background-color', '#89C4F4');
    });
  }

  chooseState(e) {
    this.setState({ currentState: $(e.target).val() }, () => this.colorHolidays());
  }

  render() {
    return (
      <div style={{padding: '40px'}}>
        <div id='calendar'></div>
        <select onChange={this.chooseState.bind(this)}>
          <option value="blank">Select a State</option>
          <option value="NSW">New South Wales</option>
          <option value="QLD">Queensland</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmania</option>
          <option value="VIC">Victoria</option>
          <option value="WA ">Western Austrlia</option>
          <option value="NT ">Northern Territory</option>
          <option value="ACT">Australian Captial Territory</option>
        </select>
        <form>
          <label>
            <input type="checkbox" name="friday" />Friday
            <input type="checkbox" name="saturday" />Saturday
            <input type="checkbox" name="sunday" />Sunday
          </label>
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
    )
  }
}

export default App;