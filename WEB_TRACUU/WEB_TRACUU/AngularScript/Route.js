﻿//var host = 'http://shome.ddns.net/VanPhong/';
//var host = '';
app.config(function ($routeProvider) {
    //var app = '/TraCuuBDS/';
    var app = '';
    $routeProvider
        .when("/TimKiem", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", caseInsensitiveMatch: true, title: "Tìm Kiếm" })
        .when("/TimKiem/:sell/:h/:p/:d/:g/:dt/:k", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", title: "Tìm Kiếm" })
        .when("/Home", {
            templateUrl: app + "Home/GioiThieu",
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
            title: "Trang Chi Tiết Văn Phòng",
            view: true
})
         .when("/TheoDoi", {
             templateUrl: app + "Home/TheoDoi",
             controller: "theodoiCtrl",
             title: "Trang Theo Dõi",
             authorize: true

         })
         .when("/TheoDoi/:id", {
             templateUrl: app + "Home/TheoDoi",
             controller: "theodoiCtrl",
             title: "Trang Theo Dõi",
             authorize: true
            
         })
        .when("/TaiKhoan", {
            templateUrl: app + "Home/TaiKhoan",
            controller: "taikhoanCtrl",
            title: "Tài Khoản",
            authorize: true,
           
        })
        .when("/TaiKhoan/:select", {
            templateUrl: app + "Home/TaiKhoan",
            controller: "taikhoanCtrl",
            title: "Tài Khoản",
            authorize: true,
            admin: true
        })
         .when("/TaiKhoan/:select/:id", {
             templateUrl: app + "Home/TaiKhoan",
             controller: "taikhoanCtrl",
             title: "Tài Khoản",
             authorize: true,
             admin: true
         })
        .when("/DangKy", {
            templateUrl: app + "Home/DangKy",
            controller: "dangkiCtrl",
            title: "Trang Đăng Kí"
        })

    .otherwise({ redirectTo: "/TimKiem" });
});


//app.run(['$location', '$rootScope', function ($location, $rootScope) {
//    $rootScope.$on('$routeChangeSuccess', function (event, current) {
//        $rootScope.title = current.$$route.title;
//    });
//}]);
app.controller('timkiemCtrl', [
    '$scope', '$http', '$window', '$filter', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $filter, $rootScope, $routeParams, $location) {
        var _MAX = 1000000000;
        // 

        // Function reset
        $scope.reload_seach = function () {
            $scope.select_Duong = '0';
            $scope.select_Gia = '0';
            $scope.select_Huyen = '0';
            $scope.select_Phuong = '0';
            $scope.select_Kieu = '0';
            $scope.select_DienTich = '0';
            $scope.query = '';
            $scope.select_sell = '0';
            $scope.load_phuong();
            $scope.load_duong();

        };

        $scope.select_sort = '0';
        // Bắt paramester url
        if ($routeParams.page != null) {
            $scope.currentPage = $routeParams.page - 1;
        } else {
            $scope.currentPage = 0;
        }
        if ($routeParams.sell == null) {
            $scope.select_sell = '0';
            $scope.select_Kieu = '0';
            $scope.select_Gia = '0';
            $scope.list_DM = [];
            $scope.list_Price = [];
        } else {
            $scope.select_sell = $routeParams.sell;
            if ($scope.select_sell == '0') {
                $scope.select_Kieu = '0';

                $scope.select_Gia = '0';
                $scope.list_DM = [];
                $scope.list_Price = [];
            } else {
                $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_DM = response.data;
                    if ($routeParams.k != null) {
                        $scope.select_Kieu = $routeParams.k;
                    } else {
                        $scope.select_Kieu = '0';
                    }
                });
                $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_Price = response.data;
                    if ($routeParams.g != null) {
                        $scope.select_Gia = $routeParams.g;
                    } else {
                        $scope.select_Gia = '0';
                    }
                });
            }

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
                $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + $scope.select_Phuong).then(function (response) {
                    $scope.listDuong = response.data;
                });

            } else {
                $scope.select_Phuong = '0';
            }
            if ($routeParams.d != null) {
                $scope.select_Duong = $routeParams.d;
            } else {
                $scope.select_Duong = '0';
            }

            if ($routeParams.q != null) {
                console.log($routeParams.q);
                $scope.query = $routeParams.q;
            } else {
                $scope.query = '';
            }


            if ($routeParams.dt != null) {
                $scope.select_DienTich = $routeParams.dt;
            } else {
                $scope.select_DienTich = '0';
            }

            $scope.search();
        });

      
        
        // Click nut search goi ham truyen len url
        $scope.search_query = function (query) {

            //var search = $rootScope.change_alias(query);
            //console.log(query);
            $location.search('q', query);
        };
       
        $scope.search_vp = function () {

            var url = '/TimKiem/' + $scope.select_sell + '/' + $scope.select_Huyen + '/'
                + $scope.select_Phuong + '/' + $scope.select_Duong
                + '/' + $scope.select_Gia + '/' + $scope.select_DienTich + '/' + $scope.select_Kieu;
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
            $scope.listVP = response.data;
            list_all = response.data;
            $scope.search();
        });
        $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
            $scope.listQuan = response.data;

        });

        $http.get(host + "/api/BdsXemNhieuNhat/get_VP_TK_NhieuNhat/").then(function (response) {
            $scope.list_VPNN = response.data;
        });
        $scope.change_sell = function () {
            if ($scope.select_sell == '0') {
                $scope.select_Kieu = '0';
                $scope.select_Gia = '0';
                $scope.list_DM = [];
                $scope.list_Price = [];
            } else {
                $scope.select_Kieu = '0';
                $scope.select_Gia = '0';
                $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_DM = response.data;

                });
                $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_Price = response.data;
                });
            }

        };

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


        var sortingOrder = '_MaDT';
        $scope.sortingOrder = sortingOrder;
        $scope.reverse = false;
        // $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];



        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
           // console.log($rootScope.change_alias(haystack));
            //console.log($rootScope.change_alias(needle));
            //console.log($rootScope.change_alias(haystack).indexOf($rootScope.change_alias(needle)) !== -1);
            return $rootScope.change_alias(haystack).indexOf($rootScope.change_alias(needle)) !== -1;

        };



        // init the filtered items

        $scope.search = function () {

            $scope.filteredItems = $filter('filter')(list_all, function (item) {
                //|| searchMatch(item._Mota, $scope.query) ||searchMatch(item._SoNha, $scope.query) || searchMatch(item._Duong, $scope.query)|| searchMatch(item._TenQuan, $scope.query)
                if ((item._MaQuan == $scope.select_Huyen || $scope.select_Huyen == '0')
                    && ($scope.select_Phuong == '0' || $scope.select_Phuong == item._MaPhuong)
                    && ($scope.select_Duong == '0' || $scope.select_Duong == item._MaDuong)
                    && ($scope.select_Kieu == '0' || $scope.select_Kieu == item._MaPL)
                    && ($scope.select_DienTich == '0' || $scope.select_DienTich == item._MaDT)
                    && ($scope.select_Gia == '0' || $scope.select_Gia == item._MaPL)
                    && ($scope.select_sell == item._Sell.toString() || $scope.select_sell == '0')) {
                    if ((searchMatch(item._TenVp, $scope.query)
                        || searchMatch(item._SoNha + ' ' + item._Duong + ',Quận ' + item._TenQuan + ', Phường' + item._Phuong + ', TP Đà Nẵng', $scope.query)))  {
                        return true;
                    }
                }

                return false;
            });
            // take care of the sorting order
            //if ($scope.sortingOrder !== '') {
            //    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            //}
            //$scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_MaDT', true);
            //$scope.currentPage = 1;
            // now group by pages
            // $location.path('/TimKiem/' + $scope.currentPage);
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_ModifyDate', true);
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
            //if (!end) {
            //    end = start;
            //    start = 0;
            //}
            if (start < 0) {
                start = 0;
                end = 5;
            }
            for (var i = start; i < end; i++) {

                if (i == $scope.pagedItems.length)
                    break;
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
            // $scope.change_sort();
            //$location.path('/TimKiem/' + (this.n + 1));
        };

        $scope.change_sort = function () {

            // $location.search('page', 1);
            switch ($scope.select_sort) {
                case '0':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_ModifyDate', true);
                    break;
                case '1':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_ModifyDate', true);
                    break;
                case '2':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_ModifyDate', false);
                    break;
                case '3':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_MaDT', true);
                    break;
                case '4':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_MaDT', false);
                    break;
                case '5':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_IDPrice', true);
                    break;
                case '6':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_IDPrice', false);
                    break;

                default:
            }
            $scope.groupToPages();

        };

        // change sorting order

        // console.log($scope);
        $scope.img_item = "Content/Images/vanphong.jpg";
    }]);
