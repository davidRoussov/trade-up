package au.com

import au.com.*

class BootStrap {

    def init = { servletContext ->
      if(!Todo.list()) {
          log.info "Creating todos..."
          def todoList = new TodoList(name: "Bob's List").save()

          [[name: "Task 1", todoList: todoList],
            [name: "Task 2", todoList: todoList],
            [name: "Task 3", todoList: todoList]].each { props ->
              def todo = new Todo()
              todo.properties = props
              todo.save(flush: true)
          }
      }
    }
    def destroy = {
    }
}
