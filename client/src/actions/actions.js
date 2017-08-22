export function getEventData() {
  return dispatch => {
    fetch('http://localhost:8080/customer/calendar/get', {
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
  }
}