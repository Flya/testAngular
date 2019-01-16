angular.module('taskList').component("task", {
    templateUrl:'task-list/task-template.html',
    controller: function TaskController() {
    },
    bindings: {
      task: '<'
    }
  })