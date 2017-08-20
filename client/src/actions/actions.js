export function getEventData() {
  console.log('action called');
  return dispatch => {
    // replace following with a fetch (GET)
    dispatch({
      type: 'GET_CALENDAR_EVENTS',
      eventData
    });
  }
}

const eventData = [
  {
    "id": "",
    "title": "a title",
    "start": "2017-12-26",
    "end": "2017-12-26",
    "category": "Public holiday",
    "label": "some holiday",
    "readonly": true
  },
  {
    "id": "",
    "title": "two title",
    "start": "2017-08-30",
    "end": "2017-09-04",
    "category": "RDO",
    "label": "RDO",
    "readonly": false
  },
  {
    "id": "",
    "title": "three title",
    "start": "2017-09-05",
    "end": "2017-09-05",
    "category": "public holiday",
    "label": "erhgegerh",
    "readonly": true
  },
  {
    "id": "",
    "title": "four title",
    "start": "2017-09-13",
    "end": "2017-09-14",
    "category": "some category",
    "label": "some event",
    "readonly": false
  },
  {
    "id": "",
    "title": "five title",
    "start": "2017-10-03",
    "end": "2017-10-03",
    "category": "public holiday",
    "label": "hello",
    "readonly": true
  },
  {
    "id": "",
    "title": "six title",
    "start": "2017-11-03",
    "end": "2017-11-11",
    "category": "some category",
    "label": "long event",
    "readonly": false
  },
  {
    "id": "",
    "title": "seven title",
    "start": "2017-12-03",
    "end": "2017-12-05",
    "category": "efnefee",
    "label": "gsergregre",
    "readonly": false
  },
  {
    "id": "",
    "title": "eight title",
    "start": "2017-12-04",
    "end": "2017-12-06",
    "category": "public holiday",
    "label": "",
    "readonly": false
  },
  {
    "id": "",
    "title": "nine title",
    "start": "2017-12-16",
    "end": "2017-12-16",
    "category": "public holiday",
    "label": "",
    "readonly": true
  },
  {
    "id": "",
    "title": "ten title",
    "start": "2017-12-17",
    "end": "2017-12-17",
    "category": "esrgsregr",
    "label": "sergreg",
    "readonly": false
  }
];