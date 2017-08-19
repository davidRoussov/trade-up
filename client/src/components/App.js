import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';
import { Modal, Button } from 'react-bootstrap';

import EventAdd from './EventAdd';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

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
    $('#calendar').fullCalendar({
      dayClick: (date, event, view) => {
        const day = $(event.target);
        this.openModal(date);
        
        day.addClass('focus-day');
      }
    });
    $('.fc-next-button').click(() => this.addPublicHolidaysToCalendar());
    $('.fc-prev-button').click(() => this.addPublicHolidaysToCalendar());
  }

  addPublicHolidaysToCalendar() {
    // clear public holiday events
    const eventsClearedPublicHolidays = this.state.events.filter(event => event.type !== 'publicHoliday');
    this.setState({ events: eventsClearedPublicHolidays }, () => {
      
      // calculate public holidays relevant to state, add public-holiday class to particular day in calendar
      // and add a public holiday event to this.state.events
      const relevantHolidays = this.state.holidayData.result.records.filter(holiday => holiday.ApplicableTo.includes(this.state.currentState)); 
      const publicHolidayEvents = [];
      $('td[data-date]').each(function() {
        const tdDate = $(this).attr('data-date');
        const formatted = tdDate.slice(0, 4) + tdDate.slice(5, 7) + tdDate.slice(8, 10);
        const holiday = relevantHolidays.filter(holiday => holiday.Date === formatted);
        if (holiday.length ) {
          const holidayName = holiday[0].HolidayName;
          const holidayAlreadyAdded = publicHolidayEvents.filter(holiday => holiday.title === holidayName);
          if (!holidayAlreadyAdded.length) {
            // add public holiday events
            const holidayDate = holiday[0].Date;
            const fixedDate = holidayDate.slice(0, 4) + '-' + holidayDate.slice(4, 6) + '-' + holidayDate.slice(6, 8);
            publicHolidayEvents.push({
              title: holidayName,
              start: fixedDate,
              type: 'publicHoliday'
            });

            // $(this).addClass('public-holiday');
          }
        }
        else $(this).removeClass('public-holiday');
      });

      // set event state with new array of public holidays
      this.setState({ events: this.state.events.concat(publicHolidayEvents) }, () => {

        // rerender calendar's public holiday events
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', this.state.events);
      });  
    });
  }

  chooseState = (e) => this.setState({ currentState: $(e.target).val() }, () => this.addPublicHolidaysToCalendar());
  openModal = (date) => this.setState({ showEventAdd: true, currentDate: date });
  closeModal = () => this.setState({ showEventAdd: false });

  render() {
    const style = {
      container: {
        padding: '40px',
        display: 'flex'
      },
      options: {
        paddingRight: '40px'
      }
    };

    return (
      <div style={style.container}>
        <div id='options' style={style.options}>
          <label>Choose a state or territory</label>
          <select onChange={this.chooseState.bind(this)}>
            <option value="blank">Select a state or territory</option>
            <option value="NSW">New South Wales</option>
            <option value="QLD">Queensland</option>
            <option value="SA">South Australia</option>
            <option value="TAS">Tasmania</option>
            <option value="VIC">Victoria</option>
            <option value="WA ">Western Australia</option>
            <option value="NT ">Northern Territory</option>
            <option value="ACT">Australian Capital Territory</option>
          </select>
        </div>
        <div id='calendar'></div>
        <EventAdd show={this.state.showEventAdd} close={this.closeModal} currentDate={this.state.currentDate}/>
      </div>
    )
  }
}

export default App;