var list_all = [];
app.controller('timkiemCtrl', [
    '$scope', '$http', '$window', '$filter', '$rootScope', '$routeParams', '$location', function ($scope, $http, $window, $filter, $rootScope, $routeParams, $location) {
        var _MAX = 1000000000;
        // 

        $scope.tinhtientrenm2 = function (dt, gia) {
            var tien = gia / dt;
            return Math.round(tien * 100) / 100;
        };
        // Function reset
        $scope.reload_seach = function () {
            $scope.select_Duong = '0';
            $scope.select_Huong = '0';
            $scope.select_Gia = '0';
            $scope.select_Huyen = '0';
            $scope.select_Phuong = '0';
            $scope.select_Kieu = '0';
            $scope.select_DienTich = '0';
            $scope.type_land = '0';
            $scope.query = '';
            // $scope.select_sell = '0';
            $scope.load_phuong();
            // $scope.load_duong();

        };
        $scope.change_type_land = function (id) {
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell_and_Type/?sell=" + $scope.select_sell + "&type=" + id).then(function (response) {
                $scope.list_DM = response.data;

            });
        };
        $scope.select_sort = '0';
        // Bắt paramester url
        if ($routeParams.page != null) {
            $scope.currentPage = $routeParams.page - 1;
        } else {
            $scope.currentPage = 0;
        }
        if ($routeParams.sell != 'false' && $routeParams.sell != 'true') {
            $scope.select_sell = '0';
            $scope.select_Kieu = 0;
            $scope.select_Gia = 0;
            $scope.type_land = 0;
            $scope.tab_sell = 'MUA';
        } else {
            $scope.select_sell = $routeParams.sell;
            $scope.tab_sell = $scope.select_sell == 'true' ? 'MUA' : 'THUÊ';
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_DM = response.data;
                if ($routeParams.type != null) {
                    $scope.type_land = $routeParams.type;
                } else {
                    $scope.type_land = 0;
                }
                if ($routeParams.k != null) {
                    $scope.select_Kieu = $routeParams.k;
                } else {
                    $scope.select_Kieu = 0;
                }
            });
            $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_Price = response.data;
                if ($routeParams.g != null) {
                    $scope.select_Gia = $routeParams.g;
                } else {
                    $scope.select_Gia = 0;
                }
            });
        }


        if ($routeParams.huongnha != null) {
            $scope.select_Huong = $routeParams.huongnha;
        } else {
            $scope.select_Huong = '0';
        }

        if ($routeParams.h != null) {
            $scope.select_Huyen = $routeParams.h;
        } else {
            $scope.select_Huyen = '0';
        }
        $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + $scope.select_Huyen).then(function (response) {
            $scope.listDuong = response.data;

        });
        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + $scope.select_Huyen).then(function (response) {
            $scope.listPhuong = response.data;
            if ($routeParams.p != null) {
                $scope.select_Phuong = $routeParams.p;


            } else {
                $scope.select_Phuong = '0';
            }
            if ($routeParams.d != null) {
                $scope.select_Duong = $routeParams.d;
            } else {
                $scope.select_Duong = '0';
            }

            if ($routeParams.q != null) {
                // console.log($routeParams.q);
                $scope.query = $routeParams.q;
            } else {
                $scope.query = '';
            }


            if ($routeParams.dt != null) {
                $scope.select_DienTich = $routeParams.dt;
            } else {
                $scope.select_DienTich = 0;
            }
            $rootScope.loading = 1;
            $http.get(host + "/api/TimKiem/get_VP").then(function (response) {
                //$scope.listVP = response.data;
                list_all = response.data;
                $rootScope.loading = 0;
                $scope.search();
            });

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
                + '/' + $scope.select_Gia + '/' + $scope.select_DienTich + '/' + $scope.select_Kieu + '/' + $scope.type_land + '/'
            + $scope.select_Huong;

            //var url = '/TimKiem/1/1/1/1/1/0/1';
            $location.url(url);
            if ($scope.query != '') {
                $location.search('q', $scope.query);
            }
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



        $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
            $scope.listQuan = response.data;

        });
        $http.get(host + "/api/TimKiem/get_Direction").then(function (response) {
            $scope.listHuong = response.data;

        });
        $http.get(host + "/api/BdsXemNhieuNhat/get_VP_TK_NhieuNhat/").then(function (response) {
            $scope.list_VPNN = response.data;
        });

        $scope.change_sell = function (sell) {

            $scope.select_sell = sell;
            $scope.type_land = 0;
            $scope.tab_sell = ($scope.select_sell == 'true') ? 'MUA' : 'THUÊ';
            $scope.select_Kieu = '0';
            $scope.select_Gia = '0';
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_DM = response.data;

            });
            $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.select_sell).then(function (response) {
                $scope.list_Price = response.data;
            });


        };

        $scope.load_phuong = function () {
            $scope.select_Phuong = '0';
            $scope.search_vp();
            $scope.load_duong();
            $scope.load_dientich();
            $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + $scope.select_Huyen).then(function (response) {
                $scope.listPhuong = response.data;
            });

        };

        $scope.load_duong = function () {
            $scope.select_Duong = '0';
            $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + $scope.select_Huyen).then(function (response) {
                $scope.listDuong = response.data;
                // console.log($scope.listDuong);
            });
            //$scope.search_vp();

        };
        $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
            $scope.listdientich = response.data;
        });
        $scope.load_dientich = function () {
            $scope.select_DienTich = 0;
            $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
                $scope.listdientich = response.data;
            });
        };
        $scope.change_tab_loai = function (id) {
            $scope.select_Kieu = id;
        };
        $scope.change_tab_gia = function (id) {
            $scope.select_Gia = id;
        }; $scope.change_tab_dientich = function (id) {
            $scope.select_DienTich = id;
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
                     && ($scope.select_Huong == '0' || $scope.select_Huong == item.IDDirection)
                    && ($scope.select_Kieu == 0 || $scope.select_Kieu == item._MaLoaiCT)
                    && ($scope.select_DienTich == 0 || $scope.select_DienTich == item._MaDT)
                    && ($scope.select_Gia == 0 || $scope.select_Gia == item._IDPrice)
                     && ($scope.type_land == 0 || $scope.type_land == item._MaLoai)
                    && ($scope.select_sell == item._Sell.toString() || $scope.select_sell == '0')) {
                    if ((searchMatch(item._TenVp, $scope.query)
                        || searchMatch(item._SoNha + ' ' + item._Duong + ',Quận ' + item._TenQuan + ', Phường' + item._Phuong + ', TP Đà Nẵng', $scope.query))) {
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
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_Area_detail', true);
                    break;
                case '4':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_Area_detail', false);
                    break;
                case '5':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_Price_detail', true);
                    break;
                case '6':
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '_Price_detail', false);
                    break;

                default:
            }
            $scope.groupToPages();

        };

        // change sorting order
        $scope.img_item = "Content/Images/vanphong.jpg";
    }]);