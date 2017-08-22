package au.com.calendar

import grails.rest.Resource

@Resource(uri='/customer/calendar/get', formats=['json'])
class Events {

  // String banana
  // ArrayList<Map> banana
  // ArrayList<LinkedHashMap<String, String, String, String, String, String, String>> banana
  static hasMany = [ events: Event ]

  static constraints = {
    events nullable: true
  } 
}
