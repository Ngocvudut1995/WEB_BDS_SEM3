app.controller('chitietCtrl', ['$scope', '$http', '$routeParams', 'Map', '$location', '$rootScope', '$timeout', function ($scope, $http, $routeParams, Map, $location, $rootScope, $timeout) {
    $http.get(host + "/api/ChiTiet/get_title_by_id/?mavp=" + $routeParams.id).then(function (response) {
                    var title = response.data;
                   // console.log(title);
                    $rootScope.title = title + " | TracuuBDS.com";
    });
    //console.log("Demo");
    $scope.id_VP = $routeParams.id;
    $rootScope.loading = 1;
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
            + '/' + $scope.select_Gia + '/' + $scope.select_DienTich + '/' + $scope.select_Kieu + '/0/0';
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

    //  $scope.windowWidths = windowWidth;
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
        $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + $scope.select_Huyen).then(function (response) {
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
    // console.log($scope.follow);
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

    //console.log($scope);
    $scope.list_noithat = [];
    $http.get(host + "/api/ChiTiet/get_furiture").then(function (response) {
        $scope.list_noithat = response.data;
    });
    $scope.list_tiennghi = [];
    $http.get(host + "/api/ChiTiet/get_convenient").then(function (response) {
        $scope.list_tiennghi = response.data;
    });
    $scope.list_noithat_by_id = [];
    $scope.list_tiennghi_by_id = [];
    $scope.test_noithat = function (id) {
        for (var i = 0; i < $scope.list_noithat_by_id.length; i++) {
            if ($scope.list_noithat_by_id[i].IDFuriture === id) return true;
        }
        return false;
    };
    $scope.test_tiennghi = function (id) {
        for (var i = 0; i < $scope.list_tiennghi_by_id.length; i++) {
            if ($scope.list_tiennghi_by_id[i].IDConvenient === id) return true;
        }
        return false;
    };
    var thanhpho = 'Tp Đà Nẵng';
    //$scope.images = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    // $scope.miniImage = [{ src: 'img1.png', title: 'Pic 1' }, { src: 'img2.jpg', title: 'Pic 2' }, { src: 'img3.jpg', title: 'Pic 3' }, { src: 'img4.png', title: 'Pic 4' }, { src: 'img5.png', title: 'Pic 5' }];
    $scope.getAPIid = function (id) {
        $http.get(host + "/api/ChiTiet/get_vp_by_id/?mavp=" + id).then(function (response) {
            $scope.info = response.data;
            //console.log($scope.info);
            // load image slide
            $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=" + $scope.id_VP).then(function (response) {
                $scope.miniImage = response.data;
                
                $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=" + $scope.id_VP).then(function (response) {
                    $scope.images = response.data;
                    $scope.show_slide = 1;
                    if ($scope.images.length == 0) {
                        $scope.images.push({ 'Anh': 'Content/Images/Slider/no-image.png' });
                        $scope.miniImage.push({ 'Anh': 'Content/Images/Slider/no-image.png' });
                    }
                });

            });
            // load land tuong tu
            $http.get(host + "/api/ChiTiet/get_VP_Tuong_Tu/?id=" + id).then(function (response) {
                $scope.list_BDS_LQ = response.data;

            });
            // load noi that va tien nhi cua van phong
            $http.get(host + "/api/ChiTiet/get_furiture_by_id/?mavp=" + id).then(function (response) {
                $scope.list_noithat_by_id = response.data;

            });
            $http.get(host + "/api/ChiTiet/get_convenient_by_id/?mavp=" + id).then(function (response) {
                $scope.list_tiennghi_by_id = response.data;

            });
            ///
            var data1 = JSON.stringify({

                "_idLand": id
            });
            $http.put(host + "/api/ChiTiet/addView/", data1);
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
            $rootScope.loading = 0;
        });


    };
    $scope.send_contact = function (nameown, mailto, mail, name, phone, body) {
        var data = JSON.stringify({
            _NameOwn: nameown,
            _MailTo: mailto,
            _Phone: phone,
            _Mail_Contact: mail,
            _Body: $rootScope.change_html(body),
            _Name: name
        });
        $http.post(host + "/api/ChiTiet/Send_Contact_To_Own/", data).then(function (response) {
            swal("Thông báo", "Send Mail Success", "success");

        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };

    //console.log($scope);
}]);