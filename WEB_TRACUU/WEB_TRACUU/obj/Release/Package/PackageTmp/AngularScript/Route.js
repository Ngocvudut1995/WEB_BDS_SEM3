var host = 'http://shome.ddns.net/VanPhong/';
//var host = '';
app.config(function ($routeProvider) {
    var app = '/VanPhong/';
    //var app = "";
    $routeProvider
        .when("/TimKiem", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", caseInsensitiveMatch: true, title: "Tìm Kiếm" })
        .when("/TimKiem/:page", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", caseInsensitiveMatch: true, title: "Tìm Kiếm" })
        .when("/Home", {
            templateUrl: app + "Home/TrangChinh",
            controller: "homeCtrl",
            title: "Trang Chủ"
        })
     
        .when("/ChiTiet/:id", {
            templateUrl: app + "Home/ChiTiet",
            controller: "chitietCtrl",
            title: "Trang Chi Tiết Văn Phòng"
        })
         .when("/TheoDoi/:id", {
             templateUrl: app + "Home/TheoDoi",
             controller: "theodoiCtrl",
             title: "Trang Theo Dõi"
         })
        .when("/TaiKhoan", {
            templateUrl: app + "Home/TaiKhoan",
            controller: "taikhoanCtrl",
            title: "Tài Khoản"
        })
        .when("/DangKy", {
            templateUrl: app + "Home/DangKy",
            controller: "dangkiCtrl",
            title: "Trang Đăng Kí"
        })
    .otherwise({ redirectTo: "/TimKiem" });
});
var sortingOrder = 'name';
app.run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
        $rootScope.title = current.$$route.title;
    });
}]);
app.controller('timkiemCtrl', [
    '$scope', '$http', '$window', '$filter', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $filter, $rootScope, $routeParams, $location) {
        var _MAX = 1000000000;
        if ($routeParams.page != null) {
            $scope.currentPage = $routeParams.page - 1;
        } else {
            $scope.currentPage = 0;
        }
        if ($routeParams.ht != null) {
            $scope.select_HT = $routeParams.ht;
        } else {
            $scope.select_HT = '';
        }
        if ($routeParams.h != null) {
            $scope.select_Quan = $routeParams.h;
        } else {
            $scope.select_Quan = '';
        }
        if ($routeParams.q != null) {
            $scope.query = $routeParams.q;
        } else {
            $scope.query = '';
        }
        if ($routeParams.dm != null) {
            $scope.select_DanhMuc = $routeParams.dm;
        } else {
            $scope.select_DanhMuc = '';
        }
        if ($routeParams.smin != null) {
            $scope.S_min = $routeParams.smin;
        } else {
            $scope.S_min = 0;
        }
        if ($routeParams.smax != null) {
            $scope.S_max = $routeParams.smax;
        } else {
            $scope.S_max = _MAX;
        }
        $scope.search_vp = function () {
            var url = '/TimKiem/1?ht=' + $scope.select_HT + '&h='
                + $scope.select_Quan + '&q=' + $scope.query + '&dm=' + $scope.select_DanhMuc
                + '&smin=' + $scope.S_min + '&smax=' + $scope.S_max;
            $location.url(url);
            //var param = {
            //    ht: $scope.select_HT || '',
            //    h: $scope.select_Quan || '',
            //    q: $scope.searchText || '',
            //    dm: $scope.select_DanhMuc || '',
            //    smin: $scope.S_min || '',
            //    smax: $scope.S_max || ''
            //};
            
           // $location.path('/TimKiem/1').search(param);
             $scope.search();
        };
        //$scope.currentPage = 0;
        $rootScope.tab_index = 1;
        var list_all = [];
        $http.get(host + "api/TimKiem/get_VP").then(function (response) {
            list_all = response.data;
            $scope.search();
        });
        $http.get(host + "api/TimKiem/get_county").then(function (response) {
            $scope.listQuan = response.data;

        });

        $http.get(host + "api/TimKiem/get_HinhThuc").then(function (response) {
            $scope.list_HT = response.data;

        });
        $http.get(host + "api/TimKiem/get_HinhThuc").then(function (response) {
            $scope.list_HT = response.data;

        });
        $http.get(host + "api/TimKiem/get_DanhMuc").then(function (response) {
            $scope.list_DM = response.data;

        });
        
       
        
       
        //$scope.testDT = function (input) {
        //    if (input._Dientich > $scope.S_min) return true;
        //    return false;
        //};
        //$scope.change_Quan = function (input) {
        //    if (input._MaQuan == $scope.select_Quan) {
        //        // $scope.pagination($scope.list, 1);
        //        return true;
        //    }
        //    return false;
        //};
        



        $scope.sortingOrder = sortingOrder;
        $scope.reverse = false;
        // $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 6;
        $scope.pagedItems = [];
        
        

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }

            return $rootScope.change_alias(haystack).indexOf($rootScope.change_alias(needle)) !== -1;

        };
        
       
        
        // init the filtered items
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')(list_all, function (item) {
                if (item._Dientich > $scope.S_min && item._Dientich < $scope.S_max) {
                    if ((item._MaQuan == $scope.select_Quan || $scope.select_Quan == '')
                        && ($scope.select_HT == '' || $scope.select_HT == item._MaHT)
                        && ($scope.select_DanhMuc == '' || $scope.select_DanhMuc == item._MaPL)) {
                        if ((searchMatch(item._TenVp, $scope.query) || searchMatch(item._Mota, $scope.query) ||
                            searchMatch(item._SoNha, $scope.query))) {
                            return true;
                        }
                    }
                }
                return false;
            });
            // take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            //$scope.currentPage = 1;
            // now group by pages
           // $location.path('/TimKiem/' + $scope.currentPage);
            $scope.groupToPages();
        };

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            $window.scrollTo(100, 400);
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            $window.scrollTo(100, 400);
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
            $location.path('/TimKiem/'+(this.n +1));
        };

       

        // change sorting order
        $scope.sort_by = function (newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;

            // icon setup
            $('th i').each(function () {
                // icon reset
                $(this).removeClass().addClass('icon-sort');
            });
            if ($scope.reverse)
                $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-up');
            else
                $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-down');
        };
        console.log($scope);
        $scope.img_item = "Content/Images/vanphong.jpg";
    }]);
