package au.com

import grails.rest.Resource

@Resource(uri='/api/todos', formats=['json'])
class Todo {
  String name
  
  String one
  String two
  String three

  static belongsTo = [todoList: TodoList]
}
