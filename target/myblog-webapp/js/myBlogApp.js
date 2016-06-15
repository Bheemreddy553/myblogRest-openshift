/**
 * Created by Bhargav on 14-06-2016.
 */
var myBlogApp = angular.module('myBlogApp', []);


myBlogApp.controller('blogPostSubmissionCtrl', function($scope,$http) {
    $scope.alerts = [{}];
    console.log(" blogPostSubmissionCtrl ");
    $scope.submitArticleForm = function(){
        console.log("title "+$scope.title);
        console.log("content "+$scope.content);
        var obj = {};
        obj["title"] = $scope.title;
        obj["body"] = $scope.content;
       $scope.title =  $scope.title;
       $scope.content = $scope.content;
       $scope.tags = $scope.tags;
        $scope.sourceURL = $scope.sourceURL;
       /* var json= JSON.stringify( obj);*/
        var myurl='/webapi/blogPost';
        $http.post(myurl, obj)
            .success(function(response) {

                if(response.response == "true" ) {

                    $scope.alerts = [{}];
                    $scope.alerts.push({type: 'success', msg: 'Update Success'});
                    $scope.truck_type={};$scope.matrialType='';$scope.maxCapacity='';$scope.noOfTrucks='';
                }
                else{
                    $scope.alerts = [{}];
                    $scope.alerts.push({type: 'warning', msg: 'Update Failed'});
                }
            })
            .error(function(response) {
                $scope.alerts = [{}];
                $scope.alerts.push({type: 'danger', msg: 'Something went wrong network Failure.'});
            })
    }

    var getAllPostUrl='/webapi/blogPost';
    $http.get(getAllPostUrl)
        .success(function(response) {

            if(response.length > 0 ) {
                $scope.postIsEmpty = true;
                $scope.posts = response;
                $scope.alerts = [{}];
                $scope.alerts.push({type: 'success', msg: 'Update Success'});
                $scope.truck_type={};$scope.matrialType='';$scope.maxCapacity='';$scope.noOfTrucks='';
            }
            else{
                $scope.postIsEmpty = false;
                $scope.alerts = [{}];
                $scope.alerts.push({type: 'warning', msg: 'Update Failed'});
            }
        })
        .error(function(response) {
            $scope.alerts = [{}];
            $scope.alerts.push({type: 'danger', msg: 'Something went wrong network Failure.'});
        })

});