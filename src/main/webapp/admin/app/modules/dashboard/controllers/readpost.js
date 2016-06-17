/**
 * Created by Bhargav on 16-06-2016.
 */

dashboard.controller("readPostsController", ['$rootScope', '$scope', '$state','$stateParams',  '$location', 'dashboardService', 'Flash', '$http',
    function ($rootScope, $scope,$http, $state, $location, dashboardService, Flash,$stateParams) {
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
        console.log("coming to readPostsController");
        console.log(" $stateParams.id "+  $stateParams.id);

        $scope.viewArticleById($stateParams.id);



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





    }]);
