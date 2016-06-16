/**
 * Created by Bhargav on 16-06-2016.
 */

dashboard.controller("viewPostsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http) {
        var vm = this;

        vm.message = {};

        vm.submitForm = function () {
            console.log(vm.message);
            var request = $http({
                method: "post",
                url: "contact.php",
                data: vm.message,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                console.log(data);
                if (data == "success") {
                    Flash.create('success', 'Message Sent Succesfully', 'large-text');
                    vm.message = {};
                    vm.contactForm.$pristine();
                    vm.contactForm.$setUntouched();

                }
            });
        };
        console.log("coming to viewPostsController");


        console.log(" blogPostSubmissionCtrl ");








        $scope.viewArticle = function(post1){
            $scope.post2 = post1;
            $scope.viewPost = post1;
            console.log("viewArticle  "+post1.title);
          //  $location.path("/viewArticl2.html");
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

    }]);
