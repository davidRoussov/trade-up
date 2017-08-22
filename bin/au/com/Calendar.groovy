package au.com.calendar

import grails.rest.RestfulController;

class Calendar extends RestfulController {
  static responseFormats = ['json', 'xml']
  Calendar() {
    super(Event)
    println "hello world"
  }
}