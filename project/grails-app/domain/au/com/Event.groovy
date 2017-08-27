package au.com

import grails.rest.*

@Resource(uri='/customer/calendar/get', formats=['json'])
class Event {

  String id
  String title
  String start
  String end
  String category
  String label
  String readonly

    static constraints = {
    }
}
