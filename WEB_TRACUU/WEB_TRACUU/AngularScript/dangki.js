
app.controller('dangkiCtrl', ['$scope', '$http', '$rootScope', '$routeParams', function ($scope, $http, $rootScope, $routeParams) {
    $scope.fullname = '';
    $scope.gender = 'true';
    $scope.nick_name = '';
    $scope.coquan = '';
    $scope.phone = '';
    $scope.address = "";
    $scope.cmnd = '';
    $scope.email = "";
    $scope.username = "";
    $scope.password = "";
    $scope.rePassword = '';
    $scope.birthdate = "";
    $scope.test_tk = 0;
    $scope.test_email = 0;
    $scope._check = 0;
    $scope.kt_taikhoan_tontai = function () {
        var url = host + "/api/TaiKhoan/KT_TaiKhoan_TonTai/?user=" + $scope.username;
        $http.get(url).then(function (response) {
            $scope.test_tk = response.data;
        });
    };
    $scope.kt_email = function () {
        var url = host + "/api/TaiKhoan/KT_Email_TonTai/?email=" + $scope.email;
        $http.get(url).then(function (response) {
            $scope.test_email = response.data;
        });
    };
    $scope.register = function () {
        // var date = new Date($scope.birthdate);

        //console.log(date);
        //date.setDate(date.getDate() + 1);
        //date.setHours(00);
        // console.log(date);
        // $scope.land.expired_date = date;
        $rootScope.loading = 1;
        var data = JSON.stringify({
            "_tenkh": $scope.fullname, "_user": $scope.username, "_pass": $scope.password,
            "_email": $scope.email, "_coquan": $scope.coquan, "_sodt": $scope.phone,
            "_diachi": $scope.address, "_cmnd": $scope.cmnd, "_gioitinh": $scope.gender
            , "_ngaysinh": $scope.birthdate
        });

        $http.post(host + "/api/TaiKhoan/TaoTK/", data).then(function (response) {
            $rootScope.loading = 0;
            swal({
                title: 'Mời Bạn Kích Hoạt Tài Khoản',
                text: "Chúng tôi Đã Gửi Mail",
                type: 'success',
                //showCancelButton: true,
                confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'OK!',
                //cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success',
                //cancelButtonClass: 'btn btn-danger',
                //buttonsStyling: false
            }).then(function () {
                window.open(host + '/#/TimKiem', '_self', '');
            }
                 );
        }, function (res) {
            $rootScope.loading = 0;
            swal("Thông báo", "Server unavailable", "error");
        });
    };
}]);