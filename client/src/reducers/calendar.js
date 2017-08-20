const mapTime = (state = {}, action) => {
    switch (action.type) {
      case 'GET_CALENDAR_EVENTS':
        return { ...state, eventData: action.eventData };
      default:
        return state;
    }
}

export default mapTime;