import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../../node_modules/fullcalendar/dist/fullcalendar.css';

class App extends Component {
  componentDidMount() {
    $('#calendar').fullCalendar({});
    



    var data = {
      resource_id: '31eec35e-1de6-4f04-9703-9be1d43d405b'
    };
    $.ajax({
      url: 'http://data.gov.au/api/action/datastore_search',
      data: data,
      success: function(data) {
        alert('Total results found: ' + data.result.total)
        console.log(JSON.stringify(data, null, 2));
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
