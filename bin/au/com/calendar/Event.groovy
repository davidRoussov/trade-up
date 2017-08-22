package au.com.calendar

class Event {
  String id
  String title
  String start
  String end
  String category
  String label
  String readonly

  static belongsTo = [events: Events]
}