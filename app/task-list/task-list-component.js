angular.module('taskList').component("taskList", {
    templateUrl:'task-list/task-list-template.html',
    controller: ['$scope','$firebaseObject','ngDialog',function TaskListController($scope,$firebaseObject,ngDialog) {
      var tasksRef = firebase.database().ref().child("tasks");
      var self = this;

      self.tasks = {}
      self.selectedTasks = []
      tasksRef.on('value', (snapshot)=> {
        self.tasks = snapshot.val() || {}
        if(!$scope.$parent.$$phase) {
          $scope.$digest()
        }
      })

      function addTask(task)
      {
        tasksRef.push(task)
      }

      self.addNewTaskAction = function () {
        let addDialog = ngDialog.open({ template: 'task-list/task-add-popup-tempate.html', 
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
            $scope.$onSubmit = (task)=>{
              addTask(task)
              $scope.closeThisDialog(0)
            }
          }] 
        });
      };

      self.markTasksAsCompleted = ()=>
      {
        
        self.selectedTasks.forEach((element)=>tasksRef.child(element).child("completed").set(true))
        self.selectedTasks = []
      }

      self.deleteTasks = ()=>
      {
        self.selectedTasks.forEach(element => {
          tasksRef.child(element).remove()
        });
        self.selectedTasks = []
      }


      self.checkTask = (task)=>{
        let index =  self.selectedTasks.indexOf(task)
        if(index != -1)
        {
          self.selectedTasks.splice(index,1)
        }else
        {
          self.selectedTasks.push(task)
        }
      }

      self.isTaskSelected = (task)=>{
        return self.selectedTasks.indexOf(task)!=-1
      }
      self.tasks = []
    }]
  })