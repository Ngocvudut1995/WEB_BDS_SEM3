app.controller('theodoiCtrl', ['$scope', '$http', '$rootScope', '$routeParams', '$location', function ($scope, $http, $rootScope, $routeParams, $location) {
    if ($rootScope.taikhoan.test == 1) {
        $rootScope.tab_index = 2;
        $scope.id_KH = $routeParams.id;

        $scope.getAPIKH = function (id) {

            $http.get(host + "/api/theodoi/get_VP_By_MaKH/?makh=" + id).then(function (response) {
                $scope.list_VP_KH = response.data;
            }, function errorCallback(response) {

            });
        };
        $scope.open_contact_theodoi = function (mavp) {
            $location.path('/ChiTiet/' + mavp);
        };
    }


}]);