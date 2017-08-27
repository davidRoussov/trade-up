import { SERVER_URL } from '../config';

export function getEventData() {
  return dispatch => {
    fetch(SERVER_URL + 'customer/calendar/get', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type' : 'application/json;charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(eventData => {
      dispatch({
        type: 'GET_CALENDAR_EVENTS',
        eventData
      });
    });
  };
};

export function submitEvent(event) {
  return dispatch => {
    fetch(SERVER_URL + 'customer/calendar/save', {
      method: 'POST',
      body: JSON.stringify({
        event
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(JSON.stringify(response, null, 2));
    });
  };
}