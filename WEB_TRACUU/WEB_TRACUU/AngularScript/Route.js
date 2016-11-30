//var host = 'http://shome.ddns.net/VanPhong/';
//var host = '';
app.config(function ($routeProvider) {
    //var app = '/VanPhong/';
    var app = '';
    $routeProvider
        .when("/TimKiem", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", caseInsensitiveMatch: true, title: "Tìm Kiếm" })
        .when("/TimKiem/", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", title: "Tìm Kiếm" })

        .when("/TimKiem/:h/:p/:d/:g/:dt/:k", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", title: "Tìm Kiếm" })
        .when("/Home", {
            templateUrl: app + "Home/TrangChinh",
            controller: "homeCtrl",
            title: "Trang Chủ"
        })
        .when("/PostBai", {
            templateUrl: app + "Home/PostBai",
            controller: "postCtrl",
            title: "Đăng Bài"
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
        $scope.reload_seach = function () {
            $scope.select_Duong = '0';
            $scope.select_Gia = '0';
            $scope.select_Huyen = '0';
            $scope.select_Phuong = '0';
            $scope.select_Kieu = '0';
            $scope.select_DienTich = '0';
            $scope.query = '';
            $scope.load_phuong();
            $scope.load_duong();

        };
       
        if ($routeParams.page != null) {
            $scope.currentPage = $routeParams.page - 1;
        } else {
            $scope.currentPage = 0;
        }

        if ($routeParams.h != null) {
            $scope.select_Huyen = $routeParams.h;
        } else {
            $scope.select_Huyen = '0'; 
        }
        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + $scope.select_Huyen).then(function (response) {
            $scope.listPhuong = response.data;
            if ($routeParams.p != null) {
                $scope.select_Phuong = $routeParams.p;
            } else {
                $scope.select_Phuong = '0';
            }
            $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + $scope.select_Phuong).then(function (response) {
                $scope.listDuong = response.data;
            });
            if ($routeParams.d != null) {
                $scope.select_Duong = $routeParams.d;
            } else {
                $scope.select_Duong = '0';
            }

            $scope.search();
        });
       
        if ($routeParams.q != null) {
            $scope.query = $routeParams.q;
        } else {
            $scope.query = '';
        }
       
        if ($routeParams.k != null) {
            $scope.select_Kieu = $routeParams.k;
        } else {
            $scope.select_Kieu = '0';
        }
        if ($routeParams.dt != null) {
            $scope.select_DienTich = $routeParams.dt;
        } else {
            $scope.select_DienTich = '0';
        }
        if ($routeParams.g != null) {
            $scope.select_Gia = $routeParams.g;
        } else {
            $scope.select_Gia = '0';
        }
       
        $scope.search_vp = function () {

            var url = '/TimKiem/' + $scope.select_Huyen + '/'
                + $scope.select_Phuong + '/' + $scope.select_Duong
                + '/' + $scope.select_Gia + '/' + $scope.select_DienTich + '/' + $scope.select_Kieu + '?q=' + $scope.query;
            //var url = '/TimKiem/1/1/1/1/1/0/1';
            $location.url(url);
            //var param = {
            //    ht: $scope.select_ht || '',
            //    h: $scope.select_quan || '',
            //    q: $scope.searchtext || '',
            //    dm: $scope.select_danhmuc || '',
            //    smin: $scope.s_min || '',
            //    smax: $scope.s_max || ''
            //};

            //$location.path('/TimKiem/1').search(param);
            //$scope.search();
        };
        //$scope.currentPage = 0;
       
        $rootScope.tab_index = 1;

        var list_all = [];
        $http.get(host + "/api/TimKiem/get_VP").then(function (response) {
           
            list_all = response.data;
            $scope.search();
        });
        $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
            $scope.listQuan = response.data;

        });
        
        $scope.load_phuong = function () {
            $scope.select_Phuong = '0';
            $scope.load_duong();
            $scope.load_dientich();
            $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + $scope.select_Huyen).then(function (response) {
                $scope.listPhuong = response.data;
            });
        };
        
        $scope.load_duong = function () {
            $scope.select_Duong = '0';
            $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + $scope.select_Phuong).then(function (response) {
                $scope.listDuong = response.data;
            });
        };
        $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
            $scope.listdientich = response.data;
        });
        $scope.load_dientich = function () {
            $scope.select_DienTich = '0';
            $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                $scope.listdientich = response.data;
            });
        };
       
        $http.get(host + "/api/TimKiem/get_DanhMuc").then(function (response) {
            $scope.list_DM = response.data;

        });

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

                if ((item._MaQuan == $scope.select_Huyen || $scope.select_Huyen == '0')
                    && ($scope.select_Phuong == '0' || $scope.select_Phuong == item._MaPhuong)
                    && ($scope.select_Duong == '0' || $scope.select_Duong == item._MaDuong)
                    && ($scope.select_Kieu == '0' || $scope.select_Kieu == item._MaPL)
                    && ($scope.select_DienTich == '0' || $scope.select_DienTich == item._MaDT)
                    && ($scope.select_Gia == '0' || $scope.select_Gia == item._MaPL)) {
                    if ((searchMatch(item._TenVp, $scope.query) || searchMatch(item._Mota, $scope.query) ||
                        searchMatch(item._SoNha, $scope.query) || searchMatch(item._Duong, $scope.query)
                        || searchMatch(item._TenQuan, $scope.query))) {
                        return true;
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
            //$scope.search_vp();
            $location.search('page', (this.n + 1));
            //$location.path('/TimKiem/' + (this.n + 1));
        };



        // change sorting order

        console.log($scope);
        $scope.img_item = "Content/Images/vanphong.jpg";
    }]);
