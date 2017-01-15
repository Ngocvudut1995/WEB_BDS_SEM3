app.controller('trangchuCtrl', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$rootScope.tab_index = 0;
    $scope.tinhtientrenm2 = function (dt, gia) {
        var tien = gia / dt;
        return Math.round(tien * 100) / 100;
    };
    $scope.img1 = $rootScope.app + "/Content/Images/khu-can-ho-Masteri-Thao-Dien.jpg";
    $scope.tab_loaibds = 0;
    $scope.tab_gia = 0;
    $scope.select_sell = true;
    $scope.$on('dragging', function (evt, params) {
        //console.log("move");
    });
    $scope.search = function () {
        var url = '/TimKiem/' + $scope.select_sell + '/0/0/0'
         + '/' + $scope.tab_gia + '/' + $scope.select_DienTich + '/' + $scope.tab_loaibds + '/' + $scope.type_land + '/0/?q=' + $scope.query;
        // var url = '/TimKiem/';

        $location.url(url);

    };
    $scope.query = '';


    $scope.change_sell = function (sell) {
        $scope.select_sell = sell;
        $scope.type_land = 0;
        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
            $scope.list_DM = response.data;

        });
        $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
            $scope.list_Price = response.data;
        });

    };
    $scope.type_land = 0;
    $scope.change_type_land = function (id) {
        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell_and_Type/?sell=" + $scope.select_sell + "&type=" + id).then(function (response) {
            $scope.list_DM = response.data;

        });
    };
    $scope.change_tab_loai = function (id) {
        $scope.tab_loaibds = id;
        //console.log($scope.tab_loaibds);
    };
    $scope.change_tab_gia = function (id) {
        $scope.tab_gia = id;
        //console.log($scope.tab_loaibds);
    };
    $scope.change_sell(true);
    $scope.select_DienTich = 0;
    $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
        $scope.listdientich = response.data;
    });
    $scope.change_tab_dientich = function (id) {
        $scope.select_DienTich = id;
    };
    $scope.list_top_land_sell = [];
    $scope.list_top_land_rent = [];
    $http.get(host + "/api/TrangChu/get_top_new_land_sell_canho/?sl=4").then(function (response) {
        $scope.list_top_land_sell = response.data;
        // console.log($scope.list_top_land_sell);
    });
    $scope.change_tab_land_sell = function (id) {
        switch (id) {
            case 2:
                $http.get(host + "/api/TrangChu/get_top_new_land_sell_nha/?sl=4").then(function (response) {
                    $scope.list_top_land_sell = response.data;
                });
                break;
            case 3:
                $http.get(host + "/api/TrangChu/get_top_new_land_sell_dat/?sl=4").then(function (response) {
                    $scope.list_top_land_sell = response.data;
                });
                break;
            case 4:
                $http.get(host + "/api/TrangChu/get_top_new_land_sell_vanphong/?sl=4").then(function (response) {
                    $scope.list_top_land_sell = response.data;
                });
                break;
            case 5:
                $http.get(host + "/api/TrangChu/get_top_new_land_sell_khac/?sl=4").then(function (response) {
                    $scope.list_top_land_sell = response.data;
                });
                break;
            default:
                $http.get(host + "/api/TrangChu/get_top_new_land_sell_canho/?sl=4").then(function (response) {
                    $scope.list_top_land_sell = response.data;
                });
                break;
        }
    };
    $http.get(host + "/api/TrangChu/get_top_new_land_rent_canho/?sl=4").then(function (response) {
        $scope.list_top_land_rent = response.data;
    });
    $scope.change_tab_land_rent = function (id) {
        switch (id) {
            case 2:
                $http.get(host + "/api/TrangChu/get_top_new_land_rent_nha/?sl=4").then(function (response) {
                    $scope.list_top_land_rent = response.data;
                });
                break;
            case 3:
                $http.get(host + "/api/TrangChu/get_top_new_land_rent_dat/?sl=4").then(function (response) {
                    $scope.list_top_land_rent = response.data;
                });
                break;
            case 4:
                $http.get(host + "/api/TrangChu/get_top_new_land_rent_vanphong/?sl=4").then(function (response) {
                    $scope.list_top_land_rent = response.data;
                });
                break;
            case 5:
                $http.get(host + "/api/TrangChu/get_top_new_land_rent_khac/?sl=4").then(function (response) {
                    $scope.list_top_land_rent = response.data;
                });
                break;
            default:
                $http.get(host + "/api/TrangChu/get_top_new_land_rent_canho/?sl=4").then(function (response) {
                    $scope.list_top_land_rent = response.data;
                });
                break;
        }
    };

}]);