/**
 * Created by Bhargav on 14-06-2016.
 */
var myBlogApp = angular.module('myBlogApp', []);



myBlogApp.controller('blogPostSubmissionCtrl', function($scope,$http,$rootScope,$location) {
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
    };



    $scope.viewTest = function( ){
        $scope.myArticle = "dsfgdsgdsfggggggggggggggggggggggggggggggggggggggggggggf";

        $location.path("/viewArticl2.html");
    };



    $scope.viewArticle = function(post1){
        $scope.post2 = post1;
        $scope.viewPost = post1;
        console.log("viewArticle  "+post1.title);
        $location.path("/viewArticl2.html");
        var getAllPostUrl='/webapi/blogPost/'+post1.id;
       /* $http.get(getAllPostUrl)
            .success(function(response) {
                console.log("response "+response);
                console.log("response "+response.length);
                if(response.length > 0 ) {
                    $scope.postIsEmpty = true;
                    $scope.viewPost = response;
                    console.log("psot "+$scope.viewPost.title);
                    console.log("viewPost "+$scope.viewPost);
                    $location.go("viewArticl2.html");
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
            });*/


    };

    $scope.viewArticleById = function(id){
        console.log("psot "+ id);
        var getAllPostUrl='/webapi/blogPost/'+id;
        $http.get(getAllPostUrl)
            .success(function(response) {
                if(response.length > 0 ) {
                    $scope.postIsEmpty = true;
                    $scope.viewPost = response;
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
    };



    $scope.getAllPosts =function(){
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
    };


   $scope.getAllPostDetails = function(){
        var getAllPostUrl='/webapi/blogPostDetails';
        $http.get(getAllPostUrl)
            .success(function(response) {

                if(response.length > 0 ) {
                    $scope.postIsEmpty = true;
                    $scope.postDetalis = response;
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
            });

    };
    $scope.getAllPostDetails();
    $scope.getAllPosts();

});