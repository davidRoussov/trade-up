package techlauncher

import grails.rest.*
import grails.converters.*
import groovyx.net.http.*
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*
import grails.converters.JSON
import groovy.json.JsonSlurper
import static groovy.json.JsonOutput.*

import groovy.sql.Sql

class CalendarController {
	static responseFormats = ['json', 'xml']

  def dbURL = 'jdbc:mysql://localhost:3306/calendar'
  def dbUserName = 'root'
  def dbPassword = '1234'
  def dbDriver = 'com.mysql.jdbc.Driver'

  def get() {
    def allEvents = []
    try {
      def db = Sql.newInstance(this.dbURL, this.dbUserName, this.dbPassword, this.dbDriver)
      db.eachRow('SELECT * FROM non_productive_day;', { row -> 
        
        def event = [:]
        event['id'] = row.id
        event['title'] = row.title
        event['start'] = row.start
        event['end'] = row.end
        event['category'] = row.category
        event['details'] = row.details
        event['readonly'] = false

        allEvents << event
      })
    } catch(Exception e){
      println("ERROR")
      println(e)
    }

    def http = new HTTPBuilder( 'http://data.gov.au/api/action/datastore_search' )
    http.request( GET, JSON ) {
      uri.path = '/api/action/datastore_search'
      uri.query = [ resource_id: '31eec35e-1de6-4f04-9703-9be1d43d405b' ]

      headers.'User-Agent' = 'Mozilla/5.0 Ubuntu/8.10 Firefox/3.0.4'
      headers.'Content-Type' = 'application/json'

      // response handler for a success response code:
      response.success = { resp, json ->
        def slurper = new JsonSlurper()
        def data = slurper.parseText(json.text);
        data.result.records.each {
          if(it.Date != "TBC") {
            def publicHoliday = [:]
            publicHoliday['id'] = '123'
            publicHoliday['title'] = it.HolidayName
            publicHoliday['start'] = this.formatDate(it.Date)
            publicHoliday['end'] = this.formatDate(it.Date)
            publicHoliday['category'] = 'public holiday'
            publicHoliday['applicableTo'] = it.ApplicableTo 
            publicHoliday['label'] = it.Information
            publicHoliday['readonly'] = true

            allEvents << publicHoliday
          }
        }
      }

      // handler for any failure status code:
      response.failure = { resp ->
        println "Unexpected error: ${resp.statusLine.statusCode} : ${resp.statusLine.reasonPhrase}"
      }
    }

    def res = allEvents.collect {[
      'id': it.id,
      'title': it.title,
      'start': it.start,
      'end': it.end,
      'category': it.category,
      'readonly': it.readonly,
      'applicableTo': it.applicableTo,
      'details': it.details
    ]}
    render res as JSON
  }

  def save() {
    def event = request.reader.text
    def success = false
    if(request.getMethod() == "POST") {
      success = this.addNewEvent(event);
    } else {
      println("ERROR: invalid HTTP method");
    }

    def response = ['success': success]
    render response as JSON
  }

  def addNewEvent(jsonEvent) {
    def slurper = new JsonSlurper();
    def event = slurper.parseText(jsonEvent).event
    try {
      def db = Sql.newInstance(this.dbURL, this.dbUserName, this.dbPassword, this.dbDriver)
      def insertStatement = 'INSERT INTO non_productive_day (title, start, end, category, details) VALUES (:title, :start, :end, :category, :details)';
      db.execute(insertStatement, event)
      return true
    } catch(Exception e){
      println("ERROR")
      println(e)
      return false
    }
  }

  def formatDate(String date) {
    return date[0..3] + "-" + date[4..5] + "-" + date[6..7];
  }
}
