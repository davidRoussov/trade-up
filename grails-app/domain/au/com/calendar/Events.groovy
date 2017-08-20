package au.com.calendar

import grails.rest.Resource

@Resource(uri='/customer/calendar/get', formats=['json'])
class Events {

  String banana

  static constraints = {
  } 
}
