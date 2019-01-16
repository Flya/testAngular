angular.module('taskList', ["firebase",'ngDialog']).filter('keylength', function(){
    return function(input){
      if(!angular.isObject(input)){
        throw Error("Usage of non-objects with keylength filter!!")
      }
      return Object.keys(input).length;
    }
  });