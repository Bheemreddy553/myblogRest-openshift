/**
 * Created by varshini on 14/6/16.
 */
var app = angular.module('myApp', []);
app.controller('myAppCtrl', function ($scope, $http) {

console.log(" my app");

   $scope.submitForm = function(){
       console.log(" my app");
   }

});