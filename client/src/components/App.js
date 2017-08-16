import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';

class App extends Component {

  // colorCalendarFunction() {
  //   console.log(this.holidayData);
  //   // console.log(JSON.stringify(data, null, 2));
  //   // console.log(Object.keys(data.result));
  //   this.holidayData.result.records.forEach(field => {
  //     console.log(field);
  //     console.log(field.ApplicableTo.includes('SA'));
  //   });
  // }

  colorDates(e) {
    e.preventDefault();
    console.log('state', $(e.target).val());
  }

  componentDidMount() {
    $('#calendar').fullCalendar({});

    var data = {
      resource_id: '31eec35e-1de6-4f04-9703-9be1d43d405b'
    };
    $.ajax({
      url: 'http://data.gov.au/api/action/datastore_search',
      data: data,
      success: (data) => {

        this.holidayData = data;
        // console.log(JSON.stringify(data, null, 2));
        // console.log(data.result.records[0]["ApplicableTo"])
        //
        // for (var i = 0; i < data.result.records.length; i++){
        //   console.log(data.result.records[i]["ApplicableTo"])
        // }

      },
      error: function(error) {
        console.log(JSON.stringify(error));
      }
    });


    // fetch('http://data.gov.au/api/action/datastore_search', {
    //   mode: 'cors',
    //   headers:{
    //     'Access-Control-Allow-Origin':'*'
    //   },
    //   data: data
    // })
    // .then(response => response.json())
    // .then(response => console.log(JSON.stringify(response, null, 2)))
    // .catch(error => console.error(error));


  }

  render() {
    return (
      <div style={{padding: '40px'}}>
        <div id='calendar'></div>
        <select onChange={this.colorDates.bind(this.value)}>
          <option value="blank">Select a State</option>
          <option value="NSW">New South Wales</option>
          <option value="QLD">Queensland</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmansi</option>
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
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default App;