app.controller('chitietCtrl', ['$scope', '$http', '$routeParams', 'Map', '$location', '$rootScope', '$timeout', function ($scope, $http, $routeParams, Map, $location, $rootScope, $timeout) {
    $scope.id_VP = $routeParams.id;

    $scope.select_Duong = '0';
    $scope.select_Gia = '0';
    $scope.select_Huyen = '0';
    $scope.select_Phuong = '0';
    $scope.select_Kieu = '0';
    $scope.select_DienTich = '0';
    $scope.select_sell = '0';
    $scope.reload_seach = function () {
        $scope.select_Duong = '0';
        $scope.select_Gia = '0';
        $scope.select_Huyen = '0';
        $scope.select_Phuong = '0';
        $scope.select_Kieu = '0';
        $scope.select_DienTich = '0';
        $scope.select_sell = '0';
        $scope.load_phuong();
        $scope.load_duong();

    };
    $scope.search_vp = function () {

        var url = '/TimKiem/' + $scope.select_sell + '/' + $scope.select_Huyen + '/'
            + $scope.select_Phuong + '/' + $scope.select_Duong
            + '/' + $scope.select_Gia + '/' + $scope.select_DienTich + '/' + $scope.select_Kieu;
        $location.url(url);

    };
    $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
        $scope.listQuan = response.data;

    });
    $scope.change_sell = function () {
        if ($scope.select_sell == '0') {
            $scope.select_Kieu = '0';
            $scope.select_Gia = '0';
            $scope.list_DM = [];
            $scope.list_Price = [];
        } else {
            $scope.select_Kieu = '0';
            $scope.select_Gia = '0';
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_DM = response.data;

            });
            $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_Price = response.data;
            });
        }

    };

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
    $scope.hosts = host;
    $scope.follow = false;
    if ($rootScope.taikhoan.makh != null) {
        var url = host + "/api/TimKiem/test_follow/?makh=" + $rootScope.taikhoan.makh + "&mavp=" + $routeParams.id;
        $http.get(url).then(function (response) {
            var data = response.data;
            $scope.follow = data;
    });
    }
  
    //$scope.follow = $rootScope.test_follow($rootScope.taikhoan.makh, $routeParams.id);
    console.log($scope.follow);
    $scope.change_follow = function () {

        if ($scope.follow == false) {
            $rootScope.add_office_follow($scope.id_VP);
        } else {
            $rootScope.remove_office_follow($scope.id_VP);
        }
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
    //console.log($scope);

    var thanhpho = 'Tp Đà Nẵng';
    //$scope.images = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    // $scope.miniImage = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    $scope.getAPIid = function (id) {
        $http.get(host + "/api/ChiTiet/get_vp_by_id/?mavp=" + id).then(function (response) {
            $scope.info = response.data;
            $http.get(host + "/api/ChiTiet/get_VP_by_type/?idtype=" + $scope.info._IDType).then(function (response) {
                $scope.list_BDS_LQ = response.data;

            });
            $timeout(function () {
              //  console.log("tang view");
                var data1 = JSON.stringify({

                    "_idLand": id
                });
                $http.put(host + "/api/ChiTiet/addView/", data1);
            }, 30000);
            Map.init(16.063636, 108.21812499999999);
            Map.search($scope.info._NumberHouse + " " + $scope.info._Street + "," + thanhpho)
                .then(
                    function (res) { // success
                        Map.addMarker(res, $scope.info._NumberHouse + " " + $scope.info._Street + "," + thanhpho);
                        $scope.place.name = res.name;
                        $scope.place.lat = res.geometry.location.lat();
                        $scope.place.lng = res.geometry.location.lng();
                    }
                );
            // Map.init($scope.place.lat, $scope.place.lng, $scope.info._TenVp);
            //Map.init(16.063636, 108.21812499999999,$scope.info._TenVp);
        });


    };
    $scope.send_contact = function(nameown, mailto, mail, name, phone, body) {
        var data = JSON.stringify({
            _NameOwn: nameown,
            _MailTo: mailto,
            _Phone: phone,
            _Mail_Contact: mail,
            _Body: $rootScope.change_html(body),
            _Name: name
        });
        $http.post(host + "/api/ChiTiet/Send_Contact_To_Own/", data).then(function(response) {
            swal("Thông báo", "Send Mail Success", "success");

        }, function(res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };

    //console.log($scope);
}]);
app.controller('homeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.tab_index = 4;
}]);
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
app.controller('dangkiCtrl', ['$scope', '$http', '$rootScope', '$routeParams', function ($scope, $http, $rootScope, $routeParams) {
    $scope.fullname = '';
    $scope.gender = 'true';
    $scope.nick_name = '';
    $scope.coquan = '';
    $scope.phone = '';
    $scope.address = '';
    $scope.cmnd = '';
    $scope.email = "";
    $scope.username = "";
    $scope.password = "";
    $scope.rePassword = '';
    $scope.birthdate = "";
    $scope.test_tk = 0;
    $scope._check = 0;
    $scope.kt_taikhoan_tontai = function () {
        var url = host + "/api/TaiKhoan/KT_TaiKhoan_TonTai/?user=" + $scope.username;
        $http.get(url).then(function (response) {
            $scope.test_tk = response.data;
        });
    };
    $scope.register = function () {
        // var date = new Date($scope.birthdate);

        //console.log(date);
        //date.setDate(date.getDate() + 1);
        //date.setHours(00);
        // console.log(date);
        // $scope.land.expired_date = date;
        var data = JSON.stringify({
            "_tenkh": $scope.fullname, "_user": $scope.username, "_pass": $scope.password,
            "_email": $scope.email, "_coquan": $scope.coquan, "_sodt": $scope.phone,
            "_diachi": $scope.address, "_cmnd": $scope.cmnd, "_gioitinh": $scope.gender
            , "_ngaysinh": $scope.birthdate
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
app.controller('taikhoanCtrl', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
   
    if ($rootScope.taikhoan.makh !== null) {
        $rootScope.tab_index = 3;
        if ($routeParams.select != null) {
            $scope.selectedValue = $routeParams.select;

        } else {
            $scope.selectedValue = 'ql_baidangchuaduyet';
        }
        $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=9b8e4a0e-1fa1-4baa-9613-2e9dda5adff4").then(function (response) {
            $scope.list_Images = response.data;

        });
        $http.get(host + "/api/TaiKhoan/get_Land_by_Unconfimred/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
            $scope.bd_chuaduyet = response.data;
        });
        $http.get(host + "/api/TaiKhoan/get_Land_by_ExpiredDate/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
            $scope.bd_hethan = response.data;
        });
        $http.get(host + "/api/TaiKhoan/get_Land_by_Signing/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
            $scope.bd_dangdang = response.data;
        });
        $scope.edit_land = function (mavp) {
            $location.path('/TaiKhoan/ct_baidang/' + mavp);
        };
        switch ($scope.selectedValue) {
            case 'ql_baidangchuaduyet':
                $http.get(host + "/api/TaiKhoan/get_Land_by_Unconfimred/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
                    $scope.bd_chuaduyet = response.data;
                });

                break;
            case 'ql_baidanghethan':
                $http.get(host + "/api/TaiKhoan/get_Land_by_ExpiredDate/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
                    $scope.bd_hethan = response.data;
                });
                break;
            case 'ql_baidangdangdang':
                $http.get(host + "/api/TaiKhoan/get_Land_by_Signing/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
                    $scope.bd_dangdang = response.data;
                });

                break;
            case 'ct_baidang':
                $scope.land = {};
                //$scope.land.MaVP = $routeParams.id;
                $scope.land.select_Huyen = { "IDTrousers": "", "Trousers": "" };
                $scope.land.select_Phuong = { "IDWard": "", "Ward1": "" };
                $scope.land.select_Duong = { "Street1": "", "IDStreet": "" };
                $scope.land.select_DienTich = { "Acreage1": "", "IDAcreage": "" };
                $scope.land.select_Huyen = { "IDTrousers": "", "Trousers": "" };
                $scope.land.select_Gia = { "Price1": "", "IDPrice": "" };
                $scope.land.select_Kieu = { "IDType": "", "TypeName": "" };
                $scope.land.image_source = "";
                $scope.change_sell = function (sell) {


                    $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + sell).then(function (response) {
                        $scope.list_DM = response.data;

                    });
                    $http.get(host + "/api/TimKiem/get_Price/?sell=" + sell).then(function (response) {
                        $scope.list_Price = response.data;
                    });


                };
                $scope.load_phuong = function (id) {
                    $scope.land.select_Phuong.IDWard = '';

                    //$scope.load_dientich();
                    $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + id).then(function (response) {
                        $scope.listPhuong = response.data;
                    });
                    $scope.load_duong('0');

                };

                $scope.load_duong = function (id) {
                    $scope.land.select_Duong.IDStreet = '';
                    $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + id).then(function (response) {
                        $scope.listDuong = response.data;
                    });
                };

                $scope.reload_vp = function () {
                    $http.get(host + "/api/QuanTri/get_bds_by_id/?mavp=" + $routeParams.id).then(function (response) {
                        var data = response.data;
                        $scope.tenkh = data._TenKH;
                        $scope.land.makh = data._MaKH;
                        $scope.land.idbaidang = data._MaBaiDang;
                        $scope.land.mavp = data._MaVP;
                        $scope.land.txtName = data._TenVp;
                        $scope.land.select_Huyen.IDTrousers = data._MaQuan;
                        $scope.load_phuong($scope.land.select_Huyen.IDTrousers);
                        $scope.land.Mota = $rootScope.change_text_from_html(data._Mota);
                        $scope.land.select_Phuong.IDWard = data._MaPhuong;
                        $scope.load_duong($scope.land.select_Phuong.IDWard);
                        $scope.land.select_Duong.IDStreet = data._MaDuong;
                        $scope.land.SoNha = data._SoNha;
                        $scope.land.select_DienTich.IDAcreage = data._MaDT;
                        $scope.land.select_sell = data._Sell.toString();
                        $scope.land.select_Kieu.IDType = data._MaPL;
                        $scope.land.select_Gia.IDPrice = data._IDPrice;
                        $scope.land.GiaChiTiet = data._Price_detail;
                        $scope.land.image_source = data._Anh;
                        //$scope.land._ExpiredDate = $scope.info._ExpiredDate;
                        $scope.land.expired_date = data._ExpiredDate;

                        //console.log($scope.land.expired_date);
                        $scope.land.GiaChiTiet = data._Price_detail;
                    });
                };
                $scope.expired_date = $scope.land.expired_date;
                $scope.reload_vp();
                // $scope.expired_date = $scope.land.expired_date;
                $scope.select_sell = 'true';
                $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
                    $scope.listQuan = response.data;

                });
                $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_DM = response.data;

                });
                $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_Price = response.data;
                });
                $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                    $scope.listdientich = response.data;
                });

                break;
            case 'ql_khachhang':
                $http.get(host + "/api/TaiKhoan/get_all_customer/").then(function (response) {
                    $scope.list_Customer = response.data;
                });

                break;
            case 'khachhang':
                $scope.Customer = {};
                $http.get(host + "/api/DangNhap/ThongTinKH/?makh=" + $routeParams.id).then(function (res) {
                    var data = res.data;
                    $scope.Customer.ID = $routeParams.id;
                    $scope.Customer.fullname = data._TenKH;
                    if (data._Gender == true) {
                        $scope.Customer.gender = 'true';
                    } else {
                        $scope.Customer.gender = 'false';
                    }
                    //$scope.Customer.gender = data._Gender;
                    $scope.Customer.nick_name = '';
                    $scope.Customer.coquan = data._CoQuan;
                    $scope.Customer.phone = data._Phone;
                    $scope.Customer.address = data._Address;
                    $scope.Customer.cmnd = data._CMND;
                    $scope.Customer.email = data._Email;
                    $scope.Customer.username = data._User;
                    $scope.Customer.birthdate = data._Birthday;
                });

                $scope.birthdate = $scope.Customer.birthdate;
                //$scope.reload_kh();

                break;
            case 'ql_tracuu':

                $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
                    $scope.listQuan = response.data;

                });
                $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_DM = response.data;

                });
                $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_Price = response.data;
                });
                $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                    $scope.listdientich = response.data;
                });

                break;
            case 'thongtinkh':

                break;
            case 'ql_baidang':


                break;
            default:
                break;
        }
    }
   

   
    //console.log($scope);
}]);
app.controller('postCtrl', ['$scope', '$http', '$rootScope', '$routeParams', 'textAngularManager', function ($scope, $http, $rootScope, $routeParams, textAngularManager) {
    $scope.version = textAngularManager.getVersion();
    $scope.versionNumber = $scope.version.substring(1);
    $scope.orightml = '';
    $scope.Mota = $scope.orightml;
    $scope.disabled = false;
    $scope.select_Huyen = '0';
    $scope.select_Phuong = '0';
    $scope.select_Duong = '0';
    $scope.select_DienTich = '0';
    $scope.select_Gia = '0';
    $scope.select_Kieu = '0';
    $scope.select_HinhThuc = '0';
    $scope.select_Hang = '0';
    $scope.SoNha = '';
    $scope.txtName = '';
    $scope.GiaChiTiet = '';
    $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
        $scope.listQuan = response.data;

    });
    var data_img = [];
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };
    $scope.getImage_detail = function ($files) {
        angular.forEach($files, function (value, key) {
            var formdata1 = new FormData();
            formdata1.append(key, value);
            data_img.push(formdata1);

        });
    };
    $scope.AppendImage = function () {
        var myEl = angular.element(document.querySelector('#divID'));
        myEl.append('Hi<br/>');
    }
    $scope.divHtmlVar = '<img style="height: 100px; width: 100px; margin-top: 10px">';
    $scope.prependText = function () {
        $scope.divHtmlVar = '<img src="' + $scope.image_source1 + '" style="height: 100px; width: 100px; margin-top: 10px">' + $scope.divHtmlVar;
    }
    $scope.setFile2 = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.image_source1 = event.target.result;
            $scope.prependText();
            $scope.$apply();

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadAvatar = function (idvp, data) {

        var request = {
            method: 'POST',
            url: host + '/api/post/UploadAvatar/?id=' + idvp,
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                swal({
                    title: 'Đăng tin',
                    text: "Đã đăng tin",
                    type: 'success',

                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'OK!',

                    confirmButtonClass: 'btn btn-success',

                }).then(function () {
                    window.open(host + '/#/TaiKhoan', '_self', '');
                }
                     );
            })
            .error(function () {
            });

    };
    $scope.UploadImageDetail = function (idvp, data) {

        var request = {
            method: 'POST',
            url: host + '/api/post/UploadImageDetail/?id=' + idvp,
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                swal({
                    title: 'Đăng tin',
                    text: "Đã đăng tin",
                    type: 'success',

                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'OK!',

                    confirmButtonClass: 'btn btn-success',

                }).then(function () {
                    window.open(host + '/#/TaiKhoan', '_self', '');
                }
                     );
            })
            .error(function () {
            });

    };

    $scope.upload_detail = function () {
        for (var i = 0; i < data_img.length; i++) {
            $scope.UploadImageDetail('69ad7cce-3d15-4282-8f8d-19c7e64a96ce', data_img[i]);
        }
    };
    $scope.load_phuong = function () {
        $scope.select_Phuong = '0';

        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + $scope.select_Huyen).then(function (response) {
            $scope.listPhuong = response.data;
            //$scope.load_duong();
        });
    };

    $scope.load_duong = function () {
        $scope.load_dientich();
        $scope.select_Duong = '0';
        $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + $scope.select_Phuong).then(function (response) {
            $scope.listDuong = response.data;
        });
    };
    $scope.load_dientich = function () {
        // $scope.load_Gia();
        $scope.select_DienTich = '0';
        $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
            $scope.listdientich = response.data;
        });
    };
    $scope.select_sell = 'true';
    $scope.change_sell = function () {


        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
            $scope.list_DM = response.data;

        });
        $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
            $scope.listgia = response.data;
        });


    };


    $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
        $scope.list_DM = response.data;

    });
    $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
        $scope.listgia = response.data;
    });

    
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.image_source = event.target.result;
            $scope.$apply();

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };

    $scope.huy = function () {
        $scope.select_Huyen = '0';
        $scope.select_Phuong = '0';
        $scope.select_Duong = '0';
        $scope.select_DienTich = '0';
        $scope.select_Gia = '0';
        $scope.select_Kieu = '0';
        $scope.select_HinhThuc = '0';
        $scope.select_Hang = '0';
        $scope.SoNha = '';
        $scope.txtName = "";
        $scope.Mota = '';
        $scope.GiaChiTiet = '';

    };
    $scope.postBai = function () {

        var data = JSON.stringify({
            "_tieuDe": $scope.txtName, "_quan": $scope.select_Huyen, "_phuong": $scope.select_Phuong, "_duong": $scope.select_Duong,
            "_soNha": $scope.SoNha, "_kieuBDS": $scope.select_Kieu, "_dienTich": $scope.select_DienTich, "_IDgia": $scope.select_Gia,
            "_hinhThuc": $scope.select_HinhThuc, "_thoiHang": $scope.select_Hang, "_moTa": $scope.Mota, "_GiaChiTiet": $scope.GiaChiTiet,
            "_idCustomer": $rootScope.taikhoan.makh

        });
        $http.post(host + "/api/Post/Creat_BDS/", data).then(function (response) {
            console.log(response);
            $scope.uploadAvatar(response.data, formdata);

            for (var i = 0; i < data_img.length; i++) {
                $scope.UploadImageDetail(response.data, data_img[i]);
            }

        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
    //console.log($scope);
}]);
app.controller('baidangchuaduyetCtrl', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $scope.duyet_bai = function (id_post) {
        var data = JSON.stringify({
            "_idPost": id_post
        });

        $http.put(host + "/api/QuanTri/DuyetBai/", data).then(function (response) {
            swal("Thông báo", "Bài Đăng Đã Được Duyệt", "success");
            $location.path('/TaiKhoan/');
            //$location.path('/TaiKhoan/ql_baidangchuaduyet');
            //location.reload();

        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };

    $scope.huy_bai = function (id_post) {
        var data = JSON.stringify({
            "_idPost": id_post
        });
        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Bài Đăng Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.put(host + "/api/QuanTri/HuyBai/", data).then(function (response) {
                swal("Thông báo", "Bài Đăng Đã Hủy Thành Công", "success");
                $location.path('/TaiKhoan/');
                // $location.path('/TaiKhoan/ql_baidangchuaduyet');
                //location.reload();

            }, function (res) {
                swal("Thông báo", "Server unavailable", "error");
            });
        });

    };

}]);
app.controller('quanlytracuuCtrl', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $scope.select_Huyen = { "IDTrousers": "", "Trousers": "" };
    $scope.select_Phuong = { "IDWard": "", "Ward1": "" };
    $scope.select_Duong = { "Street1": "", "IDStreet": "" };
    $scope.select_DienTich = { "Acreage1": "", "IDAcreage": "" };
    $scope.select_Huyen = { "IDTrousers": "", "Trousers": "" };
    $scope.select_Gia = { "Price1": "", "IDPrice": "" };
    $scope.select_Kieu = { "IDType": "", "TypeName": "" };
    $scope.select_sell = 'true';
    $scope.change_sell = function (sell) {


        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + sell).then(function (response) {
            $scope.list_DM = response.data;

        });
        $http.get(host + "/api/TimKiem/get_Price/?sell=" + sell).then(function (response) {
            $scope.list_Price = response.data;
        });


    };
    $scope.load_phuong = function (id) {
        $scope.select_Phuong = { "IDWard": "", "Ward1": "" };

        //$scope.load_dientich();
        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + id).then(function (response) {
            $scope.listPhuong = response.data;
        });
        //$scope.load_duong('0');

    };

    $scope.load_duong = function (id) {
        $scope.select_Duong = { "Street1": "", "IDStreet": "" };
        $http.get(host + "/api/TimKiem/get_Street_by_IDWard/" + id).then(function (response) {
            $scope.listDuong = response.data;
        });
    };

    $scope.SaveEditTrouser = function (is_insert, name, id) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id
        });

        $http.post(host + "/api/QuanTri/edit_Trousers/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
                $scope.listQuan = response.data;

            });
            // $location.path();
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteTrouser = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Sẽ Phải Xóa Toàn Các Phường Và Các Đường Tương Ứng Trong Quận Muốn Xóa",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Trousers/?id_quan=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
                    $scope.listQuan = response.data;

                });
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };
    $scope.DeleteAllTrouser = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Toàn Bộ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            for (var i = 0; i < $scope.listQuan.length; i++) {

                $http.delete(host + "/api/QuanTri/Delete_Trousers/?id_quan=" + $scope.listQuan[i].IDTrousers).then(function (response) {


                    // $location.path();
                }, function (res) {
                    swal("Thông Báo!", "Server unavailable", "error");
                });
            }
            $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
                $scope.listQuan = response.data;

            });

        });
    };
    $scope.SaveEditWard = function (is_insert, name, id, id_trousers) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id, "IDTrouser": id_trousers
        });

        $http.post(host + "/api/QuanTri/edit_Wards/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $scope.load_phuong($scope.select_Huyen.IDTrousers);
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteWard = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Sẽ Phải Xóa Toàn Các Đường Tương Ứng Trong Phường Muốn Xóa",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Wards/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $scope.load_phuong($scope.select_Huyen.IDTrousers);
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };
    $scope.SaveEditStreet = function (is_insert, name, id, id_ward) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id, "IDWard": id_ward
        });

        $http.post(host + "/api/QuanTri/edit_Streets/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $scope.load_duong($scope.select_Phuong.IDWard);
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteStreet = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Đường Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Streets/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $scope.load_duong($scope.select_Phuong.IDWard);
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };


    $scope.SaveEditPrice = function (is_insert, name, id, sell) {
        var data = JSON.stringify({
            "Is_Insert": is_insert,
            "Name": name,
            "ID": id,
            "Sell": sell
        });

        $http.post(host + "/api/QuanTri/edit_Price/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_Price = response.data;
            });
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeletePrice = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Mục Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Price/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_Price = response.data;
                });
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };


    $scope.SaveEditType = function (is_insert, name, id, sell) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id, "Sell": sell
        });

        $http.post(host + "/api/QuanTri/edit_Type/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + sell).then(function (response) {
                $scope.list_DM = response.data;

            });
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteType = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Mục Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Type/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                    $scope.list_DM = response.data;

                });
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };



    $scope.SaveEditArea = function (is_insert, name, id) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id
        });

        $http.post(host + "/api/QuanTri/edit_Area/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                $scope.listdientich = response.data;
            });
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteArea = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Mục Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Area/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                    $scope.listdientich = response.data;
                });
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };

}]);
app.controller('ql_khachhang', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $scope.Customer = {};
    $scope.sortingOrder = '_TenLoai';
    $scope.reverse = false;
    $scope.sort_by = function (newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

    };
    $scope.reload_kh = function () {
        $http.get(host + "/api/DangNhap/ThongTinKH/?makh=" + $rootScope.taikhoan.makh).then(function (res) {
            var data = res.data;

            $scope.Customer.fullname = data._TenKH;

            if (data._Gender == true) {
                $scope.Customer.gender = 'true';
            } else {
                $scope.Customer.gender = 'false';
            }
            $scope.Customer.nick_name = '';
            $scope.Customer.coquan = data._CoQuan;
            $scope.Customer.phone = data._Phone;
            $scope.Customer.address = data._Address;
            $scope.Customer.cmnd = data._CMND;
            $scope.Customer.email = data._Email;
            $scope.Customer.username = data._User;
            $scope.Customer.birthdate = data._Birthday;
            $scope.Customer.date = $rootScope.format_date_picker(data._Birthday);

        });
    };
    $scope.birthdate = $scope.Customer.birthdate;
    $scope.reload_kh();
    //console.log($scope);
    $scope._check = 0;
    $scope.change_birthday = function () {

        var birthdate = new Date($scope.birthdate);
        //console.log(customer.birthdate);
        birthdate.setDate(birthdate.getDate() + 1);
        $scope.Customer.birthdate = birthdate;
    };
    $scope.update_customer = function (customer) {
        //console.log(customer.birthdate);
        //if (customer.birthdate != "") {
        //    var birthdate = new Date(customer.birthdate);
        //    //console.log(customer.birthdate);
        //    birthdate.setDate(birthdate.getDate() + 1);
        //    customer.birthdate = birthdate
        //} else {
        //    customer.birthdate = $scope.birthdate;
        //}
        //console.log(customer.birthdate);

        //$rootScope.format_date_picker(customer.birthdate)
        var data = JSON.stringify({
            "_makh": $rootScope.taikhoan.makh,
            "_tenkh": customer.fullname, "_ngaysinh": customer.birthdate,
            "_email": customer.email, "_coquan": customer.coquan, "_sodt": customer.phone,
            "_diachi": customer.address, "_cmnd": customer.cmnd, "_gioitinh": customer.gender
        });

        $http.put(host + "/api/QuanTri/Update_TK/", data).then(function (response) {
            swal({
                title: 'Thông báo',
                text: "Đã Thay Đổi Thông Tin Thành Công",
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
                //window.open(host + '/#/TimKiem', '_self', '');
            }
                 );
        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
}]);
app.controller('ql_baidang', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $http.get(host + "/api/QuanTri/get_thongtin_BDS/").then(function (response) {
        $scope.list_Land = response.data;
    });
    $scope.sortingOrder = '_TenLoai';
    $scope.reverse = false;
    $scope.sort_by = function (newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

    };
}]);
app.controller('ql_ct_khachhang', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $scope.banned = function (id) {
        swal({
            title: 'Thông Báo?',
            text: "Bạn Cấm Tài Khoản Này Hoạt Động",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Banned_Customer/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Banned Thành Công!',
                    'success'
                );
                $scope.load_phuong($scope.select_Huyen.IDTrousers);
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };
    $scope.setAdmin = function (id) {
        swal({
            title: 'Thông Báo?',
            text: "Bạn muốn đặt quyền quản trị cho tài khoản này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.post(host + "/api/QuanTri/SetAdmin/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Set Thành Công!',
                    'success'
                );
                $scope.load_phuong($scope.select_Huyen.IDTrousers);
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };
    $scope.unsetAdmin = function (id) {
        swal({
            title: 'Thông Báo?',
            text: "Bạn muốn hủy quền quản trị cho tài khoản này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/UnSetAdmin/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Unset Thành Công!',
                    'success'
                );
                $scope.load_phuong($scope.select_Huyen.IDTrousers);
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };
    $scope._check = 0;
    $scope.change_birthday = function () {

        var birthdate = new Date($scope.birthdate);
        //console.log(customer.birthdate);
        birthdate.setDate(birthdate.getDate() + 1);
        $scope.Customer.birthdate = birthdate;
    };
    $scope.update_customer = function (customer) {

        var data = JSON.stringify({
            "_makh": $rootScope.taikhoan.makh,
            "_tenkh": customer.fullname, "_ngaysinh": customer.birthdate,
            "_email": customer.email, "_coquan": customer.coquan, "_sodt": customer.phone,
            "_diachi": customer.address, "_cmnd": customer.cmnd, "_gioitinh": customer.gender
        });

        $http.put(host + "/api/QuanTri/Update_TK/", data).then(function (response) {
            swal({
                title: 'Thông báo',
                text: "Đã Thay Đổi Thông Tin Thành Công",
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
                //window.open(host + '/#/TimKiem', '_self', '');
            }
                 );
        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
}]);
app.controller('ct_baidang_ctrl', ['$scope', '$http', '$window', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $rootScope, $routeParams, $location) {
    $scope.change_expiredDate = function () {
        //console.log(expired_date);
        var date = new Date($scope.expired_date);

        //console.log(date);
        //date.setDate(date.getDate() + 1);
        date.setHours(00);
        // console.log(date);
        $scope.land.expired_date = date;
    };
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.land.image_source = event.target.result;

            $scope.$apply();

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };

    // NOW UPLOAD THE FILES.
    $scope.UploadAvatar = function (idvp) {
        console.log(formdata);
        var request = {
            method: 'POST',
            url: host + '/api/post/UploadAvatar/?id=' + idvp,
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {

            })
            .error(function () {
            });
        //$http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
        //    $scope.listQuan = response.data;
        //    $scope.load_phuong();
        //});
    };
    $scope.update_land = function (land) {

        $scope.UploadAvatar(land.mavp);

        var data = JSON.stringify({
            "_idLand": land.mavp, "_tieuDe": land.txtName, "_quan": land.select_Huyen.IDTrousers, "_phuong": land.select_Phuong.IDWard, "_duong": land.select_Duong.IDStreet,
            "_soNha": land.SoNha, "_kieuBDS": land.select_Kieu.IDType, "_dienTich": land.select_DienTich.IDAcreage, "_IDgia": land.select_Gia.IDPrice,
            "_hinhThuc": land.select_sell, "_hethan": land.expired_date, "_moTa": $rootScope.change_html(land.Mota), "_GiaChiTiet": land.GiaChiTiet,
            "_idCustomer": land.makh

        });
        $http.put(host + "/api/QuanTri/Update_BDS/", data).then(function (response) {
            swal({
                title: 'Thông Báo',
                text: "Đã Thay Đổi Thành Công",
                type: 'success',

                confirmButtonColor: '#3085d6',

                confirmButtonText: 'OK!',

                confirmButtonClass: 'btn btn-success',

            }).then(function () {
                // window.open(host + '/#/TaiKhoan', '_self', '');


            }
                 );
            $location.path('/TaiKhoan/');
        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };

}]);
app.controller('doiMatKhauCtrl', ['$scope', '$http', '$window', '$rootScope', function ($scope, $http, $window, $rootScope) {

    $http.get(host + "/api/DangNhap/ThongTinKH/?makh=" + $rootScope.taikhoan.makh).then(function (res) {
        var customer = res.data;

        $scope.update_Pass = function (pass_old, pass_new) {
            var data = JSON.stringify({
                "_makh": $rootScope.taikhoan.makh,
                "_newPass": pass_new, "_oldPass": pass_old
            });
            $http.put(host + "/api/QuanTri/ChangePass/", data).then(function (response) {
                swal({
                    title: 'Thông báo',
                    text: "Đã Thay Đổi Thành Công. Mời Đăng Nhập Lại",
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK!',
                    confirmButtonClass: 'btn btn-success',
                    //buttonsStyling: false
                }).then(function () {

                });
                $rootScope.dang_xuat();
                $rootScope.dangnhap();
            }, function (res) {
                swal("Thông báo", "Mật khẩu không đúng", "error");
            });
        };
    });
}]);