app.controller('chitietCtrl', ['$scope', '$http', '$routeParams', 'Map', function ($scope, $http, $routeParams, Map) {
    $scope.id_VP = $routeParams.id;
    $scope.hosts = host;
    $scope.follow = 0;
    $scope.change_follow = function () {
        $scope.follow = !$scope.follow;
    };
    $scope.show_slide = 0;
    $scope.place = {};
    $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=" + $scope.id_VP).then(function (response) {
        $scope.miniImage = response.data;
        $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=" + $scope.id_VP).then(function (response) {
            $scope.images = response.data;
            $scope.show_slide = 1;
        });
    });
    console.log($scope);

    var thanhpho = 'Đà Nẵng';
    //$scope.images = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    // $scope.miniImage = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    $scope.getAPIid = function (id) {
        $http.get(host + "/api/ChiTiet/get_vp_by_id/?mavp=" + id).then(function (response) {
            $scope.info = response.data;

            $scope.show_slide = 1;
            Map.init(16.063636, 108.21812499999999);
            Map.search($scope.info._NumberHouse + " " + $scope._Street + "," + thanhpho)
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
        $http.put(host + "/api/TimKiem/add_office_follow/", data).then(function (response) {
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
            swal("Thông báo", "Server unavailable", "error");
        });
    };

    console.log($scope);
}]);
app.controller('homeCtrl', function ($scope) {

});
app.controller('taikhoanCtrl', function ($scope) {

});
app.controller('theodoiCtrl', ['$scope', '$http', '$rootScope', '$routeParams', function ($scope, $http, $rootScope, $routeParams) {
    $rootScope.tab_index = 2;
    $scope.id_KH = $routeParams.id;
    $scope.getAPIKH = function (id) {
        $http.get(host + "/api/theodoi/get_VP_By_MaKH/?makh=" + id).then(function (response) {
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
    $scope.cmnd = '';
    $scope.test_tk = 0;
    $scope._check = 0;
    $scope.kt_taikhoan_tontai = function () {
        var url = host + "/api/TaiKhoan/KT_TaiKhoan_TonTai/?user=" + $scope.user;
        $http.get(url).then(function (response) {
            $scope.test_tk = response.data;
        });
    };
    $scope.register = function () {
        var data = JSON.stringify({
            "_tenkh": $scope.hoten, "_user": $scope.user, "_pass": $scope.pass,
            "_email": $scope.email, "_coquan": $scope.coquan, "_sodt": $scope.sodt,
            "_diachi": $scope.diachi, "_cmnd": $scope.cmnd
        });

        $http.post(host + "/api/TaiKhoan/TaoTK/", data).then(function (response) {
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
            swal("Thông báo", "Server unavailable", "error");
        });
    };
}]);
