import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';
import { connect } from 'react-redux';

import EventAdd from './EventAdd';
import { getEventData } from '../actions/actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidUpdate() {
    this.displayEvents();
  }

  displayEvents() {   
    if(this.props.calendar && this.props.calendar.eventData) {
      const filteredEvents = this.filterPublicHolidays(this.props.calendar.eventData);

      // rerender calendar's public holiday events
      $('#calendar').fullCalendar('removeEvents');
      $('#calendar').fullCalendar('addEventSource', filteredEvents);
    }
  }

  filterPublicHolidays(events) {
    return events.filter(event => {
      const state = this.state.currentState;
      if(event.category === 'public holiday' && !event.applicableTo.includes(state)) {
        return null;
      }

      return event;
    });
  }

  componentDidMount() {
    this.props.getEventData();
    this.displayCalendar();
  }

  displayCalendar() {
    $('#calendar').fullCalendar({
      dayClick: (date, event, view) => {
        const day = $(event.target);
        this.openModal(date);
        
        day.addClass('focus-day');
      }
    });
    $('.fc-next-button').click(() => this.displayEvents());
    $('.fc-prev-button').click(() => this.displayEvents());

    this.displayEvents();
  }

  chooseState = (e) => this.setState({ currentState: $(e.target).val() }, () => this.displayEvents());
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  getEventData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);