app.controller('chitietCtrl', ['$scope', '$http', '$routeParams', 'Map', function ($scope, $http, $routeParams, Map) {
    $scope.id_VP = $routeParams.id;
    $scope.hosts = host;
    $scope.show_slide = 0;
    $scope.place = {};
    $http.get(host + "api/ChiTiet/get_image_VP/?mavp="+$scope.id_VP).then(function (response) {
        $scope.images = response.data;
        $http.get(host + "api/ChiTiet/get_image_VP/?mavp=" + $scope.id_VP).then(function (response) {
            $scope.miniImage = response.data;
            $scope.show_slide = 1;
        });
    });
    
   
    //$scope.images = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
   // $scope.miniImage = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    $scope.getAPIid = function (id) {
        $http.get(host + "api/TimKiem/get_vp_by_id/?mavp=" + id).then(function (response) {
            $scope.info = response.data;
            Map.init(16.063636, 108.21812499999999);
            Map.search($scope.info._SoNha)
                .then(
                    function (res) { // success
                        Map.addMarker(res, $scope.info._SoNha);
                        $scope.place.name = res.name;
                        $scope.place.lat = res.geometry.location.lat();
                        $scope.place.lng = res.geometry.location.lng();
                    }
                );
            // Map.init($scope.place.lat, $scope.place.lng, $scope.info._TenVp);
            //Map.init(16.063636, 108.21812499999999,$scope.info._TenVp);
        });

    };
    $scope.add_office_follow = function (mavp) {
        open_contact();
        var data = JSON.stringify({ "id": mavp });
        $http.put(host + "api/TimKiem/add_office_follow/", data).then(function (response) {
            alert("Them Thanh Cong");
        }, function (res) {
            alert("That Bai!");
        });
    };

    console.log($scope);
}]);
app.controller('homeCtrl', function ($scope) {

});
app.controller('taikhoanCtrl', function ($scope) {

});
app.controller('theodoiCtrl', ['$scope', '$http', '$rootScope', '$routeParams',function ($scope, $http,$rootScope,$routeParams) {
    $rootScope.tab_index = 2;
    $scope.id_KH = $routeParams.id
    $scope.getAPIKH = function (id) {
        $http.get(host + "api/theodoi/get_VP_By_MaKH/?makh=" + id).then(function(response) {
            $scope.list_VP_KH = response.data;
        });
    };
}]);
app.controller('dangkiCtrl', ['$scope', '$http', '$rootScope', '$routeParams', function ($scope, $http, $rootScope, $routeParams) {
    $scope.hoten = '';
    $scope.user = '';
    $scope.pass = '';
    $scope.repeat_pass = '';
    $scope.email = '';
    $scope.coquan = '';
    $scope.sodt = '';
    $scope.diachi = '';
    $scope.test_tk = 0;
    $scope.kt_taikhoan_tontai = function () {
        var url = host + "api/TaiKhoan/KT_TaiKhoan_TonTai/?user=" + $scope.user;
        $http.get(url).then(function (response) {
            $scope.test_tk = response.data;
        });
    };
}]);