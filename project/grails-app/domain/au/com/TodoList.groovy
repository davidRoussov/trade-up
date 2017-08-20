package au.com

import grails.rest.Resource

@Resource(uri='/api/todoList', formats=['json'])
class TodoList {  
  String name

  static hasMany = [ todos: Todo ]

  static constraints = {
      todos nullable: true
  }
}
