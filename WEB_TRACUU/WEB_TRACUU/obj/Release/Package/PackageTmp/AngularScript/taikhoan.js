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
        $http.get(host + "/api/TaiKhoan/get_quality_Land_by_Signing/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
           
            $scope.sl_bd_dangdang = response.data;
        });
        $http.get(host + "/api/TaiKhoan/get_quality_Land_by_Expired/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
            $scope.sl_bd_hethan = response.data;
        });
        $http.get(host + "/api/TaiKhoan/get_quality_Land_by_Unconfimred/?makh=" + $rootScope.taikhoan.makh).then(function (response) {
            $scope.sl_bd_chuaduyet = response.data;
        });
        $scope.edit_land = function (mavp) {
            $location.path('/TaiKhoan/ct_baidang/baidang/' + mavp);
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
    $http.get(host + "/api/ChiTiet/get_furiture/").then(function (response) {
        $scope.list_noithat = response.data;
    });
    $http.get(host + "/api/ChiTiet/get_convenient/").then(function (response) {
        $scope.list_tiennghi = response.data;
    });
    $scope.change_noithat = function (src) {
        $scope.image_noithat = $rootScope.app + '/' + src;
    };
    $scope.change_tienich = function (src) {
        $scope.image_tienich = $rootScope.app + '/' + src;
    };

    var formdata_image_noithat = new FormData();
    $scope.getTheFiles_noithat = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata_image_noithat.append(key, value);
        });
    };
    var formdata_image_tiennghi = new FormData();
    $scope.getTheFiles_tiengnhi = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata_image_tiennghi.append(key, value);
        });
    };

    $scope.setFile_Noithat = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.image_noithat = event.target.result;

            $scope.$apply();

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };
    $scope.setFile_Tienich = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.image_tienich = event.target.result;

            $scope.$apply();

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };

    $scope.select_noithat = { "Furiture_Name": "", "IDFuriture": 0, "Image": "" }
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
        $scope.load_duong(id);

    };

    $scope.load_duong = function (id) {
        $scope.select_Duong = { "Street1": "", "IDStreet": "" };
        $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + id).then(function (response) {
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
    $scope.SaveEditStreet = function (is_insert, name, id, id_trouser) {
        var data = JSON.stringify({
            "Is_Insert": is_insert, "Name": name, "ID": id, "IDtrouser": id_trouser
        });

        $http.post(host + "/api/QuanTri/edit_Streets/", data).then(function (response) {
            swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            $scope.load_duong($scope.select_Huyen.IDTrousers);
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
                $scope.load_duong($scope.select_Huyen.IDTrousers);
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


    $scope.uploade_image_furniture = function (id, data) {

        var request = {
            method: 'POST',
            url: host + '/api/QuanTri/UploadImage_Furniture/?id=' + id,
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            })
            .error(function () {
            });

    };
    $scope.SaveEditFurniture = function (is_insert, name, id) {
        var data = JSON.stringify({
            "Name": name, "ID": id, "Is_Insert": is_insert
        });

        $http.post(host + "/api/QuanTri/edit_furniture/", data).then(function (response) {
            var id = response.data;
            $scope.uploade_image_furniture(id, formdata_image_noithat);
            $http.get(host + "/api/ChiTiet/get_furiture/").then(function (response) {
                $scope.list_noithat = response.data;
            });
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteFurniture = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Mục Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Furniture/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/ChiTiet/get_furiture/").then(function (response) {
                    $scope.list_noithat = response.data;
                });
                // $location.path();
            }, function (res) {
                swal("Thông Báo!", "Server unavailable", "error");
            });
        });

    };

    $scope.uploade_image_convenient = function (id, data) {

        var request = {
            method: 'POST',
            url: host + '/api/QuanTri/UploadImage_Convenient/?id=' + id,
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                swal(
                'Thông Báo!',
                'Update Thành Công!',
                'success'
            );
            })
            .error(function () {
            });

    };
    $scope.SaveEditConvenient = function (is_insert, name, id) {
        var data = JSON.stringify({
            "Name": name, "ID": id, "Is_Insert": is_insert
        });

        $http.post(host + "/api/QuanTri/edit_convenient/", data).then(function (response) {
            var id = response.data;
            $scope.uploade_image_convenient(id, formdata_image_tiennghi);
            $http.get(host + "/api/ChiTiet/get_convenient/").then(function (response) {
                $scope.list_tiennghi = response.data;
            });
        }, function (res) {
            swal("Thông Báo!", "Server unavailable", "error");
        });
    };
    $scope.DeleteConvenient = function (id) {

        swal({
            title: 'Thông Báo?',
            text: "Bạn Muốn Xóa Mục Này",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            $http.delete(host + "/api/QuanTri/Delete_Convenient/?id=" + id).then(function (response) {
                swal(
                    'Thông Báo!',
                    'Delete Thành Công!',
                    'success'
                );
                $http.get(host + "/api/ChiTiet/get_convenient/").then(function (response) {
                    $scope.list_tiennghi = response.data;
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
    $scope.land = {};
    //$scope.land.MaVP = $routeParams.id;
    $scope.land.select_Huyen = { "IDTrousers": "", "Trousers": "" };
    $scope.land.select_Phuong = { "IDWard": "", "Ward1": "" };
    $scope.land.select_Duong = { "Street1": "", "IDStreet": "" };
    $scope.land.select_DienTich = { "Acreage1": "", "IDAcreage": "" };
    $scope.land.select_Huyen = { "IDTrousers": "", "Trousers": "" };
    $scope.land.select_Gia = { "Price1": "", "IDPrice": "" };
    $scope.land.select_Kieu = { "IDTypeDetail": "", "TypeNameDetail": "" };
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
        $scope.land.select_Phuong.Ward1 = '';
        //$scope.load_dientich();
        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + id).then(function (response) {
            $scope.listPhuong = response.data;
        });
        $scope.load_duong(id);

    };

    $scope.load_duong = function (id) {
        $scope.land.select_Duong.IDStreet = '';
        $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + id).then(function (response) {
            $scope.listDuong = response.data;
        });
    };

    // $scope.expired_date = $scope.land.expired_date;

    $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
        $scope.listQuan = response.data;

    });

    $http.get(host + "/api/TimKiem/get_Acreage/").then(function (response) {
        $scope.listdientich = response.data;
    });

    $scope.change_expiredDate = function () {
        //console.log(expired_date);
        var date = new Date($scope.expired_date);
        
        //if (date.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        //    return true;
        //}
        //console.log(date);
        //date.setDate(date.getDate() + 1);
        date.setHours(00);
        // console.log(date);
        $scope.land.expired_date = date;
    };
    $scope.land.select_huong = { "Direction1": "", "IDDirection": "" };
    $http.get(host + "/api/TimKiem/get_Direction").then(function (response) {

        $scope.listHuong = response.data;

    });
    $scope.divHtmlVar = '';
    $http.get(host + "/api/ChiTiet/get_image_VP/?mavp=" + $routeParams.id).then(function (response) {
        $scope.land.images_detail = response.data;
        var list_image = response.data;
        
        $scope.show_slide = 1;
        for (var i = 0; i < list_image.length; i++) {
            $scope.divHtmlVar = $scope.divHtmlVar + '<div style="width:110px;float:left"><img style="height: 100px; width: 100px; margin-right:15px;" src="' + $rootScope.app + '/' + list_image[i].Anh + '"/></div>';
        };
       // console.log($scope.divHtmlVar);

    });
    $scope.tab_gia = 1;
    $scope.reload_vp = function () {
        $http.get(host + "/api/QuanTri/get_bds_by_id/?mavp=" + $routeParams.id).then(function (response) {
            var data = response.data;
            $scope.tenkh = data._TenKH;
            $scope.land.makh = data._MaKH;
            $scope.land.idbaidang = data._MaBaiDang;
            $scope.land.mavp = data._MaVP;
            $scope.land.txtName = data._TenVp;
            $scope.land.select_Huyen.IDTrousers = data._MaQuan;
            $scope.land.select_Huyen.Trousers = data._TenQuan;
            $scope.load_phuong($scope.land.select_Huyen.IDTrousers);
            $scope.land.Mota = $rootScope.change_text_from_html(data._Mota);
            $scope.land.select_Phuong.IDWard = data._MaPhuong;
            $scope.land.select_Phuong.Ward1 = data._Phuong;
            $scope.load_duong($scope.land.select_Huyen.IDTrousers);
           // console.log(data._MaDuong);
            $scope.land.select_Duong.IDStreet = data._MaDuong | '';
            $scope.land.SoNha = data._SoNha;
            $scope.land.DienTich = data._Area_detail;
            $scope.land.select_sell = data._Sell.toString();
            $scope.change_sell(data._Sell);
            $scope.land.select_Kieu.IDTypeDetail = data._MaLoaiCT;
            $scope.land.select_Kieu.TypeNameDetail = data._LoaiDat;
            $scope.land.select_huong.IDDirection = data._IDDirection | '';
            $scope.land.select_Gia.IDPrice = data._IDPrice;
           
            $scope.land.GiaChiTiet = data._Price_detail;
            if (data._Price_detail == 0) {
                $scope.tab_gia = 0;

            } else {
                $scope.tab_gia = 1;
            }
            $scope.land.image_source = data._Anh;
            //$scope.land._ExpiredDate = $scope.info._ExpiredDate;
            $scope.land.expired_date = data._ExpiredDate;

            //console.log($scope.land.expired_date);
            
            $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell/?sell=" + $scope.land.select_sell).then(function (response) {
                $scope.list_DM = response.data;

            });
            $http.get(host + "/api/TimKiem/get_Price/?sell=" + $scope.land.select_sell).then(function (response) {
                $scope.list_Price = response.data;
            });
            $http.get(host + "/api/ChiTiet/get_furiture_by_id/?mavp=" + $routeParams.id).then(function (response) {
                $scope.land.list_noithat_by_id = response.data;

            });
            $http.get(host + "/api/ChiTiet/get_convenient_by_id/?mavp=" + $routeParams.id).then(function (response) {
                $scope.land.list_tiennghi_by_id = response.data;

            });
        });

        //console.log($scope.land);
    };
  
    
    $scope.list_noithat = [];
    $http.get(host + "/api/ChiTiet/get_furiture").then(function (response) {
        $scope.land.list_noithat = response.data;
    });
    $scope.list_tiennghi = [];
    $http.get(host + "/api/ChiTiet/get_convenient").then(function (response) {
        $scope.land.list_tiennghi = response.data;
    });
    $scope.land.list_noithat_by_id = [];
    $scope.land.list_tiennghi_by_id = [];
    $scope.test_noithat = function (id) {
        for (var i = 0; i < $scope.land.list_noithat_by_id.length; i++) {
            if ($scope.land.list_noithat_by_id[i].IDFuriture === id) return true;
        }
        return false;
    };
    $scope.test_tiennghi = function (id) {
        for (var i = 0; i < $scope.land.list_tiennghi_by_id.length; i++) {
            if ($scope.land.list_tiennghi_by_id[i].IDConvenient === id) return true;
        }
        return false;
    };
    $scope.them_noiThat = function (id) {
        var kt = true;
        var temp = 0;
        for (var i = 0; i < $scope.land.list_noithat_by_id.length; i++) {
            if (id === $scope.land.list_noithat_by_id[i].IDFuriture) {
                kt = false;
                temp = i;
            }
        }
        if (kt === true) {
            var noithat = {"IDFuriture":id}
            $scope.land.list_noithat_by_id.push(noithat);
        } else {
            $scope.land.list_noithat_by_id.splice(temp, temp + 1);
        }
    };

 
    $scope.them_tienNghi = function (id) {
        var kt = true;
        var temp = 0;

        for (var i = 0; i < $scope.land.list_tiennghi_by_id.length; i++) {
            if (id === $scope.land.list_tiennghi_by_id[i].IDConvenient) {
                kt = false;
                temp = i;
            }
        }
        if (kt === true) {
            var tiennghi= {"IDConvenient":id}
            $scope.land.list_tiennghi_by_id.push(tiennghi);
        } else {
            $scope.land.list_tiennghi_by_id.splice(temp, temp + 1);
        }
    };
    $scope.expired_date = $scope.land.expired_date;
    $scope.reload_vp();
    $scope.select_DM = { "IDTypeDetail": "", "TypeNameDetail": "" };
    $scope.change_type_land = function (id) {
        $scope.select_DM.IDTypeDetail = 0;
        $scope.loai = id;
        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell_and_Type/?sell=true&type=" + id).then(function (response) {
            $scope.list_DM = response.data;

        });
    };
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
    $scope.upload_detail = function (id) {
        for (var i = 0; i < data_img.length; i++) {
            $scope.UploadImageDetail(id, data_img[i]);
        }
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
    $scope.UploadAvatar = function (idvp) {
        // console.log(formdata);
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
   // console.log($scope.land.select_Duong);
    $scope.update_land = function (land) {

        $scope.UploadAvatar(land.mavp);

        var data = JSON.stringify({
            "_idLand": land.mavp, "_tieuDe": land.txtName, "_quan": land.select_Huyen.IDTrousers, "_phuong": land.select_Phuong.IDWard, "_duong":(land.select_Duong!=null)? land.select_Duong.IDStreet:'',
            "_soNha": land.SoNha, "_kieuBDS": land.select_Kieu.IDTypeDetail, "_dienTich": land.DienTich, "_huong":(land.select_huong!=null)? land.select_huong.IDDirection:'',
            "_hinhThuc": land.select_sell, "_hethan": land.expired_date, "_moTa": land.Mota, "_GiaChiTiet": land.GiaChiTiet,
            "_idCustomer": land.makh, "_listnoithat": land.list_noithat_by_id,"_listtiennghi":land.list_tiennghi_by_id

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
    $scope.delete_baidang = function (land)
    {
      
       
        swal({
            title: 'Thông Báo?',
            text: "Bạn Sẽ Muốn Xóa Bài Đăng Này.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            var date = new Date();
            date.setDate(date.getDate() - 1);

            land.expired_date = date;

            $scope.update_land(land);
            $location.patch('/TaiKhoan/');
        });
    }

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
app.controller('postCtrl', ['$scope', '$http', '$rootScope', '$routeParams', 'textAngularManager', function ($scope, $http, $rootScope, $routeParams, textAngularManager) {
    $scope.version = textAngularManager.getVersion();
    $scope.versionNumber = $scope.version.substring(1);
    $scope.orightml = '';
    $scope.Mota = $scope.orightml;
    $scope.disabled = false;
 
   
    $scope.select_sell = 'true';
    $scope.select_huong = { "Direction1": "", "IDDirection": "" };
    $http.get(host + "/api/TimKiem/get_Direction").then(function (response) {
      
        $scope.listHuong = response.data;

    });
    $scope.select_Huyen = { "IDTrousers": "", "Trousers": "" };
    $http.get(host + "/api/TimKiem/get_trouser").then(function (response) {
        $scope.listQuan = response.data;


    });
    $scope.load_phuong = function (id) {
        $scope.select_Phuong = { "IDWard": "", "Ward1": "" };
        $http.get(host + "/api/TimKiem/get_ward_by_IDTrousers/" + id).then(function (response) {
            $scope.listPhuong = response.data;
        });
        $scope.load_duong(id);
        //console.log($scope.select_Huyen.Trousers);
    };
    $scope.load_duong = function (id) {
        $scope.select_Duong = { "Street1": "", "IDStreet": "" };
        $http.get(host + "/api/TimKiem/get_Street_by_IDTrouser/" + id).then(function (response) {
            $scope.listDuong = response.data;
        });
    };
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
    $scope.divHtmlVar = '<img style="height: 100px; width: 100px; margin: 10px 15px">';
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
                    title: 'Ðãng tin',
                    text: "Ð? ðãng tin",
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
                    title: 'Ðăng tin',
                    text: "Ðã đăng tin",
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

    $scope.upload_detail = function (id) {
        for (var i = 0; i < data_img.length; i++) {
            $scope.UploadImageDetail(id, data_img[i]);
        }
    };
    $http.get(host + "/api/ChiTiet/get_furiture").then(function (response) {
        $scope.list_noithat = response.data;
    });

    $http.get(host + "/api/ChiTiet/get_convenient").then(function (response) {
        $scope.list_tiennghi = response.data;
    });
    $scope.noi = [];
    $scope.them_noiThat = function (id) {
        var kt = true;
        var temp = 0;
        for (var i = 0; i < $scope.noi.length; i++) {
            if (id === $scope.noi[i]) {
                kt = false;
                temp = i;
            }
        }
        if (kt === true) {
            $scope.noi.push(id);
        } else {
            $scope.noi.splice(temp, temp + 1);
        }
    };

    $scope.tienNghi = [];
    $scope.them_tienNghi = function (id) {
        var kt = true;
        var temp = 0;

        for (var i = 0; i < $scope.tienNghi.length; i++) {
            if (id === $scope.tienNghi[i]) {
                kt = false;
                temp = i;
            }
        }
        if (kt === true) {
            $scope.tienNghi.push(id);
        } else {
            $scope.tienNghi.splice(temp, temp + 1);
        }
    };
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
    $scope.tieu_de = '';
    $scope.select_loaiGia = '0';
    $scope.ban_thue = true;
    $scope.loai = 0;
    $scope.gia = '';
    $scope.so_nha = '';
    $scope.dien_tich = '';
    $scope.select_Hang = '0';
    $scope.noi_that = '0';
    $scope.tien_nghi = '0';
    $scope.huy = function () {
        $scope.disabled = false;
        
        $scope.tieu_de = '';
        $scope.select_loaiGia = '0';
        $scope.ban_thue = '0';
        $scope.loai = 0;
        $scope.gia = '';
        $scope.dien_tich = '';
        $scope.select_Hang = '';
        $scope.noi_that = '0';
        $scope.tien_nghi = '0';
        $scope.so_nha = '';
    };
    $scope.check_tt = 0;
    $scope.thoa_thuan = function () {
        $scope.check_tt = !$scope.check_tt;
    };
    $scope.select_DM = { "IDTypeDetail": "", "TypeNameDetail": "" };
    $scope.change_type_land = function (id) {
        $scope.select_DM.IDTypeDetail = 0;
        $scope.loai = id;
        $http.get(host + "/api/TimKiem/get_DanhMuc_By_Sell_and_Type/?sell=true&type=" + id).then(function (response) {
            $scope.list_DM = response.data;

        });
    };
    $scope.postBai = function () {

        var data = JSON.stringify({
            "_tieuDe": $scope.tieu_de, "_phuong": $scope.select_Phuong.IDWard, "_duong": ($scope.select_Duong!=null)?$scope.select_Duong.IDStreet:'',
            "_banThue": $scope.ban_thue, "_kieuBDS": $scope.select_DM.IDTypeDetail, "_dienTich": $scope.dien_tich, "_gia": $scope.gia, "_loaiGia": $scope.select_loaiGia,
            "_thoiHang": $scope.select_Hang, "_moTa": $scope.Mota, "_tienNghi": $scope.tienNghi, "_noiThat": $scope.noi, "_checkTT": $scope.check_tt,
            "_idCustomer": $rootScope.taikhoan.makh, "_soNha": $scope.so_nha, "_huongnha":($scope.select_huong!=null)? $scope.select_huong.IDDirection:''

        });
        $http.post(host + "/api/Post/Creat_BDS/", data).then(function (response) {
          //  console.log(response);
            if (response.data != null) {
                $scope.uploadAvatar(response.data, formdata);

                for (var i = 0; i < data_img.length; i++) {
                    $scope.UploadImageDetail(response.data, data_img[i]);
                }
            } else {
                swal("Thông báo", "Server unavailable", "error");
            }
          

        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
}]);