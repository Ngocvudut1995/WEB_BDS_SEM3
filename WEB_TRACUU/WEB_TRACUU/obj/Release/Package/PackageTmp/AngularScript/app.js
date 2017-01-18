
var app = angular.module('AngularApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngCookies', 'textAngular']);
var show_dn = 0;
app.controller("main", ['$scope', '$window', '$cookies','$rootScope',function ($scope, $window, $cookies,$rootScope) {
    $scope.name = 'Tra Cứu BDS';
    $rootScope.show_dn = 0;
    $rootScope.loading = 0;
    $rootScope.show_form_contact = 0;
    $rootScope.app = host;
    //$rootScope.MaKH = 'KH10001';
   // $rootScope.loading = 1;
   
    $rootScope.change_money = function (money) {
        money = money.replace(/,/g, ".");
        return money;
    };
    $rootScope.change_html = function (string) {
        var html = string.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        return html;
    };
    $rootScope.change_text_from_html = function (html) {
        var text = html.replace(/<br\s*[\/]?>/g, "\n");
        return text;
    };
    $rootScope.today = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (dd < '10') {
            dd = '0' + dd;
        }
        if (mm < '10') {
            mm = '0' + mm;
        }
       
        var yyyy = today.getFullYear();
        var format = yyyy + '-' + mm + '-' + dd;
        console.log(format);
        return format;
    };
     $rootScope.format_date = function (date) {
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var format = dd + '/' + mm + '/' + yyyy;
       // console.log(format);
        return format;
     };
     $rootScope.format_date_picker = function (date) {
         var today = new Date(date);
         var dd = today.getDate();
         var mm = today.getMonth() + 1;
         var yyyy = today.getFullYear();
         if (dd < '10') {
             dd = '0' + dd;
         }
         if (mm < '10') {
             mm = '0' + mm;
         }
         var format = yyyy + '-' + mm + '-' + dd;
         
         // console.log(format);
         return format;
     };
    // $rootScope.app = "";
     $scope.img1 = $rootScope.app + "/Content/Images/khu-can-ho-Masteri-Thao-Dien.jpg";
    $scope.img2 = "Content/Images/banner_ser_vpa.png";
    $rootScope.dangnhap = function () {
        $rootScope.show_dn = 1;
    };
    
    //var email = 'ngocvudut1995@gmail.com';
    $rootScope.send_gmail = function (email) {
        window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to='+email, '', 'width=400,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    }
    $rootScope.share_gmail = function (id) {
        window.open('https://plus.google.com/share?url={'+host+'/#/ChiTiet/'+id+'}', '', 'width=400,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    }
    $rootScope.share_face = function (id) {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + host + '/#/ChiTiet/' + id, '', 'width=400,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    }
    $rootScope.close_contact = function () {
        $rootScope.show_form_contact = 0;
    };
    $rootScope.open_contact = function () {
        $rootScope.show_form_contact = 1;
    };
    $rootScope.thoat = function () {
        $rootScope.show_dn = 0;
        //this.user = "";
    };
    $rootScope.scrolltotop = function () {
        $window.scrollTo(0, 0);
        //$("body").animate({ scrollTop: $elm.offset().top }, "slow");
    };
   
    $rootScope.change_alias =function(str) {
        
        
        str = (str != null) ? str.toLowerCase() : null;
        //console.log(str);
        str = str.replace(/a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,'a');
        str = str.replace(/e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,'e');
        str = str.replace(/i|ì|í|ị|ỉ|ĩ/g,'i');
        str = str.replace(/o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,'o');
        str = str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,'u');
        str = str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g,'y');
        str = str.replace(/d|đ/g,'d');
        //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        ///* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        //str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        //str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi 
        return str;
    }
    //console.log($scope);
}]);
app.controller("index", ['$scope', '$window', '$cookies', '$rootScope', '$http', '$location','$route','anchorSmoothScroll', function ($scope, $window,
    $cookies, $rootScope, $http, $location, $route,anchorSmoothScroll) {
    $scope.username = "";
    $scope.password = "";
    $rootScope.taikhoan = { test: 0, tenkh: null, username: null ,makh:null,admin:false};
    //var expireDate = new Date();
    //expireDate.setMonth(11);
    //expireDate.setDate(expireDate.getDate() + 1);
    $rootScope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        //$location.hash('bottom');

        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(eID);

    };
    
    $rootScope.open_dangbai = function () {
        $location.path('/TaiKhoan/dangbai/');
    };
   
    //$cookies.put('technology', 'Web', { 'expires': expireDate });
    // Kiem tra co cookies luu tai khoan hay khong
    var str = $cookies.get('user');
    //console.log(str);
    if (str != null) {
        $http.get(host + "/api/DangNhap/ThongTinKH/?makh=" + str).then(function(res) {
            var data = res.data;
            if (data == null) {
                $rootScope.taikhoan.test = 0;

            } else {
                $rootScope.taikhoan.test = 1;
                $rootScope.taikhoan.username = data._User;
                $rootScope.taikhoan.tenkh = data._TenKH;
                $rootScope.taikhoan.makh = data._MaKH;
                $rootScope.taikhoan.admin = data._Admin;
            }

        });
        //    console.log($rootScope.taikhoan);
    }
    $rootScope.dangky = function () {
        $location.path('/DangKy');
    };
    // Kiem tra qua tring dang nhap
    $scope.ktdangnhap = function () {
 
        var url = host + "/api/DangNhap/KT_DangNhap/?user=" + $scope.username + "&pass=" + $scope.password;
        $http.get(url).then(function (response) {
            var data = response.data;
            if (data != null) {
                var expireDate = new Date();
                expireDate.setMonth(11);
                $cookies.put('user', data._MaKH,{'expires': expireDate});
                //var data = res.data;
                $rootScope.taikhoan.test = 1;
                $rootScope.taikhoan.username = data._User;
                $rootScope.taikhoan.tenkh = data._TenKH;
                $rootScope.taikhoan.makh = data._MaKH;
                $rootScope.taikhoan.admin = data._Admin;
                swal("Thông báo", "Đăng nhập thành công", "success");
                //$window.alert("Login success!");
               
                $rootScope.show_dn = 0;
                $route.reload();
            } else {
                swal("Thông báo", "Tài Khoản Hoặc Mật Khẩu Không Hợp Lệ", "error");
            }
        });
        
       
    };
  
    //$scope.insert_duong = function () {
    //    var data = { "Data": [{ "Id": 45, "Name": "Cẩm Lệ", "CityId": 4, "Wards": [{ "Id": 221, "Name": "Khuê Trung", "DistrictId": 45 }, { "Id": 222, "Name": "Hòa Thọ Đông", "DistrictId": 45 }, { "Id": 223, "Name": "Hòa Thọ Tây", "DistrictId": 45 }, { "Id": 224, "Name": "Hòa An", "DistrictId": 45 }, { "Id": 225, "Name": "Hòa Phát", "DistrictId": 45 }, { "Id": 226, "Name": "Hòa Xuân", "DistrictId": 45 }], "Streets": [{ "Id": 1489, "Name": "Phan Tứ", "DistrictId": 45 }, { "Id": 1532, "Name": "Châu Thị Vĩnh Tế", "DistrictId": 45 }, { "Id": 1608, "Name": "Lý Nhân Tông", "DistrictId": 45 }, { "Id": 1932, "Name": "Bùi Kỷ", "DistrictId": 45 }, { "Id": 1953, "Name": "Bùi Vịnh", "DistrictId": 45 }, { "Id": 2003, "Name": "Cao Sơn Pháo", "DistrictId": 45 }, { "Id": 2249, "Name": "Lê Thanh Nghị", "DistrictId": 45 }, { "Id": 2357, "Name": "Huỳnh Ngọc Huệ", "DistrictId": 45 }, { "Id": 2381, "Name": "Nguyễn Khoa Chiêm", "DistrictId": 45 }, { "Id": 2395, "Name": "Hà Duy Phiên", "DistrictId": 45 }, { "Id": 2500, "Name": "Tiên Sơn 16", "DistrictId": 45 }, { "Id": 2584, "Name": "Hồ Quý Ly", "DistrictId": 45 }, { "Id": 3082, "Name": "Phù Đổng", "DistrictId": 45 }, { "Id": 3360, "Name": "Hồ Nguyên Trừng", "DistrictId": 45 }, { "Id": 3411, "Name": "Khương Hữu Dụng", "DistrictId": 45 }, { "Id": 3428, "Name": "Trương Quang Giao", "DistrictId": 45 }, { "Id": 3429, "Name": "Nguyễn Thuật", "DistrictId": 45 }, { "Id": 3442, "Name": "Thanh Hóa", "DistrictId": 45 }, { "Id": 3597, "Name": "Ngô Mây", "DistrictId": 45 }, { "Id": 3611, "Name": "Đô Đốc Bảo", "DistrictId": 45 }, { "Id": 3874, "Name": "Trần Lê", "DistrictId": 45 }, { "Id": 4011, "Name": "Ngô Thế Lân", "DistrictId": 45 }, { "Id": 4050, "Name": "Nguyễn Đóa", "DistrictId": 45 }, { "Id": 5846, "Name": "Nguyễn Đình Tứ", "DistrictId": 45 }, { "Id": 5848, "Name": "Lê Văn An", "DistrictId": 45 }, { "Id": 5891, "Name": "Ngô Thái Lân", "DistrictId": 45 }, { "Id": 5931, "Name": "Hồ Sỹ Dương", "DistrictId": 45 }, { "Id": 5999, "Name": "Trần Phước Thành", "DistrictId": 45 }, { "Id": 6052, "Name": "Nhơn Hoà Phước 2", "DistrictId": 45 }, { "Id": 6078, "Name": "Hòa An 9", "DistrictId": 45 }, { "Id": 6109, "Name": "Nhơn Hòa 5", "DistrictId": 45 }, { "Id": 6110, "Name": "Cồn Dầu 1", "DistrictId": 45 }, { "Id": 6131, "Name": "Lê Kim Lăng", "DistrictId": 45 }, { "Id": 6179, "Name": "Văn Cận", "DistrictId": 45 }, { "Id": 6185, "Name": "Nhơn Hoà Phước,", "DistrictId": 45 }, { "Id": 6273, "Name": "Nhơn Hòa 3", "DistrictId": 45 }, { "Id": 6309, "Name": "Phong Bắc 7", "DistrictId": 45 }, { "Id": 6348, "Name": "Nguyễn Lai", "DistrictId": 45 }, { "Id": 6349, "Name": "Vũ Trọng Hoàng", "DistrictId": 45 }, { "Id": 6351, "Name": "Ngô Nhâm Tịnh", "DistrictId": 45 }, { "Id": 6352, "Name": "Nguyễn Văn Bổng", "DistrictId": 45 }, { "Id": 6353, "Name": "Hồ Đắt Di", "DistrictId": 45 }, { "Id": 6392, "Name": "Hòa An 2", "DistrictId": 45 }, { "Id": 6394, "Name": "Ngô Chi Lan", "DistrictId": 45 }, { "Id": 6423, "Name": "Hà Tông Quyền", "DistrictId": 45 }, { "Id": 6491, "Name": "Huy Cận", "DistrictId": 45 }, { "Id": 6557, "Name": "Nguyễn Thiếp", "DistrictId": 45 }, { "Id": 6636, "Name": "Hà Mục", "DistrictId": 45 }, { "Id": 6706, "Name": "Lỗ Giáng 22", "DistrictId": 45 }, { "Id": 6722, "Name": "Bàu Tràm 2", "DistrictId": 45 }, { "Id": 6725, "Name": "Tế Hanh", "DistrictId": 45 }, { "Id": 6777, "Name": "Nguyễn Xuân Hữu", "DistrictId": 45 }, { "Id": 6800, "Name": "Đào Công Chính", "DistrictId": 45 }, { "Id": 6818, "Name": "Nguyễn Nhàn", "DistrictId": 45 }, { "Id": 6898, "Name": "Cẩm Nam 1", "DistrictId": 45 }, { "Id": 6912, "Name": "Bình Hòa 6", "DistrictId": 45 }, { "Id": 6918, "Name": "Đoàn Ngọc Nhạc", "DistrictId": 45 }, { "Id": 6942, "Name": "Cẩm Bắc 5", "DistrictId": 45 }, { "Id": 6945, "Name": "Lê Vĩnh Khanh", "DistrictId": 45 }, { "Id": 6972, "Name": "Nguyễn Phước Tần", "DistrictId": 45 }, { "Id": 6990, "Name": "Nhơn Hòa 6", "DistrictId": 45 }, { "Id": 6992, "Name": "Lê Thiết Hùng", "DistrictId": 45 }, { "Id": 7060, "Name": "Kiều Phụng", "DistrictId": 45 }, { "Id": 7070, "Name": "Cẩm Bắc 1", "DistrictId": 45 }, { "Id": 7092, "Name": "Cồn Dầu 8", "DistrictId": 45 }, { "Id": 7115, "Name": "Lý Thiên Bảo", "DistrictId": 45 }, { "Id": 7218, "Name": "Phạm Vinh", "DistrictId": 45 }, { "Id": 7220, "Name": "Nguyễn Đỗ Mục", "DistrictId": 45 }, { "Id": 7326, "Name": "Vũ Miên", "DistrictId": 45 }, { "Id": 7330, "Name": "Đô Đốc Lân", "DistrictId": 45 }, { "Id": 7384, "Name": "Phong Bắc 1", "DistrictId": 45 }, { "Id": 7456, "Name": "Lỗ Giáng 8", "DistrictId": 45 }, { "Id": 7476, "Name": "Trần Đình Long", "DistrictId": 45 }, { "Id": 7505, "Name": "Hoàng Đình Ái", "DistrictId": 45 }, { "Id": 7541, "Name": "Phong Bắc 5", "DistrictId": 45 }, { "Id": 7559, "Name": "Lỗ Giáng 1", "DistrictId": 45 }, { "Id": 7564, "Name": "Phạm Tứ", "DistrictId": 45 }, { "Id": 7620, "Name": "Cẩm Bắc 12", "DistrictId": 45 }, { "Id": 7684, "Name": "Nguyễn Thanh Năm", "DistrictId": 45 }, { "Id": 7936, "Name": "Nhơn Hòa 1", "DistrictId": 45 }, { "Id": 7962, "Name": "Lê Quảng Ba", "DistrictId": 45 }, { "Id": 7965, "Name": "Lỗ Giáng 20", "DistrictId": 45 }, { "Id": 7982, "Name": "Huỳnh Xuân Nhị", "DistrictId": 45 }, { "Id": 7999, "Name": "Đồng Trí 3", "DistrictId": 45 }, { "Id": 8022, "Name": "Nhơn Hòa 4", "DistrictId": 45 }, { "Id": 8025, "Name": "Hòa Thọ Đông", "DistrictId": 45 }, { "Id": 8026, "Name": "Hòa An", "DistrictId": 45 }, { "Id": 8138, "Name": "Cẩm Nam 5", "DistrictId": 45 }, { "Id": 8141, "Name": "Hòa An 3", "DistrictId": 45 }, { "Id": 8160, "Name": "Hà Văn Trí", "DistrictId": 45 }, { "Id": 8168, "Name": "Cổ Mân Mai 1", "DistrictId": 45 }, { "Id": 8193, "Name": "Trần Huấn", "DistrictId": 45 }, { "Id": 8245, "Name": "Phước Hòa", "DistrictId": 45 }, { "Id": 8253, "Name": "Phan Khôi", "DistrictId": 45 }, { "Id": 8336, "Name": "Trần Nam Trung", "DistrictId": 45 }, { "Id": 8378, "Name": "Nguyễn Huy Liệu", "DistrictId": 45 }, { "Id": 8396, "Name": "Lâm Nhĩ", "DistrictId": 45 }, { "Id": 8398, "Name": "Trần Quý Hai", "DistrictId": 45 }, { "Id": 8554, "Name": "Bình Hòa 10", "DistrictId": 45 }, { "Id": 8593, "Name": "Cẩm Bắc 4", "DistrictId": 45 }, { "Id": 8607, "Name": "Hòa An 7", "DistrictId": 45 }, { "Id": 8608, "Name": "Lâm Văn Thự", "DistrictId": 45 }, { "Id": 8617, "Name": "Bàu Tràm 1", "DistrictId": 45 }, { "Id": 8705, "Name": "Trung Lương 2", "DistrictId": 45 }, { "Id": 8724, "Name": "Thôi Hiệu", "DistrictId": 45 }, { "Id": 8730, "Name": "Hóa Mỹ", "DistrictId": 45 }, { "Id": 8733, "Name": "Nguyễn Hàng Chi", "DistrictId": 45 }, { "Id": 8757, "Name": "Cẩm Bắc 3", "DistrictId": 45 }, { "Id": 8776, "Name": "Bình Thái 1", "DistrictId": 45 }, { "Id": 8784, "Name": "Trung Lương 5", "DistrictId": 45 }, { "Id": 8816, "Name": "Nguyễn Hằng", "DistrictId": 45 }, { "Id": 8836, "Name": "Lư Giang", "DistrictId": 45 }, { "Id": 8851, "Name": "Cồn Dầu 2", "DistrictId": 45 }, { "Id": 8857, "Name": "Nguyễn Phú Hường", "DistrictId": 45 }, { "Id": 8858, "Name": "Lỗ Giáng 4", "DistrictId": 45 }, { "Id": 8881, "Name": "Trung Lương 3", "DistrictId": 45 }, { "Id": 8899, "Name": "Bùi Xuân Trạch", "DistrictId": 45 }, { "Id": 8914, "Name": "Trần Hữu Duẩn", "DistrictId": 45 }, { "Id": 8917, "Name": "Cẩm Nam 6", "DistrictId": 45 }, { "Id": 8918, "Name": "Liên Lạc 4", "DistrictId": 45 }, { "Id": 8919, "Name": "Cẩm Nam 2", "DistrictId": 45 }, { "Id": 8951, "Name": "Phong Bắc 9", "DistrictId": 45 }, { "Id": 8957, "Name": "Bình Thái 2", "DistrictId": 45 }, { "Id": 9068, "Name": "Nhơn Hòa 7", "DistrictId": 45 }, { "Id": 9073, "Name": "Lê Đình", "DistrictId": 45 }, { "Id": 9083, "Name": "Hoà Nam 2", "DistrictId": 45 }, { "Id": 9093, "Name": "Phong Bắc 4", "DistrictId": 45 }, { "Id": 9173, "Name": "Lỗ Giáng 7", "DistrictId": 45 }, { "Id": 9206, "Name": "Cẩm Chánh 5", "DistrictId": 45 }, { "Id": 9207, "Name": "Cẩm Bắc 9", "DistrictId": 45 }, { "Id": 9213, "Name": "Bình Hoà 4", "DistrictId": 45 }, { "Id": 9248, "Name": "Trần Kim Bảng", "DistrictId": 45 }, { "Id": 9251, "Name": "Hoàng Châu Ký", "DistrictId": 45 }, { "Id": 9260, "Name": "Cẩm Chánh 1", "DistrictId": 45 }, { "Id": 9276, "Name": "Hoà An 5", "DistrictId": 45 }, { "Id": 9292, "Name": "Bình Hoà 5", "DistrictId": 45 }, { "Id": 9306, "Name": "Lỗ Giáng 16", "DistrictId": 45 }, { "Id": 9324, "Name": "Bàu Gia Thượng 3", "DistrictId": 45 }, { "Id": 9327, "Name": "Bàu Gia Thượng 1", "DistrictId": 45 }, { "Id": 9328, "Name": "Liên Lạc 12", "DistrictId": 45 }, { "Id": 9332, "Name": "Nhơn Hoà 8", "DistrictId": 45 }, { "Id": 9334, "Name": "Bàu Gia Thượng 2", "DistrictId": 45 }, { "Id": 9338, "Name": "Nguyễn Đức Thiệu", "DistrictId": 45 }, { "Id": 9339, "Name": "An Hoà 1", "DistrictId": 45 }, { "Id": 9390, "Name": "Cổ Mân Mai 4", "DistrictId": 45 }, { "Id": 9393, "Name": "Cồn Dầu 3", "DistrictId": 45 }, { "Id": 9406, "Name": "Phong Bắc 2", "DistrictId": 45 }, { "Id": 9407, "Name": "Phong Bắc 11", "DistrictId": 45 }, { "Id": 11869, "Name": "14B", "DistrictId": 45 }, { "Id": 11870, "Name": "20", "DistrictId": 45 }, { "Id": 11871, "Name": "47", "DistrictId": 45 }, { "Id": 11872, "Name": "50", "DistrictId": 45 }, { "Id": 11873, "Name": "66", "DistrictId": 45 }, { "Id": 11874, "Name": "An Phú Đông 27", "DistrictId": 45 }, { "Id": 11875, "Name": "An Thượng 6", "DistrictId": 45 }, { "Id": 11876, "Name": "Bắc Sơn", "DistrictId": 45 }, { "Id": 11877, "Name": "Bãi Sậy", "DistrictId": 45 }, { "Id": 11878, "Name": "Bình Hòa", "DistrictId": 45 }, { "Id": 11879, "Name": "Bình Hòa 3", "DistrictId": 45 }, { "Id": 11880, "Name": "Bình Hòa 7", "DistrictId": 45 }, { "Id": 11881, "Name": "Bùi Hữu Nghĩa", "DistrictId": 45 }, { "Id": 11882, "Name": "Cách Mạng Tháng Tám", "DistrictId": 45 }, { "Id": 11883, "Name": "Cao Xuân Dục", "DistrictId": 45 }, { "Id": 11884, "Name": "Cao Xuân Huy", "DistrictId": 45 }, { "Id": 11885, "Name": "Cù Lao Thượng", "DistrictId": 45 }, { "Id": 11886, "Name": "D15", "DistrictId": 45 }, { "Id": 11887, "Name": "Đại lộ Thăng Long", "DistrictId": 45 }, { "Id": 11888, "Name": "Đàm Văn Lễ", "DistrictId": 45 }, { "Id": 11889, "Name": "Đặng Như Mai", "DistrictId": 45 }, { "Id": 11890, "Name": "Đặng Thai Mai", "DistrictId": 45 }, { "Id": 11891, "Name": "Đặng Văn Ngữ", "DistrictId": 45 }, { "Id": 11892, "Name": "Đặng Xuân Bảng", "DistrictId": 45 }, { "Id": 11893, "Name": "Đào Duy Anh", "DistrictId": 45 }, { "Id": 11894, "Name": "Điện Biên Phủ", "DistrictId": 45 }, { "Id": 11895, "Name": "Đình Đông", "DistrictId": 45 }, { "Id": 11896, "Name": "Đinh Liệt", "DistrictId": 45 }, { "Id": 11897, "Name": "Đỗ Đăng Tuyển", "DistrictId": 45 }, { "Id": 11898, "Name": "Đô Đốc Lộc", "DistrictId": 45 }, { "Id": 11899, "Name": "Đô Đốc Tuyết", "DistrictId": 45 }, { "Id": 11900, "Name": "Đỗ Thúc Tịnh", "DistrictId": 45 }, { "Id": 11901, "Name": "Đoàn Hữu Trưng", "DistrictId": 45 }, { "Id": 11902, "Name": "Đoàn Nguyễn Tuấn", "DistrictId": 45 }, { "Id": 11903, "Name": "Đội Cấn", "DistrictId": 45 }, { "Id": 11904, "Name": "Đội Cung", "DistrictId": 45 }, { "Id": 11905, "Name": "Đông Hưng Thuận 6", "DistrictId": 45 }, { "Id": 11906, "Name": "ĐT 741", "DistrictId": 45 }, { "Id": 11907, "Name": "ĐT 747", "DistrictId": 45 }, { "Id": 11908, "Name": "Dương Bá Cung", "DistrictId": 45 }, { "Id": 11909, "Name": "Dương Quảng Hàm", "DistrictId": 45 }, { "Id": 11910, "Name": "Hàn Giang", "DistrictId": 45 }, { "Id": 11911, "Name": "Hậu Lân", "DistrictId": 45 }, { "Id": 11912, "Name": "Hiệp Thành 13", "DistrictId": 45 }, { "Id": 11913, "Name": "Hổ Biểu Chánh", "DistrictId": 45 }, { "Id": 11914, "Name": "Hồ Ngọc Lãm", "DistrictId": 45 }, { "Id": 11915, "Name": "Hòa An 8", "DistrictId": 45 }, { "Id": 11916, "Name": "Hoàng Đạo Thúy", "DistrictId": 45 }, { "Id": 11917, "Name": "Hoàng Diệu", "DistrictId": 45 }, { "Id": 11918, "Name": "Hoàng Dư Khương", "DistrictId": 45 }, { "Id": 11919, "Name": "Hoàng Minh Giám", "DistrictId": 45 }, { "Id": 11920, "Name": "Hoàng Ngọc Phách", "DistrictId": 45 }, { "Id": 11921, "Name": "Hoàng Tăng Bí", "DistrictId": 45 }, { "Id": 11922, "Name": "Hoàng Văn Thái", "DistrictId": 45 }, { "Id": 11923, "Name": "Huỳnh Tấn Phát", "DistrictId": 45 }, { "Id": 11924, "Name": "Khởi Nghĩa Bắc Sơn", "DistrictId": 45 }, { "Id": 11925, "Name": "Khúc Hạo", "DistrictId": 45 }, { "Id": 11926, "Name": "Lê Cao Lãng", "DistrictId": 45 }, { "Id": 11927, "Name": "Lê Đại Hành", "DistrictId": 45 }, { "Id": 11928, "Name": "Lê Duẩn", "DistrictId": 45 }, { "Id": 11929, "Name": "Lê Lai", "DistrictId": 45 }, { "Id": 11930, "Name": "Lê Ngân", "DistrictId": 45 }, { "Id": 11931, "Name": "Lê Quang Định", "DistrictId": 45 }, { "Id": 11932, "Name": "Lê Thạch", "DistrictId": 45 }, { "Id": 11933, "Name": "Lê Trọng Tấn", "DistrictId": 45 }, { "Id": 11934, "Name": "Lê Văn Linh", "DistrictId": 45 }, { "Id": 11935, "Name": "Lộc Hòa", "DistrictId": 45 }, { "Id": 11936, "Name": "Lương Định Của", "DistrictId": 45 }, { "Id": 11937, "Name": "Lương Văn Can", "DistrictId": 45 }, { "Id": 11938, "Name": "Lưu Nhân Chú", "DistrictId": 45 }, { "Id": 11939, "Name": "Lý Ông Trọng", "DistrictId": 45 }, { "Id": 11940, "Name": "Mai Anh Tuấn", "DistrictId": 45 }, { "Id": 11941, "Name": "Mương Khai", "DistrictId": 45 }, { "Id": 11942, "Name": "Ngô Thì Nhậm", "DistrictId": 45 }, { "Id": 11943, "Name": "Nguyễn Công Hoan", "DistrictId": 45 }, { "Id": 11944, "Name": "Nguyễn Đăng Đạo", "DistrictId": 45 }, { "Id": 11945, "Name": "Nguyễn Dữ", "DistrictId": 45 }, { "Id": 11946, "Name": "Nguyễn Duy", "DistrictId": 45 }, { "Id": 11947, "Name": "Nguyễn Hành", "DistrictId": 45 }, { "Id": 11948, "Name": "Nguyễn Hữu Thọ", "DistrictId": 45 }, { "Id": 11949, "Name": "Nguyễn Hữu Tiến", "DistrictId": 45 }, { "Id": 11950, "Name": "Nguyễn Huy Chương", "DistrictId": 45 }, { "Id": 11951, "Name": "Nguyễn Huy Tưởng", "DistrictId": 45 }, { "Id": 11952, "Name": "Nguyễn Khanh", "DistrictId": 45 }, { "Id": 11953, "Name": "Nguyễn Lương Bằng", "DistrictId": 45 }, { "Id": 11954, "Name": "Nguyễn Phong Sắc", "DistrictId": 45 }, { "Id": 11955, "Name": "Nguyễn Quý Đức", "DistrictId": 45 }, { "Id": 11956, "Name": "Nguyễn Quyền", "DistrictId": 45 }, { "Id": 11957, "Name": "Nguyễn Tất Thành", "DistrictId": 45 }, { "Id": 11958, "Name": "Nguyễn Thượng Hiền", "DistrictId": 45 }, { "Id": 11959, "Name": "Nguyễn Tri Phương", "DistrictId": 45 }, { "Id": 11960, "Name": "Nguyễn Trung Ngạn", "DistrictId": 45 }, { "Id": 11961, "Name": "Nguyễn Văn Huyên", "DistrictId": 45 }, { "Id": 11962, "Name": "Nguyễn Văn Tạo", "DistrictId": 45 }, { "Id": 11963, "Name": "Núi Một", "DistrictId": 45 }, { "Id": 11964, "Name": "Ông Ích Đường", "DistrictId": 45 }, { "Id": 11965, "Name": "Ông Ích Khiêm", "DistrictId": 45 }, { "Id": 11966, "Name": "Pasteur", "DistrictId": 45 }, { "Id": 11967, "Name": "Phạm Bành", "DistrictId": 45 }, { "Id": 11968, "Name": "Phạm Công Trứ", "DistrictId": 45 }, { "Id": 11969, "Name": "Phạm Hùng", "DistrictId": 45 }, { "Id": 11970, "Name": "Phạm Phú Tiết", "DistrictId": 45 }, { "Id": 11971, "Name": "Phạm Sư Mạnh", "DistrictId": 45 }, { "Id": 11972, "Name": "Phạm Viết Chánh", "DistrictId": 45 }, { "Id": 11973, "Name": "Phan Anh", "DistrictId": 45 }, { "Id": 11974, "Name": "Phan Châu Trinh", "DistrictId": 45 }, { "Id": 11975, "Name": "Phan Chu Trinh", "DistrictId": 45 }, { "Id": 11976, "Name": "Phan Đăng Lưu", "DistrictId": 45 }, { "Id": 11977, "Name": "Phan Văn Trị", "DistrictId": 45 }, { "Id": 11978, "Name": "Phú Trung", "DistrictId": 45 }, { "Id": 11979, "Name": "Tân Chánh Hiệp 16", "DistrictId": 45 }, { "Id": 11980, "Name": "Tân Chánh Hiệp 2", "DistrictId": 45 }, { "Id": 11981, "Name": "Tân Thới Hiệp 10", "DistrictId": 45 }, { "Id": 11982, "Name": "Thăng  Long", "DistrictId": 45 }, { "Id": 11983, "Name": "Thạnh Lộc 27", "DistrictId": 45 }, { "Id": 11984, "Name": "Thành Thái", "DistrictId": 45 }, { "Id": 11985, "Name": "Thạnh Xuân 13", "DistrictId": 45 }, { "Id": 11986, "Name": "Thạnh Xuân 21", "DistrictId": 45 }, { "Id": 11987, "Name": "Thích Bửu Đăng", "DistrictId": 45 }, { "Id": 11988, "Name": "Tiền Đức", "DistrictId": 45 }, { "Id": 11989, "Name": "Tố Hữu", "DistrictId": 45 }, { "Id": 11990, "Name": "Tô Vĩnh Diện", "DistrictId": 45 }, { "Id": 11991, "Name": "Tôn Đản", "DistrictId": 45 }, { "Id": 11992, "Name": "Tôn Đức Thắng", "DistrictId": 45 }, { "Id": 11993, "Name": "Tôn Thất Thuyết", "DistrictId": 45 }, { "Id": 11994, "Name": "Trại Gà", "DistrictId": 45 }, { "Id": 11995, "Name": "Trần Cao Vân", "DistrictId": 45 }, { "Id": 11996, "Name": "Trần Huy Liệu", "DistrictId": 45 }, { "Id": 11997, "Name": "Trần Mai Ninh", "DistrictId": 45 }, { "Id": 11998, "Name": "Trần Quang Đạo", "DistrictId": 45 }, { "Id": 11999, "Name": "Trần Quốc Thảo", "DistrictId": 45 }, { "Id": 12000, "Name": "Trần Quốc Toản", "DistrictId": 45 }, { "Id": 12001, "Name": "Trần Tấn Mới", "DistrictId": 45 }, { "Id": 12002, "Name": "Trần Thủ Độ", "DistrictId": 45 }, { "Id": 12003, "Name": "Trần Tử Bình", "DistrictId": 45 }, { "Id": 12004, "Name": "Trần Văn Đang", "DistrictId": 45 }, { "Id": 12005, "Name": "Trần Văn Dư", "DistrictId": 45 }, { "Id": 12006, "Name": "Trần Văn Ơn", "DistrictId": 45 }, { "Id": 12007, "Name": "Trần Văn Trà", "DistrictId": 45 }, { "Id": 12008, "Name": "Trần Xuân Soạn", "DistrictId": 45 }, { "Id": 12009, "Name": "Trích Sài", "DistrictId": 45 }, { "Id": 12010, "Name": "Triệu Quốc Đạt", "DistrictId": 45 }, { "Id": 12011, "Name": "Trịnh Đình Thảo", "DistrictId": 45 }, { "Id": 12012, "Name": "Trịnh Hoài Đức", "DistrictId": 45 }, { "Id": 12013, "Name": "Trường Chinh", "DistrictId": 45 }, { "Id": 12014, "Name": "Trường Sơn", "DistrictId": 45 }, { "Id": 12015, "Name": "Trương Văn Đa", "DistrictId": 45 }, { "Id": 12016, "Name": "Tú Mỡ", "DistrictId": 45 }, { "Id": 12017, "Name": "Văn Tiến Dũng", "DistrictId": 45 }, { "Id": 12018, "Name": "Võ Chí Công", "DistrictId": 45 }, { "Id": 12019, "Name": "Võ Quảng", "DistrictId": 45 }, { "Id": 12020, "Name": "Vũ Quỳnh", "DistrictId": 45 }, { "Id": 12021, "Name": "Vũ Tông Phan", "DistrictId": 45 }, { "Id": 12022, "Name": "Xa La", "DistrictId": 45 }, { "Id": 12023, "Name": "Xô Viết Nghệ Tĩnh", "DistrictId": 45 }, { "Id": 12024, "Name": "Xuân Thủy", "DistrictId": 45 }, { "Id": 12025, "Name": "Yên Thế", "DistrictId": 45 }, { "Id": 20247, "Name": "Cẩm Bắc 10", "DistrictId": 45 }, { "Id": 20248, "Name": "Hoàng Thị Ái", "DistrictId": 45 }, { "Id": 20249, "Name": "Hoàng Xuân Hãn", "DistrictId": 45 }, { "Id": 20250, "Name": "Lỗ Giáng 19", "DistrictId": 45 }, { "Id": 20251, "Name": "Nhất Chi Mai", "DistrictId": 45 }, { "Id": 20252, "Name": "Trừ Văn Thố", "DistrictId": 45 }] }, { "Id": 46, "Name": "Hải Châu", "CityId": 4, "Wards": [{ "Id": 238, "Name": " Hải Châu I", "DistrictId": 46 }, { "Id": 239, "Name": "Hải Châu II", "DistrictId": 46 }, { "Id": 240, "Name": "Thạch Thang", "DistrictId": 46 }, { "Id": 241, "Name": "Thanh Bình", "DistrictId": 46 }, { "Id": 242, "Name": "Thuận Phước", "DistrictId": 46 }, { "Id": 243, "Name": " Hòa Thuận Đông", "DistrictId": 46 }, { "Id": 244, "Name": "Hòa Thuận Tây", "DistrictId": 46 }, { "Id": 245, "Name": "Nam Dương", "DistrictId": 46 }, { "Id": 246, "Name": "Phước Ninh", "DistrictId": 46 }, { "Id": 247, "Name": "Bình Thuận", "DistrictId": 46 }, { "Id": 248, "Name": "Bình Hiên", "DistrictId": 46 }, { "Id": 249, "Name": "Hòa Cường Bắc", "DistrictId": 46 }, { "Id": 250, "Name": "Hòa Cường Nam", "DistrictId": 46 }], "Streets": [{ "Id": 2007, "Name": "Châu Thượng Văn", "DistrictId": 46 }, { "Id": 2024, "Name": "Dương Thưởng", "DistrictId": 46 }, { "Id": 2025, "Name": "Dương Thanh", "DistrictId": 46 }, { "Id": 2026, "Name": "Dương Thạc", "DistrictId": 46 }, { "Id": 2101, "Name": "Đặng Tử Kính", "DistrictId": 46 }, { "Id": 2133, "Name": "Hồ Nghinh", "DistrictId": 46 }, { "Id": 2208, "Name": "Chi Lăng", "DistrictId": 46 }, { "Id": 2383, "Name": "Lê Duy Lương", "DistrictId": 46 }, { "Id": 2413, "Name": "Tân An 1", "DistrictId": 46 }, { "Id": 2414, "Name": "Tân An 2", "DistrictId": 46 }, { "Id": 2415, "Name": "Tân An 3", "DistrictId": 46 }, { "Id": 2416, "Name": "Tân An 4", "DistrictId": 46 }, { "Id": 2428, "Name": "Thanh Duyên", "DistrictId": 46 }, { "Id": 2429, "Name": "Thanh Hải", "DistrictId": 46 }, { "Id": 2432, "Name": "Thanh Huy 3", "DistrictId": 46 }, { "Id": 2435, "Name": "Thanh Long", "DistrictId": 46 }, { "Id": 2436, "Name": "Thanh Sơn", "DistrictId": 46 }, { "Id": 2437, "Name": "Thanh Thủy", "DistrictId": 46 }, { "Id": 2438, "Name": "Thuận An 1", "DistrictId": 46 }, { "Id": 2473, "Name": "Tiên Sơn 1", "DistrictId": 46 }, { "Id": 2481, "Name": "Tiên Sơn 2", "DistrictId": 46 }, { "Id": 2482, "Name": "Tiên Sơn 3", "DistrictId": 46 }, { "Id": 2483, "Name": "Tiên Sơn 4", "DistrictId": 46 }, { "Id": 2484, "Name": "Tiên Sơn 5", "DistrictId": 46 }, { "Id": 2486, "Name": "Tiên Sơn 6", "DistrictId": 46 }, { "Id": 2487, "Name": "Tiên Sơn 7", "DistrictId": 46 }, { "Id": 2488, "Name": "Tiên Sơn 8", "DistrictId": 46 }, { "Id": 2489, "Name": "Tiên Sơn 9", "DistrictId": 46 }, { "Id": 2492, "Name": "Tiên Sơn 10", "DistrictId": 46 }, { "Id": 2493, "Name": "Tiên Sơn 11", "DistrictId": 46 }, { "Id": 2496, "Name": "Tiên Sơn 14", "DistrictId": 46 }, { "Id": 2501, "Name": "Tiên Sơn 17", "DistrictId": 46 }, { "Id": 2505, "Name": "Tiên Sơn 20", "DistrictId": 46 }, { "Id": 2556, "Name": "Yên Bái", "DistrictId": 46 }, { "Id": 2854, "Name": "Hải Phòng", "DistrictId": 46 }, { "Id": 2858, "Name": "Hải Sơn", "DistrictId": 46 }, { "Id": 3109, "Name": "Tiên Sơn", "DistrictId": 46 }, { "Id": 3425, "Name": "Lê Bá Trinh", "DistrictId": 46 }, { "Id": 3432, "Name": "Nguyễn Xuân Nhĩ", "DistrictId": 46 }, { "Id": 3443, "Name": "Huỳnh Lý", "DistrictId": 46 }, { "Id": 3449, "Name": "Tiểu La", "DistrictId": 46 }, { "Id": 3747, "Name": "Trần Can", "DistrictId": 46 }, { "Id": 3909, "Name": "Ngô Thế Vinh", "DistrictId": 46 }, { "Id": 4081, "Name": "Trịnh Công Sơn", "DistrictId": 46 }, { "Id": 5662, "Name": "Ông Ích Khiên", "DistrictId": 46 }, { "Id": 5666, "Name": "Tống Phước Phổ", "DistrictId": 46 }, { "Id": 5823, "Name": "Nguyễn Trác Luân", "DistrictId": 46 }, { "Id": 5857, "Name": "Phan Thanh", "DistrictId": 46 }, { "Id": 5870, "Name": "Nguyễn Thành Hãn", "DistrictId": 46 }, { "Id": 5885, "Name": "Ngô Thị Liễu", "DistrictId": 46 }, { "Id": 5887, "Name": "Bầu Hạc 5", "DistrictId": 46 }, { "Id": 5890, "Name": "Lê Đình Duy", "DistrictId": 46 }, { "Id": 5904, "Name": "Trương Chí Cương", "DistrictId": 46 }, { "Id": 5912, "Name": "Ỷ Lan Nguyên Phi", "DistrictId": 46 }, { "Id": 5949, "Name": "Lê Đình Lý", "DistrictId": 46 }, { "Id": 5958, "Name": "Triệu Nữ Vương", "DistrictId": 46 }, { "Id": 6027, "Name": "Thân Cảnh Phúc", "DistrictId": 46 }, { "Id": 6028, "Name": "Bình Minh 3", "DistrictId": 46 }, { "Id": 6055, "Name": "Hải Hồ", "DistrictId": 46 }, { "Id": 6058, "Name": "Như Nguyệt", "DistrictId": 46 }, { "Id": 6111, "Name": "Phan Thành Tài", "DistrictId": 46 }, { "Id": 6235, "Name": "Yên Báy", "DistrictId": 46 }, { "Id": 6252, "Name": "Hoàn Văn Thủ", "DistrictId": 46 }, { "Id": 6254, "Name": "Nguyễn Đức Trung", "DistrictId": 46 }, { "Id": 6278, "Name": "Trần Đức Thảo", "DistrictId": 46 }, { "Id": 6287, "Name": "Nguyễn Trừng", "DistrictId": 46 }, { "Id": 6308, "Name": "Hóa Sơn 2", "DistrictId": 46 }, { "Id": 6327, "Name": "Nguyễn Phẩm", "DistrictId": 46 }, { "Id": 6330, "Name": "Bắc Đẩu", "DistrictId": 46 }, { "Id": 6396, "Name": "Mỹ An 7", "DistrictId": 46 }, { "Id": 6434, "Name": "Hóa Sơn 1", "DistrictId": 46 }, { "Id": 6437, "Name": "Lê khắc Cần", "DistrictId": 46 }, { "Id": 6452, "Name": "Hóa Sơn 3", "DistrictId": 46 }, { "Id": 6480, "Name": "Hoàng Thúc Trâm", "DistrictId": 46 }, { "Id": 6614, "Name": "Hồ Tông Thốc", "DistrictId": 46 }, { "Id": 6635, "Name": "Lê Nổ", "DistrictId": 46 }, { "Id": 6639, "Name": "Phạm Như Sương", "DistrictId": 46 }, { "Id": 6663, "Name": "Nguyễn Trác", "DistrictId": 46 }, { "Id": 6679, "Name": "Phan Đình", "DistrictId": 46 }, { "Id": 6787, "Name": "Bầu Trảng 2", "DistrictId": 46 }, { "Id": 6910, "Name": "Ka Văn Thịnh", "DistrictId": 46 }, { "Id": 6991, "Name": "Lê Văn Long", "DistrictId": 46 }, { "Id": 7044, "Name": "Bình An 1", "DistrictId": 46 }, { "Id": 7120, "Name": "Lê Văn Đức", "DistrictId": 46 }, { "Id": 7279, "Name": "Phần Lăng 17", "DistrictId": 46 }, { "Id": 7291, "Name": "Mai Dị", "DistrictId": 46 }, { "Id": 7292, "Name": "Trần Cừ", "DistrictId": 46 }, { "Id": 7306, "Name": "Hóa Sơn 4", "DistrictId": 46 }, { "Id": 7380, "Name": "Nam Sơn 5", "DistrictId": 46 }, { "Id": 7696, "Name": "Hóa Sơn 6", "DistrictId": 46 }, { "Id": 7756, "Name": "Bàu Tràm", "DistrictId": 46 }, { "Id": 7859, "Name": "Hưng Hoá 2", "DistrictId": 46 }, { "Id": 7866, "Name": "Đỗ Xuân Cát", "DistrictId": 46 }, { "Id": 8017, "Name": "Phần Lăng 18", "DistrictId": 46 }, { "Id": 8178, "Name": "Bình An 6", "DistrictId": 46 }, { "Id": 8196, "Name": "Hưng Hóa 6", "DistrictId": 46 }, { "Id": 8318, "Name": "Đoàn Quý Phi", "DistrictId": 46 }, { "Id": 8511, "Name": "Phần Lăng 14", "DistrictId": 46 }, { "Id": 8512, "Name": "Phần Lăng 15", "DistrictId": 46 }, { "Id": 8523, "Name": "Bình An 3", "DistrictId": 46 }, { "Id": 8527, "Name": "Phần Lăng 16", "DistrictId": 46 }, { "Id": 8621, "Name": "Bàu Hạc 2", "DistrictId": 46 }, { "Id": 8665, "Name": "Hưng Hóa 4", "DistrictId": 46 }, { "Id": 8690, "Name": "Bình An 2", "DistrictId": 46 }, { "Id": 8789, "Name": "Đầm Rong 2", "DistrictId": 46 }, { "Id": 8971, "Name": "Nguyễn Sơn Trà", "DistrictId": 46 }, { "Id": 9188, "Name": "Đức Lợi 3", "DistrictId": 46 }, { "Id": 9263, "Name": "Bình An 4", "DistrictId": 46 }, { "Id": 9282, "Name": "Nam Sơn 3", "DistrictId": 46 }, { "Id": 9349, "Name": "Lê Đại", "DistrictId": 46 }, { "Id": 9356, "Name": "Phần Lăng 19", "DistrictId": 46 }, { "Id": 9405, "Name": "Hưng Hoá 1", "DistrictId": 46 }, { "Id": 12026, "Name": "2/9", "DistrictId": 46 }, { "Id": 12027, "Name": "21E", "DistrictId": 46 }, { "Id": 12028, "Name": "22", "DistrictId": 46 }, { "Id": 12029, "Name": "3/2", "DistrictId": 46 }, { "Id": 12030, "Name": "30/4", "DistrictId": 46 }, { "Id": 12031, "Name": "Ba Đình", "DistrictId": 46 }, { "Id": 12032, "Name": "Bà Huyện Thanh Quan", "DistrictId": 46 }, { "Id": 12033, "Name": "Bạch Đằng", "DistrictId": 46 }, { "Id": 12034, "Name": "Bàu Tràm 2", "DistrictId": 46 }, { "Id": 12035, "Name": "Bình Minh", "DistrictId": 46 }, { "Id": 12036, "Name": "Bình Minh 1", "DistrictId": 46 }, { "Id": 12037, "Name": "Bình Minh 2", "DistrictId": 46 }, { "Id": 12038, "Name": "Bùi Kỷ", "DistrictId": 46 }, { "Id": 12039, "Name": "Bùi Viện", "DistrictId": 46 }, { "Id": 12040, "Name": "Bùi Xuân Phái", "DistrictId": 46 }, { "Id": 12041, "Name": "Ca Văn Thỉnh", "DistrictId": 46 }, { "Id": 12042, "Name": "Cầm Bá Thước", "DistrictId": 46 }, { "Id": 12043, "Name": "Cao Thắng", "DistrictId": 46 }, { "Id": 12044, "Name": "Cao Xuân Dục", "DistrictId": 46 }, { "Id": 12045, "Name": "Châu Văn Liêm", "DistrictId": 46 }, { "Id": 12046, "Name": "Chu Mạnh Trinh", "DistrictId": 46 }, { "Id": 12047, "Name": "Chu Văn An", "DistrictId": 46 }, { "Id": 12048, "Name": "Cô Bắc", "DistrictId": 46 }, { "Id": 12049, "Name": "Cô Giang", "DistrictId": 46 }, { "Id": 12050, "Name": "Đại lộ Thăng Long", "DistrictId": 46 }, { "Id": 12051, "Name": "Đặng Thai Mai", "DistrictId": 46 }, { "Id": 12052, "Name": "Đặng Thùy Trâm", "DistrictId": 46 }, { "Id": 12053, "Name": "Đào Cam Mộc", "DistrictId": 46 }, { "Id": 12054, "Name": "Đào Duy Anh", "DistrictId": 46 }, { "Id": 12055, "Name": "Đào Tấn", "DistrictId": 46 }, { "Id": 12056, "Name": "Đào Trí", "DistrictId": 46 }, { "Id": 12057, "Name": "Điện Biên Phủ", "DistrictId": 46 }, { "Id": 12058, "Name": "Đinh Công Tráng", "DistrictId": 46 }, { "Id": 12059, "Name": "Đinh Tiên Hoàng", "DistrictId": 46 }, { "Id": 12060, "Name": "Đỗ Quang", "DistrictId": 46 }, { "Id": 12061, "Name": "Đoàn Thị Điểm", "DistrictId": 46 }, { "Id": 12062, "Name": "Đốc Ngữ", "DistrictId": 46 }, { "Id": 12063, "Name": "Đống Đa", "DistrictId": 46 }, { "Id": 12064, "Name": "Dương Bá Trạc", "DistrictId": 46 }, { "Id": 12065, "Name": "Duy Tân", "DistrictId": 46 }, { "Id": 12066, "Name": "Giang Văn Minh", "DistrictId": 46 }, { "Id": 12067, "Name": "Hà Bá Tường", "DistrictId": 46 }, { "Id": 12068, "Name": "Hà Huy Giáp", "DistrictId": 46 }, { "Id": 12069, "Name": "Hà Huy Tập", "DistrictId": 46 }, { "Id": 12070, "Name": "Hàm Nghi", "DistrictId": 46 }, { "Id": 12071, "Name": "Hàn Mặc Tử", "DistrictId": 46 }, { "Id": 12072, "Name": "Hàn Thuyên", "DistrictId": 46 }, { "Id": 12073, "Name": "Hồ Biểu Chánh", "DistrictId": 46 }, { "Id": 12074, "Name": "Hổ Biểu Chánh", "DistrictId": 46 }, { "Id": 12075, "Name": "Hồ Nguyên Trừng", "DistrictId": 46 }, { "Id": 12076, "Name": "Hoàng Diệu", "DistrictId": 46 }, { "Id": 12077, "Name": "Hoàng Hoa Thám", "DistrictId": 46 }, { "Id": 12078, "Name": "Hoàng Tích Trí", "DistrictId": 46 }, { "Id": 12079, "Name": "Hoàng Văn Thụ", "DistrictId": 46 }, { "Id": 12080, "Name": "Hoàng Xuân Nhị", "DistrictId": 46 }, { "Id": 12081, "Name": "Hưng Hóa", "DistrictId": 46 }, { "Id": 12082, "Name": "Hùng Vương", "DistrictId": 46 }, { "Id": 12083, "Name": "Huy Cận", "DistrictId": 46 }, { "Id": 12084, "Name": "Huỳnh Mẫn Đạt", "DistrictId": 46 }, { "Id": 12085, "Name": "Huỳnh Ngọc Huệ", "DistrictId": 46 }, { "Id": 12086, "Name": "Huỳnh Tấn Phát", "DistrictId": 46 }, { "Id": 12087, "Name": "Huỳnh Thúc Kháng", "DistrictId": 46 }, { "Id": 12088, "Name": "Lê Anh Xuân", "DistrictId": 46 }, { "Id": 12089, "Name": "Lê Cơ", "DistrictId": 46 }, { "Id": 12090, "Name": "Lê Đại Hành", "DistrictId": 46 }, { "Id": 12091, "Name": "Lê Đình Dương", "DistrictId": 46 }, { "Id": 12092, "Name": "Lê Đình Thám", "DistrictId": 46 }, { "Id": 12093, "Name": "Lê Duẩn", "DistrictId": 46 }, { "Id": 12094, "Name": "Lê Hồng Phong", "DistrictId": 46 }, { "Id": 12095, "Name": "Lê Khôi", "DistrictId": 46 }, { "Id": 12096, "Name": "Lê Lai", "DistrictId": 46 }, { "Id": 12097, "Name": "Lê Lợi", "DistrictId": 46 }, { "Id": 12098, "Name": "Lê Quý Đôn", "DistrictId": 46 }, { "Id": 12099, "Name": "Lê Sát", "DistrictId": 46 }, { "Id": 12100, "Name": "Lê Thanh Nghị", "DistrictId": 46 }, { "Id": 12101, "Name": "Lê Thánh Tôn", "DistrictId": 46 }, { "Id": 12102, "Name": "Lê Thị Hồng Gấm", "DistrictId": 46 }, { "Id": 12103, "Name": "Lê Văn Hiến", "DistrictId": 46 }, { "Id": 12104, "Name": "Lê Vĩnh Huy", "DistrictId": 46 }, { "Id": 12105, "Name": "Lương Ngọc Quyến", "DistrictId": 46 }, { "Id": 12106, "Name": "Lương Nhữ Học", "DistrictId": 46 }, { "Id": 12107, "Name": "Lưu Quý Kỳ", "DistrictId": 46 }, { "Id": 12108, "Name": "Lưu Trọng Lư", "DistrictId": 46 }, { "Id": 12109, "Name": "Lý Nhân Tông", "DistrictId": 46 }, { "Id": 12110, "Name": "Lý Thái Tổ", "DistrictId": 46 }, { "Id": 12111, "Name": "Lý Thái Tông", "DistrictId": 46 }, { "Id": 12112, "Name": "Lý Thường Kiệt", "DistrictId": 46 }, { "Id": 12113, "Name": "Lý Tự Trọng", "DistrictId": 46 }, { "Id": 12114, "Name": "Mạc Đĩnh Chi", "DistrictId": 46 }, { "Id": 12115, "Name": "Mạc Thị Bưởi", "DistrictId": 46 }, { "Id": 12116, "Name": "Mai Am", "DistrictId": 46 }, { "Id": 12117, "Name": "Mai Lão Bạng", "DistrictId": 46 }, { "Id": 12118, "Name": "Man Thiện", "DistrictId": 46 }, { "Id": 12119, "Name": "Nam Sơn", "DistrictId": 46 }, { "Id": 12120, "Name": "Ngô Chi Lan", "DistrictId": 46 }, { "Id": 12121, "Name": "Ngô Gia Tự", "DistrictId": 46 }, { "Id": 12122, "Name": "Ngô Tất Tố", "DistrictId": 46 }, { "Id": 12123, "Name": "Nguyễn An Ninh", "DistrictId": 46 }, { "Id": 12124, "Name": "Nguyễn Bá Học", "DistrictId": 46 }, { "Id": 12125, "Name": "Nguyễn Bình", "DistrictId": 46 }, { "Id": 12126, "Name": "Nguyễn Chí Thanh", "DistrictId": 46 }, { "Id": 12127, "Name": "Nguyễn Cư Trinh", "DistrictId": 46 }, { "Id": 12128, "Name": "Nguyễn Đăng Đạo", "DistrictId": 46 }, { "Id": 12129, "Name": "Nguyễn Đôn Tiết", "DistrictId": 46 }, { "Id": 12130, "Name": "Nguyễn Đổng Chi", "DistrictId": 46 }, { "Id": 12131, "Name": "Nguyễn Du", "DistrictId": 46 }, { "Id": 12132, "Name": "Nguyễn Đức Cảnh", "DistrictId": 46 }, { "Id": 12133, "Name": "Nguyễn Gia Thiều", "DistrictId": 46 }, { "Id": 12134, "Name": "Nguyễn Hoàng", "DistrictId": 46 }, { "Id": 12135, "Name": "Nguyễn Hữu Cảnh", "DistrictId": 46 }, { "Id": 12136, "Name": "Nguyễn Hữu Dật", "DistrictId": 46 }, { "Id": 12137, "Name": "Nguyễn Hữu Thọ", "DistrictId": 46 }, { "Id": 12138, "Name": "Nguyễn Khánh Toàn", "DistrictId": 46 }, { "Id": 12139, "Name": "Nguyễn Khoái", "DistrictId": 46 }, { "Id": 12140, "Name": "Nguyễn Lộ Trạch", "DistrictId": 46 }, { "Id": 12141, "Name": "Nguyễn Phi Khanh", "DistrictId": 46 }, { "Id": 12142, "Name": "Nguyễn Phong Sắc", "DistrictId": 46 }, { "Id": 12143, "Name": "Nguyễn Quang Bích", "DistrictId": 46 }, { "Id": 12144, "Name": "Nguyễn Sơn", "DistrictId": 46 }, { "Id": 12145, "Name": "Nguyễn Sơn Hà", "DistrictId": 46 }, { "Id": 12146, "Name": "Nguyễn Súy", "DistrictId": 46 }, { "Id": 12147, "Name": "Nguyễn Tất Thành", "DistrictId": 46 }, { "Id": 12148, "Name": "Nguyễn Thái Học", "DistrictId": 46 }, { "Id": 12149, "Name": "Nguyễn Thành Ý", "DistrictId": 46 }, { "Id": 12150, "Name": "Nguyễn Thi", "DistrictId": 46 }, { "Id": 12151, "Name": "Nguyễn Thị Minh Khai", "DistrictId": 46 }, { "Id": 12152, "Name": "Nguyễn Thiện Thuật", "DistrictId": 46 }, { "Id": 12153, "Name": "Nguyễn Trãi", "DistrictId": 46 }, { "Id": 12154, "Name": "Nguyễn Tri Phương", "DistrictId": 46 }, { "Id": 12155, "Name": "Nguyễn Trường Tộ", "DistrictId": 46 }, { "Id": 12156, "Name": "Nguyễn Văn Linh", "DistrictId": 46 }, { "Id": 12157, "Name": "Nguyễn Văn Tố", "DistrictId": 46 }, { "Id": 12158, "Name": "Nguyễn Xuân Ôn", "DistrictId": 46 }, { "Id": 12159, "Name": "Nơ Trang Long", "DistrictId": 46 }, { "Id": 12160, "Name": "Núi Thành", "DistrictId": 46 }, { "Id": 12161, "Name": "Ông Ích Khiêm", "DistrictId": 46 }, { "Id": 12162, "Name": "Pasteur", "DistrictId": 46 }, { "Id": 12163, "Name": "Phạm Hồng Thái", "DistrictId": 46 }, { "Id": 12164, "Name": "Phạm Ngọc Thạch", "DistrictId": 46 }, { "Id": 12165, "Name": "Phạm Phú Thứ", "DistrictId": 46 }, { "Id": 12166, "Name": "Phạm Phú Tiết", "DistrictId": 46 }, { "Id": 12167, "Name": "Phạm Thế Hiển", "DistrictId": 46 }, { "Id": 12168, "Name": "Phạm Văn Bạch", "DistrictId": 46 }, { "Id": 12169, "Name": "Phạm Văn Đồng", "DistrictId": 46 }, { "Id": 12170, "Name": "Phạm Văn Nghị", "DistrictId": 46 }, { "Id": 12171, "Name": "Phan Anh", "DistrictId": 46 }, { "Id": 12172, "Name": "Phan Bội Châu", "DistrictId": 46 }, { "Id": 12173, "Name": "Phan Châu Trinh", "DistrictId": 46 }, { "Id": 12174, "Name": "Phan Chu Trinh", "DistrictId": 46 }, { "Id": 12175, "Name": "Phan Đăng Lưu", "DistrictId": 46 }, { "Id": 12176, "Name": "Phan Đình Phùng", "DistrictId": 46 }, { "Id": 12177, "Name": "Phan Huy Ôn", "DistrictId": 46 }, { "Id": 12178, "Name": "Phan Kế Bính", "DistrictId": 46 }, { "Id": 12179, "Name": "Phan Trọng Tuệ", "DistrictId": 46 }, { "Id": 12180, "Name": "Quang Trung", "DistrictId": 46 }, { "Id": 12181, "Name": "Tạ Hiện", "DistrictId": 46 }, { "Id": 12182, "Name": "Tân An", "DistrictId": 46 }, { "Id": 12183, "Name": "Tân Lập 1", "DistrictId": 46 }, { "Id": 12184, "Name": "Tăng Bạt Hổ", "DistrictId": 46 }, { "Id": 12185, "Name": "Thái Phiên", "DistrictId": 46 }, { "Id": 12186, "Name": "Thăng  Long", "DistrictId": 46 }, { "Id": 12187, "Name": "Thi Sách", "DistrictId": 46 }, { "Id": 12188, "Name": "Tố Hữu", "DistrictId": 46 }, { "Id": 12189, "Name": "Tôn Thất Đạm", "DistrictId": 46 }, { "Id": 12190, "Name": "Trần Bình Trọng", "DistrictId": 46 }, { "Id": 12191, "Name": "Trần Cao Vân", "DistrictId": 46 }, { "Id": 12192, "Name": "Trần Cung", "DistrictId": 46 }, { "Id": 12193, "Name": "Trần Đăng Ninh", "DistrictId": 46 }, { "Id": 12194, "Name": "Trần Hưng Đạo", "DistrictId": 46 }, { "Id": 12195, "Name": "Trần Hữu Trang", "DistrictId": 46 }, { "Id": 12196, "Name": "Trần Kế Xương", "DistrictId": 46 }, { "Id": 12197, "Name": "Trần Nhân Tông", "DistrictId": 46 }, { "Id": 12198, "Name": "Trần Phú", "DistrictId": 46 }, { "Id": 12199, "Name": "Trần Quốc Toản", "DistrictId": 46 }, { "Id": 12200, "Name": "Trần Quý Cáp", "DistrictId": 46 }, { "Id": 12201, "Name": "Trần Tấn Mới", "DistrictId": 46 }, { "Id": 12202, "Name": "Trần Thủ Độ", "DistrictId": 46 }, { "Id": 12203, "Name": "Trần Văn Giáp", "DistrictId": 46 }, { "Id": 12204, "Name": "Trưng Nhị", "DistrictId": 46 }, { "Id": 12205, "Name": "Trưng Nữ Vương", "DistrictId": 46 }, { "Id": 12206, "Name": "Trương Hán Siêu", "DistrictId": 46 }, { "Id": 12207, "Name": "Tuệ Tĩnh", "DistrictId": 46 }, { "Id": 12208, "Name": "Võ Văn Tần", "DistrictId": 46 }, { "Id": 12209, "Name": "Vũ Hữu", "DistrictId": 46 }, { "Id": 12210, "Name": "Vũ Trọng Phụng", "DistrictId": 46 }, { "Id": 12211, "Name": "Xô Viết Nghệ Tĩnh", "DistrictId": 46 }, { "Id": 12212, "Name": "Xuân Diệu", "DistrictId": 46 }, { "Id": 20253, "Name": "Lương Nhữ Hộc", "DistrictId": 46 }, { "Id": 20317, "Name": "Nguyễn Đình Chiểu", "DistrictId": 46 }] }, { "Id": 47, "Name": "Liên Chiểu", "CityId": 4, "Wards": [{ "Id": 216, "Name": "Hòa Minh", "DistrictId": 47 }, { "Id": 217, "Name": "Hòa Khánh Nam", "DistrictId": 47 }, { "Id": 218, "Name": "Hòa Khánh Bắc", "DistrictId": 47 }, { "Id": 219, "Name": "Hòa Hiệp Nam", "DistrictId": 47 }, { "Id": 220, "Name": "Hòa Hiệp Bắc", "DistrictId": 47 }], "Streets": [{ "Id": 1926, "Name": "Bùi Chát", "DistrictId": 47 }, { "Id": 2018, "Name": "Dương Bích Liên", "DistrictId": 47 }, { "Id": 2046, "Name": "Đàm Quang Trung", "DistrictId": 47 }, { "Id": 2051, "Name": "Ngô Xuân Thu", "DistrictId": 47 }, { "Id": 2052, "Name": "Nguyễn Như Hạnh", "DistrictId": 47 }, { "Id": 2054, "Name": "Ngô Chân Lưu", "DistrictId": 47 }, { "Id": 2056, "Name": "Chơn Tâm", "DistrictId": 47 }, { "Id": 2057, "Name": "Đà Sơn", "DistrictId": 47 }, { "Id": 2059, "Name": "Nguyễn Bá Phát", "DistrictId": 47 }, { "Id": 2071, "Name": "Đặng Huy Trứ", "DistrictId": 47 }, { "Id": 2117, "Name": "Đào Công Soạn", "DistrictId": 47 }, { "Id": 2321, "Name": "Tú Quỳ", "DistrictId": 47 }, { "Id": 2322, "Name": "Nguyễn Minh Không", "DistrictId": 47 }, { "Id": 2323, "Name": "Kiều Oánh Mậu", "DistrictId": 47 }, { "Id": 2324, "Name": "Đá Mọc 1", "DistrictId": 47 }, { "Id": 2326, "Name": "Đá Mọc 2", "DistrictId": 47 }, { "Id": 2327, "Name": "Nguyễn Minh Không", "DistrictId": 47 }, { "Id": 2328, "Name": "Đá Mọc 3", "DistrictId": 47 }, { "Id": 2329, "Name": "Đá Mọc 4", "DistrictId": 47 }, { "Id": 2330, "Name": "Đá Mọc 5", "DistrictId": 47 }, { "Id": 2334, "Name": "Hòa Mỹ 5", "DistrictId": 47 }, { "Id": 2336, "Name": "Phú Thạnh 1", "DistrictId": 47 }, { "Id": 2337, "Name": "Phú Thạnh 2", "DistrictId": 47 }, { "Id": 2338, "Name": "Phú Thạnh 3", "DistrictId": 47 }, { "Id": 2340, "Name": "Phú Thạnh 4", "DistrictId": 47 }, { "Id": 2342, "Name": "Phú Thạnh 5", "DistrictId": 47 }, { "Id": 2343, "Name": "Phú Thạnh 6", "DistrictId": 47 }, { "Id": 2512, "Name": "Tốt Động", "DistrictId": 47 }, { "Id": 2522, "Name": "Trung Nghĩa 1", "DistrictId": 47 }, { "Id": 2523, "Name": "Trung Nghĩa 2", "DistrictId": 47 }, { "Id": 2525, "Name": "Trung Nghĩa 3", "DistrictId": 47 }, { "Id": 2526, "Name": "Trung Nghĩa 4", "DistrictId": 47 }, { "Id": 2527, "Name": "Trung Nghĩa 5", "DistrictId": 47 }, { "Id": 2528, "Name": "Trung Nghĩa 6", "DistrictId": 47 }, { "Id": 2529, "Name": "Trung Nghĩa 7", "DistrictId": 47 }, { "Id": 2539, "Name": "Xuân Thiều 1", "DistrictId": 47 }, { "Id": 2540, "Name": "Xuân Thiều 2", "DistrictId": 47 }, { "Id": 2541, "Name": "Xuân Thiều 3", "DistrictId": 47 }, { "Id": 2542, "Name": "Xuân Thiều", "DistrictId": 47 }, { "Id": 2543, "Name": "Xuân Thiều 4", "DistrictId": 47 }, { "Id": 2545, "Name": "Xuân Thiều 5", "DistrictId": 47 }, { "Id": 2546, "Name": "Xuân Thiều 6", "DistrictId": 47 }, { "Id": 2547, "Name": "Xuân Thiều 7", "DistrictId": 47 }, { "Id": 2548, "Name": "Xuân Thiều 8", "DistrictId": 47 }, { "Id": 2549, "Name": "Xuân Thiều 9", "DistrictId": 47 }, { "Id": 2550, "Name": "Xuân Thiều 10", "DistrictId": 47 }, { "Id": 2551, "Name": "Xuân Thiều 11", "DistrictId": 47 }, { "Id": 2552, "Name": "Xuân Thiều 12", "DistrictId": 47 }, { "Id": 2553, "Name": "Xuân Thiều 13", "DistrictId": 47 }, { "Id": 2554, "Name": "Xuân Thiều 14", "DistrictId": 47 }, { "Id": 2687, "Name": "Trần Anh Tông", "DistrictId": 47 }, { "Id": 3338, "Name": "Võ Duy Dương", "DistrictId": 47 }, { "Id": 3417, "Name": "Lâm Quang Thự", "DistrictId": 47 }, { "Id": 3421, "Name": "Trần Đình Tri", "DistrictId": 47 }, { "Id": 3422, "Name": "Nam Trân", "DistrictId": 47 }, { "Id": 3426, "Name": "Phạm Như Xương", "DistrictId": 47 }, { "Id": 3431, "Name": "Phan Văn Định", "DistrictId": 47 }, { "Id": 3515, "Name": "Nguyễn Sinh Sắc", "DistrictId": 47 }, { "Id": 4066, "Name": "Thanh Tịnh", "DistrictId": 47 }, { "Id": 4239, "Name": "Nguyễn Mộng Tuân", "DistrictId": 47 }, { "Id": 5064, "Name": "Hồ Bá Ôn", "DistrictId": 47 }, { "Id": 5927, "Name": "Nguyễn Tấn Phát", "DistrictId": 47 }, { "Id": 5964, "Name": "Hòa Minh 3", "DistrictId": 47 }, { "Id": 6051, "Name": "Phan Thị Nể", "DistrictId": 47 }, { "Id": 6072, "Name": "Hòa Nam 4", "DistrictId": 47 }, { "Id": 6092, "Name": "Đồng Bài 1", "DistrictId": 47 }, { "Id": 6184, "Name": "Mộc Bài 4", "DistrictId": 47 }, { "Id": 6219, "Name": "Phạm Văn Ngôn", "DistrictId": 47 }, { "Id": 6239, "Name": "Đức Lợi 2", "DistrictId": 47 }, { "Id": 6281, "Name": "Hòa Mỹ 3", "DistrictId": 47 }, { "Id": 6393, "Name": "Phú Lộc 15", "DistrictId": 47 }, { "Id": 6435, "Name": "Hàm Trung 4", "DistrictId": 47 }, { "Id": 6438, "Name": "Hòa Minh 6", "DistrictId": 47 }, { "Id": 6459, "Name": "Hồ Sỹ Đồng", "DistrictId": 47 }, { "Id": 6479, "Name": "Hòa Minh 4", "DistrictId": 47 }, { "Id": 6493, "Name": "Thanh Vinh", "DistrictId": 47 }, { "Id": 6494, "Name": "Hòa Mỹ 4", "DistrictId": 47 }, { "Id": 6495, "Name": "Hòa Nam 5", "DistrictId": 47 }, { "Id": 6712, "Name": "Giáp Văn Cương", "DistrictId": 47 }, { "Id": 6810, "Name": "Chúc Động", "DistrictId": 47 }, { "Id": 6823, "Name": "Hòa Minh 8", "DistrictId": 47 }, { "Id": 6870, "Name": "Phú Lộc 14", "DistrictId": 47 }, { "Id": 7188, "Name": "Nguyễn Đình Trọng", "DistrictId": 47 }, { "Id": 7204, "Name": "Phú Lộc 3", "DistrictId": 47 }, { "Id": 7205, "Name": "Hòa Minh 12", "DistrictId": 47 }, { "Id": 7259, "Name": "Hòa Minh 15", "DistrictId": 47 }, { "Id": 7303, "Name": "Đồng Bài 3", "DistrictId": 47 }, { "Id": 7359, "Name": "Hàm Trung 2", "DistrictId": 47 }, { "Id": 7368, "Name": "Phú Lộc 5", "DistrictId": 47 }, { "Id": 7394, "Name": "Nguyễn Thúy", "DistrictId": 47 }, { "Id": 7395, "Name": "Hà Văn Tính", "DistrictId": 47 }, { "Id": 7472, "Name": "Hòa Minh 20", "DistrictId": 47 }, { "Id": 7480, "Name": "Đức Lợi I", "DistrictId": 47 }, { "Id": 7516, "Name": "Phú Lộc 7", "DistrictId": 47 }, { "Id": 7518, "Name": "Đồng Trí 6", "DistrictId": 47 }, { "Id": 7539, "Name": "Hòa Minh 1", "DistrictId": 47 }, { "Id": 7761, "Name": "Trung Nghĩa", "DistrictId": 47 }, { "Id": 7776, "Name": "Trần Phước Chu", "DistrictId": 47 }, { "Id": 7864, "Name": "Hàm Trung 5", "DistrictId": 47 }, { "Id": 7945, "Name": "A9", "DistrictId": 47 }, { "Id": 7946, "Name": "Nam Ô", "DistrictId": 47 }, { "Id": 7980, "Name": "Hòa Minh 17", "DistrictId": 47 }, { "Id": 8021, "Name": "Phan Văn Thuật", "DistrictId": 47 }, { "Id": 8088, "Name": "Hòa Khánh", "DistrictId": 47 }, { "Id": 8089, "Name": "Hòa Minh 23", "DistrictId": 47 }, { "Id": 8103, "Name": "Bàu Vàng 5", "DistrictId": 47 }, { "Id": 8130, "Name": "Thanh Vinh 4", "DistrictId": 47 }, { "Id": 8139, "Name": "Mộc Bài 2", "DistrictId": 47 }, { "Id": 8149, "Name": "Trần Văn Đa", "DistrictId": 47 }, { "Id": 8195, "Name": "Hòa Minh 14", "DistrictId": 47 }, { "Id": 8214, "Name": "Đào Doãn Địch", "DistrictId": 47 }, { "Id": 8275, "Name": "Hòa Minh 21", "DistrictId": 47 }, { "Id": 8315, "Name": "Thanh Vinh 10", "DistrictId": 47 }, { "Id": 8329, "Name": "Chơn Tâm 8", "DistrictId": 47 }, { "Id": 8331, "Name": "Đào Quang Phổ", "DistrictId": 47 }, { "Id": 8334, "Name": "Phú Lộc 8", "DistrictId": 47 }, { "Id": 8377, "Name": "Mộc Bài 3", "DistrictId": 47 }, { "Id": 8429, "Name": "Đồng Kè", "DistrictId": 47 }, { "Id": 8470, "Name": "Phú Lộc 2", "DistrictId": 47 }, { "Id": 8502, "Name": "Phú Lộc 1", "DistrictId": 47 }, { "Id": 8555, "Name": "Hòa Minh 5", "DistrictId": 47 }, { "Id": 8564, "Name": "Hoà Minh 10", "DistrictId": 47 }, { "Id": 8591, "Name": "Chơn Tâm 5", "DistrictId": 47 }, { "Id": 8638, "Name": "Yên Khuê 2", "DistrictId": 47 }, { "Id": 8639, "Name": "Bàu Vàng 6", "DistrictId": 47 }, { "Id": 8683, "Name": "Lê Văn Mến", "DistrictId": 47 }, { "Id": 8732, "Name": "Lê Tự Nhất Thống", "DistrictId": 47 }, { "Id": 8804, "Name": "Huỳnh Thị Bảo Hòa", "DistrictId": 47 }, { "Id": 8805, "Name": "Trà Na 1", "DistrictId": 47 }, { "Id": 8806, "Name": "Trà Na 2", "DistrictId": 47 }, { "Id": 8807, "Name": "Trà Na 3", "DistrictId": 47 }, { "Id": 8808, "Name": "Hòa Minh 7", "DistrictId": 47 }, { "Id": 8810, "Name": "Bàu Vàng 1", "DistrictId": 47 }, { "Id": 8841, "Name": "Bàu Mạc 12", "DistrictId": 47 }, { "Id": 8874, "Name": "Hàm Trung 8", "DistrictId": 47 }, { "Id": 8890, "Name": "Thanh Vinh 15", "DistrictId": 47 }, { "Id": 8894, "Name": "Phan Văn Trường", "DistrictId": 47 }, { "Id": 8972, "Name": "Hà Hồi", "DistrictId": 47 }, { "Id": 8985, "Name": "Lê Doãn Nhạ", "DistrictId": 47 }, { "Id": 9084, "Name": "Hoà Minh 22", "DistrictId": 47 }, { "Id": 9124, "Name": "Thanh Vinh 14", "DistrictId": 47 }, { "Id": 9199, "Name": "Nguyễn Minh Chấn", "DistrictId": 47 }, { "Id": 9252, "Name": "Hoà Minh 16", "DistrictId": 47 }, { "Id": 9288, "Name": "Thanh Vinh 11", "DistrictId": 47 }, { "Id": 9310, "Name": "Thanh Vinh 16", "DistrictId": 47 }, { "Id": 9315, "Name": "Bàu Mạc 14", "DistrictId": 47 }, { "Id": 9340, "Name": "Trung Nghĩa 8", "DistrictId": 47 }, { "Id": 9355, "Name": "Chơn Tâm 2", "DistrictId": 47 }, { "Id": 9369, "Name": "Bàu Mạc 2", "DistrictId": 47 }, { "Id": 9378, "Name": "Trung Nghĩa 9", "DistrictId": 47 }, { "Id": 9387, "Name": "Bàu Mạc 8", "DistrictId": 47 }, { "Id": 12235, "Name": "10", "DistrictId": 47 }, { "Id": 12236, "Name": "2", "DistrictId": 47 }, { "Id": 12237, "Name": "4", "DistrictId": 47 }, { "Id": 12238, "Name": "5", "DistrictId": 47 }, { "Id": 12239, "Name": "Âu Cơ", "DistrictId": 47 }, { "Id": 12240, "Name": "Bạch Thái Bưởi", "DistrictId": 47 }, { "Id": 12241, "Name": "Đa Phước", "DistrictId": 47 }, { "Id": 12242, "Name": "Đặng Dung", "DistrictId": 47 }, { "Id": 12243, "Name": "Đặng Minh Khiêm", "DistrictId": 47 }, { "Id": 12244, "Name": "Đặng Tất", "DistrictId": 47 }, { "Id": 12245, "Name": "Đào Nguyên Phổ", "DistrictId": 47 }, { "Id": 12246, "Name": "Đào Sư Tích", "DistrictId": 47 }, { "Id": 12247, "Name": "Đỗ Nhuận", "DistrictId": 47 }, { "Id": 12248, "Name": "Đoàn Phú Tứ", "DistrictId": 47 }, { "Id": 12249, "Name": "Đoàn Trần Nghiệp", "DistrictId": 47 }, { "Id": 12250, "Name": "Đồng Khởi", "DistrictId": 47 }, { "Id": 12251, "Name": "Đồng Trí 3", "DistrictId": 47 }, { "Id": 12252, "Name": "Dương Đức Hiền", "DistrictId": 47 }, { "Id": 12253, "Name": "Hồ Quý Ly", "DistrictId": 47 }, { "Id": 12254, "Name": "Hồ Tùng Mậu", "DistrictId": 47 }, { "Id": 12255, "Name": "Hoàng Văn Thái", "DistrictId": 47 }, { "Id": 12256, "Name": "Kim Cương", "DistrictId": 47 }, { "Id": 12257, "Name": "Kim Liên", "DistrictId": 47 }, { "Id": 12258, "Name": "Kinh Dương Vương", "DistrictId": 47 }, { "Id": 12259, "Name": "Lạc Long Quân", "DistrictId": 47 }, { "Id": 12260, "Name": "Lê Công Kiều", "DistrictId": 47 }, { "Id": 12261, "Name": "Lê Thiệt", "DistrictId": 47 }, { "Id": 12262, "Name": "Lê Văn Sỹ", "DistrictId": 47 }, { "Id": 12263, "Name": "Lê Văn Thịnh", "DistrictId": 47 }, { "Id": 12264, "Name": "Lương Khánh Thiện", "DistrictId": 47 }, { "Id": 12265, "Name": "Lý Chính Thắng", "DistrictId": 47 }, { "Id": 12266, "Name": "Lý Thái Tông", "DistrictId": 47 }, { "Id": 12267, "Name": "Lý Thánh Tông", "DistrictId": 47 }, { "Id": 12268, "Name": "Nam Cao", "DistrictId": 47 }, { "Id": 12269, "Name": "Ngô Sĩ Liên", "DistrictId": 47 }, { "Id": 12270, "Name": "Ngô Thì Nhậm", "DistrictId": 47 }, { "Id": 12271, "Name": "Ngô Văn Sở", "DistrictId": 47 }, { "Id": 12272, "Name": "Nguyễn Cảnh Chân", "DistrictId": 47 }, { "Id": 12273, "Name": "Nguyễn Cảnh Dị", "DistrictId": 47 }, { "Id": 12274, "Name": "Nguyễn Chánh", "DistrictId": 47 }, { "Id": 12275, "Name": "Nguyễn Chích", "DistrictId": 47 }, { "Id": 12276, "Name": "Nguyễn Công Hoan", "DistrictId": 47 }, { "Id": 12277, "Name": "Nguyễn Đỗ Cung", "DistrictId": 47 }, { "Id": 12278, "Name": "Nguyễn Huy Tự", "DistrictId": 47 }, { "Id": 12279, "Name": "Nguyễn Huy Tưởng", "DistrictId": 47 }, { "Id": 12280, "Name": "Nguyễn Khắc Nhu", "DistrictId": 47 }, { "Id": 12281, "Name": "Nguyễn Khoa Chiêm", "DistrictId": 47 }, { "Id": 12282, "Name": "Nguyễn Khuyến", "DistrictId": 47 }, { "Id": 12283, "Name": "Nguyễn Lương Bằng", "DistrictId": 47 }, { "Id": 12284, "Name": "Nguyễn Tất Thành", "DistrictId": 47 }, { "Id": 12285, "Name": "Nguyễn Thái Bình", "DistrictId": 47 }, { "Id": 12286, "Name": "Nguyễn Thị Thập", "DistrictId": 47 }, { "Id": 12287, "Name": "Nguyễn Văn Cừ", "DistrictId": 47 }, { "Id": 12288, "Name": "Nguyễn Viết Xuân", "DistrictId": 47 }, { "Id": 12289, "Name": "Nguyễn Xí", "DistrictId": 47 }, { "Id": 12290, "Name": "Ninh Tốn", "DistrictId": 47 }, { "Id": 12291, "Name": "Phạm Đình Hổ", "DistrictId": 47 }, { "Id": 12292, "Name": "Phan Đình Giót", "DistrictId": 47 }, { "Id": 12293, "Name": "Phan Văn Đạt", "DistrictId": 47 }, { "Id": 12294, "Name": "Phùng Chí Kiên", "DistrictId": 47 }, { "Id": 12295, "Name": "Phùng Hưng", "DistrictId": 47 }, { "Id": 12296, "Name": "Tân Trào", "DistrictId": 47 }, { "Id": 12297, "Name": "Thích Quảng Đức", "DistrictId": 47 }, { "Id": 12298, "Name": "Tô Hiệu", "DistrictId": 47 }, { "Id": 12299, "Name": "Tôn Đản", "DistrictId": 47 }, { "Id": 12300, "Name": "Tôn Đức Thắng", "DistrictId": 47 }, { "Id": 12301, "Name": "Tống Duy Tân", "DistrictId": 47 }, { "Id": 12302, "Name": "Trần Nguyên Đán", "DistrictId": 47 }, { "Id": 12303, "Name": "Trần Quý Khoách", "DistrictId": 47 }, { "Id": 12304, "Name": "Trần Tấn", "DistrictId": 47 }, { "Id": 12305, "Name": "Trần Văn Kỷ", "DistrictId": 47 }, { "Id": 12306, "Name": "Trịnh Khắc Lập", "DistrictId": 47 }, { "Id": 12307, "Name": "Trường Chinh", "DistrictId": 47 }, { "Id": 12308, "Name": "Trương Vân Lĩnh", "DistrictId": 47 }, { "Id": 12309, "Name": "Tú Mỡ", "DistrictId": 47 }, { "Id": 12310, "Name": "Vũ Huy Tấn", "DistrictId": 47 }, { "Id": 12311, "Name": "Vũ Ngọc Phan", "DistrictId": 47 }, { "Id": 12312, "Name": "Yên Thế", "DistrictId": 47 }, { "Id": 20257, "Name": "Chơn Tâm 7", "DistrictId": 47 }, { "Id": 20258, "Name": "Đồng Trí 2", "DistrictId": 47 }, { "Id": 20259, "Name": "Hàm Trung 3", "DistrictId": 47 }, { "Id": 20260, "Name": "Hồng Thái", "DistrictId": 47 }, { "Id": 20261, "Name": "Quang Thành", "DistrictId": 47 }, { "Id": 20262, "Name": "Quang Thành 1", "DistrictId": 47 }, { "Id": 20263, "Name": "Thành Vinh 12", "DistrictId": 47 }] }, { "Id": 48, "Name": "Ngũ Hành Sơn", "CityId": 4, "Wards": [{ "Id": 268, "Name": "Mỹ An", "DistrictId": 48 }, { "Id": 269, "Name": " Khuê Mỹ", "DistrictId": 48 }, { "Id": 270, "Name": "Hòa Quý", "DistrictId": 48 }, { "Id": 271, "Name": "Hòa Hải", "DistrictId": 48 }], "Streets": [{ "Id": 1468, "Name": "Bà Bang Nhãn", "DistrictId": 48 }, { "Id": 1470, "Name": "Vũ Duy Đoán", "DistrictId": 48 }, { "Id": 1471, "Name": "Trương Văn Hiến", "DistrictId": 48 }, { "Id": 1472, "Name": "Trần Hoành", "DistrictId": 48 }, { "Id": 1474, "Name": "K20", "DistrictId": 48 }, { "Id": 1477, "Name": "Nguyễn Đình Trân", "DistrictId": 48 }, { "Id": 1479, "Name": "Lê Văn Tâm", "DistrictId": 48 }, { "Id": 1481, "Name": "Hoàng Trọng Mậu", "DistrictId": 48 }, { "Id": 1484, "Name": "Võ Như Hưng", "DistrictId": 48 }, { "Id": 1491, "Name": "Phan Hành Sơn", "DistrictId": 48 }, { "Id": 1492, "Name": "Phạm Hữu Kính", "DistrictId": 48 }, { "Id": 1493, "Name": "Nguyễn Văn Thoại", "DistrictId": 48 }, { "Id": 1511, "Name": "Ngô Thì Sĩ", "DistrictId": 48 }, { "Id": 1519, "Name": "Hồ Huân Nghiệp", "DistrictId": 48 }, { "Id": 1527, "Name": "Dương Khuê", "DistrictId": 48 }, { "Id": 1542, "Name": "Vạn Tường", "DistrictId": 48 }, { "Id": 1545, "Name": "Thượng Đức", "DistrictId": 48 }, { "Id": 1554, "Name": "Trà Lộ", "DistrictId": 48 }, { "Id": 1768, "Name": "Nam Thành", "DistrictId": 48 }, { "Id": 1878, "Name": "Phan Tòng", "DistrictId": 48 }, { "Id": 1882, "Name": "Phạm Nổi", "DistrictId": 48 }, { "Id": 1889, "Name": "Lương Thúc Kỳ", "DistrictId": 48 }, { "Id": 1891, "Name": "Lộc Ninh", "DistrictId": 48 }, { "Id": 1896, "Name": "Hồ Thấu", "DistrictId": 48 }, { "Id": 1901, "Name": "Chu Cẩm Phong", "DistrictId": 48 }, { "Id": 1908, "Name": "Chu Lai", "DistrictId": 48 }, { "Id": 1917, "Name": "An Nông", "DistrictId": 48 }, { "Id": 1921, "Name": "Bình Kỳ", "DistrictId": 48 }, { "Id": 1923, "Name": "Mai Đăng Chơn", "DistrictId": 48 }, { "Id": 1925, "Name": "Lưu Quang Vũ", "DistrictId": 48 }, { "Id": 2087, "Name": "Lê Hữu Trác", "DistrictId": 48 }, { "Id": 2109, "Name": "Đặng Xuân Thiều", "DistrictId": 48 }, { "Id": 2287, "Name": "Phan Tứ", "DistrictId": 48 }, { "Id": 2291, "Name": "An Thượng 20", "DistrictId": 48 }, { "Id": 2293, "Name": "An Thượng 21", "DistrictId": 48 }, { "Id": 2294, "Name": "An Thượng 22", "DistrictId": 48 }, { "Id": 2297, "Name": "Mỹ Đa Đông 3", "DistrictId": 48 }, { "Id": 2298, "Name": "Mỹ Đa Đông 1", "DistrictId": 48 }, { "Id": 2301, "Name": "Vũ Mộng Nguyên", "DistrictId": 48 }, { "Id": 2302, "Name": "Phạm Kiệt", "DistrictId": 48 }, { "Id": 2303, "Name": "Khuê Mỹ Đông 1", "DistrictId": 48 }, { "Id": 2304, "Name": "Khuê Mỹ Đông 2", "DistrictId": 48 }, { "Id": 2305, "Name": "Khuê Mỹ Đông 3", "DistrictId": 48 }, { "Id": 2306, "Name": "Quán Khái 8", "DistrictId": 48 }, { "Id": 2307, "Name": "Ngô Viết Hữu", "DistrictId": 48 }, { "Id": 2308, "Name": "Văn Tân", "DistrictId": 48 }, { "Id": 2309, "Name": "Quán Khái 1", "DistrictId": 48 }, { "Id": 2310, "Name": "Quán Khái 2", "DistrictId": 48 }, { "Id": 2311, "Name": "Quán Khái 3", "DistrictId": 48 }, { "Id": 2312, "Name": "Quán Khái 4", "DistrictId": 48 }, { "Id": 2314, "Name": "Quán Khái 5", "DistrictId": 48 }, { "Id": 2315, "Name": "Quán Khái 6", "DistrictId": 48 }, { "Id": 2316, "Name": "Quán Khái 7", "DistrictId": 48 }, { "Id": 2318, "Name": "Bát Nàn Công chúa", "DistrictId": 48 }, { "Id": 2403, "Name": "Sơn Thủy 1", "DistrictId": 48 }, { "Id": 2404, "Name": "Sơn Thủy 2", "DistrictId": 48 }, { "Id": 2405, "Name": "Sơn Thủy 3", "DistrictId": 48 }, { "Id": 2406, "Name": "Sơn Thủy 4", "DistrictId": 48 }, { "Id": 2407, "Name": "Sơn Thủy 5", "DistrictId": 48 }, { "Id": 2409, "Name": "Sơn Thủy 6", "DistrictId": 48 }, { "Id": 2410, "Name": "Sơn Thủy 7", "DistrictId": 48 }, { "Id": 2411, "Name": "Sơn Thủy 8", "DistrictId": 48 }, { "Id": 2412, "Name": "Sơn Thủy 9", "DistrictId": 48 }, { "Id": 3069, "Name": "Minh Mạng", "DistrictId": 48 }, { "Id": 3619, "Name": "Nguyễn Lữ", "DistrictId": 48 }, { "Id": 5301, "Name": "Nguyễn Quốc Trị", "DistrictId": 48 }, { "Id": 6105, "Name": "Mỹ An 18", "DistrictId": 48 }, { "Id": 6205, "Name": "Lý Văn Tố", "DistrictId": 48 }, { "Id": 6251, "Name": "An Thượng 9", "DistrictId": 48 }, { "Id": 6279, "Name": "An Thượng", "DistrictId": 48 }, { "Id": 6305, "Name": "An Thượng 4", "DistrictId": 48 }, { "Id": 6310, "Name": "An Thượng 2", "DistrictId": 48 }, { "Id": 6387, "Name": "Lê Hữu Khánh", "DistrictId": 48 }, { "Id": 6456, "Name": "Hoà Cường", "DistrictId": 48 }, { "Id": 6478, "Name": "An Thượng 15", "DistrictId": 48 }, { "Id": 6485, "Name": "An Thượng 24", "DistrictId": 48 }, { "Id": 6637, "Name": "Nghiêm Xuân Yên", "DistrictId": 48 }, { "Id": 6677, "Name": "An Thượng 11", "DistrictId": 48 }, { "Id": 6877, "Name": "Lưu Quang Thuận", "DistrictId": 48 }, { "Id": 6881, "Name": "Đông Hải", "DistrictId": 48 }, { "Id": 6888, "Name": "An Thượng 5", "DistrictId": 48 }, { "Id": 6946, "Name": "Mỹ An 17", "DistrictId": 48 }, { "Id": 6997, "Name": "Mỹ Sơn 16", "DistrictId": 48 }, { "Id": 7010, "Name": "Mỹ An 16", "DistrictId": 48 }, { "Id": 7187, "Name": "An Thượng 33", "DistrictId": 48 }, { "Id": 7189, "Name": "Nguyễn Tạo", "DistrictId": 48 }, { "Id": 7219, "Name": "Mỹ An 12", "DistrictId": 48 }, { "Id": 7256, "Name": "Khuê Mỹ Đông 4", "DistrictId": 48 }, { "Id": 7267, "Name": "Dương Thị Xuân Quý", "DistrictId": 48 }, { "Id": 7271, "Name": "Vân Đài Nữ Sĩ", "DistrictId": 48 }, { "Id": 7302, "Name": "An Thượng 7", "DistrictId": 48 }, { "Id": 7364, "Name": "Bắc Mỹ An", "DistrictId": 48 }, { "Id": 7404, "Name": "An Thượng 35", "DistrictId": 48 }, { "Id": 7421, "Name": "Mỹ An 23", "DistrictId": 48 }, { "Id": 7447, "Name": "An Tư Công Chúa", "DistrictId": 48 }, { "Id": 7448, "Name": "An Thượng 17", "DistrictId": 48 }, { "Id": 7459, "Name": "An Thượng 32", "DistrictId": 48 }, { "Id": 7464, "Name": "Đông Hải 5", "DistrictId": 48 }, { "Id": 7497, "Name": "An Thượng 3", "DistrictId": 48 }, { "Id": 7507, "Name": "An Thượng 8", "DistrictId": 48 }, { "Id": 7528, "Name": "An Thượng 1", "DistrictId": 48 }, { "Id": 7540, "Name": "Đa Phước 9", "DistrictId": 48 }, { "Id": 7550, "Name": "Phan Liêm", "DistrictId": 48 }, { "Id": 7658, "Name": "Quán Khái", "DistrictId": 48 }, { "Id": 7683, "Name": "Trần Thị Lý", "DistrictId": 48 }, { "Id": 7685, "Name": "Đa Mỹ Tây 8", "DistrictId": 48 }, { "Id": 7722, "Name": "Phạm Kiêm Ích", "DistrictId": 48 }, { "Id": 7723, "Name": "Lê Huy Cát", "DistrictId": 48 }, { "Id": 7724, "Name": "Đa Mặn 5", "DistrictId": 48 }, { "Id": 7735, "Name": "Mỹ An 6", "DistrictId": 48 }, { "Id": 7778, "Name": "Giang Châu 1", "DistrictId": 48 }, { "Id": 7802, "Name": "Đa Mặn", "DistrictId": 48 }, { "Id": 7852, "Name": "Doãn Uẩn", "DistrictId": 48 }, { "Id": 7934, "Name": "Mỹ Đa Tây 6", "DistrictId": 48 }, { "Id": 8027, "Name": "Đa Phước 1", "DistrictId": 48 }, { "Id": 8058, "Name": "Mỹ An 24", "DistrictId": 48 }, { "Id": 8081, "Name": "Đông Trà 4", "DistrictId": 48 }, { "Id": 8106, "Name": "Mỹ An 1", "DistrictId": 48 }, { "Id": 8107, "Name": "An Thượng 27", "DistrictId": 48 }, { "Id": 8133, "Name": "Đa Phước 4", "DistrictId": 48 }, { "Id": 8182, "Name": "Đa Phước 2", "DistrictId": 48 }, { "Id": 8200, "Name": "Đa Mặn 2", "DistrictId": 48 }, { "Id": 8280, "Name": "An Thượng 26", "DistrictId": 48 }, { "Id": 8397, "Name": "Võ Văn Đặng", "DistrictId": 48 }, { "Id": 8411, "Name": "Mỹ Đa Tây 5", "DistrictId": 48 }, { "Id": 8432, "Name": "Mỹ Đa Đông 5", "DistrictId": 48 }, { "Id": 8503, "Name": "Mỹ Đa Tây 8", "DistrictId": 48 }, { "Id": 8594, "Name": "Mỹ Đa Đông 8", "DistrictId": 48 }, { "Id": 8610, "Name": "Mỹ An 19", "DistrictId": 48 }, { "Id": 8630, "Name": "Đông Trà 2", "DistrictId": 48 }, { "Id": 8739, "Name": "Mỹ An 5", "DistrictId": 48 }, { "Id": 8756, "Name": "Trung Hòa 5", "DistrictId": 48 }, { "Id": 8765, "Name": "Sơn Thủy Đông", "DistrictId": 48 }, { "Id": 8793, "Name": "An Thượng 29", "DistrictId": 48 }, { "Id": 8871, "Name": "Đa Mặn 6", "DistrictId": 48 }, { "Id": 8930, "Name": "ĐT 607", "DistrictId": 48 }, { "Id": 8941, "Name": "Đổ Bá", "DistrictId": 48 }, { "Id": 9092, "Name": "An Thượng 30", "DistrictId": 48 }, { "Id": 9126, "Name": "An Thượng 28", "DistrictId": 48 }, { "Id": 9142, "Name": "Mỹ An 25", "DistrictId": 48 }, { "Id": 9148, "Name": "Mỹ An 15", "DistrictId": 48 }, { "Id": 9150, "Name": "An Thượng 36", "DistrictId": 48 }, { "Id": 9160, "Name": "Tân Trà", "DistrictId": 48 }, { "Id": 9190, "Name": "Cao Sơn 3", "DistrictId": 48 }, { "Id": 9214, "Name": "Đông Hải 2", "DistrictId": 48 }, { "Id": 9233, "Name": "Hoà Bình 3", "DistrictId": 48 }, { "Id": 9240, "Name": "An Thượng 16", "DistrictId": 48 }, { "Id": 9250, "Name": "Trương Công Hy", "DistrictId": 48 }, { "Id": 9255, "Name": "Đa Phước 6", "DistrictId": 48 }, { "Id": 9267, "Name": "An Thượng 10", "DistrictId": 48 }, { "Id": 9284, "Name": "Mỹ An 22", "DistrictId": 48 }, { "Id": 9304, "Name": "Hoàng Bính Chính", "DistrictId": 48 }, { "Id": 9309, "Name": "Thuỷ Sơn 1", "DistrictId": 48 }, { "Id": 9316, "Name": "An Thượng 34", "DistrictId": 48 }, { "Id": 9333, "Name": "Mỹ An 11", "DistrictId": 48 }, { "Id": 9341, "Name": "Thuỷ Sơn 5", "DistrictId": 48 }, { "Id": 9348, "Name": "Mỹ An 20", "DistrictId": 48 }, { "Id": 9380, "Name": "Thuỷ Sơn 4", "DistrictId": 48 }, { "Id": 9386, "Name": "Mỹ Đa Tây 9", "DistrictId": 48 }, { "Id": 9395, "Name": "Nguyễn Đình Hiến", "DistrictId": 48 }, { "Id": 9414, "Name": "Khuê Đông", "DistrictId": 48 }, { "Id": 9415, "Name": "Bá Giáng 5", "DistrictId": 48 }, { "Id": 12313, "Name": "An Dương Vương", "DistrictId": 48 }, { "Id": 12314, "Name": "An Thượng 6", "DistrictId": 48 }, { "Id": 12315, "Name": "Ấp Bắc", "DistrictId": 48 }, { "Id": 12316, "Name": "Bà Huyện Thanh Quan", "DistrictId": 48 }, { "Id": 12317, "Name": "Bình Giã", "DistrictId": 48 }, { "Id": 12318, "Name": "Bùi Tá Hán", "DistrictId": 48 }, { "Id": 12319, "Name": "Bùi Thế Mỹ", "DistrictId": 48 }, { "Id": 12320, "Name": "Cao Thắng", "DistrictId": 48 }, { "Id": 12321, "Name": "Châu Thị Vĩnh Tế", "DistrictId": 48 }, { "Id": 12322, "Name": "Chế Lan Viên", "DistrictId": 48 }, { "Id": 12323, "Name": "Chương Dương", "DistrictId": 48 }, { "Id": 12324, "Name": "Đặng Nguyên Cẩn", "DistrictId": 48 }, { "Id": 12325, "Name": "Đặng Thái Thân", "DistrictId": 48 }, { "Id": 12326, "Name": "Đình Đông", "DistrictId": 48 }, { "Id": 12327, "Name": "Đỗ Bí", "DistrictId": 48 }, { "Id": 12328, "Name": "Đoàn Khuê", "DistrictId": 48 }, { "Id": 12329, "Name": "Đồng Bài 3", "DistrictId": 48 }, { "Id": 12330, "Name": "Dương Tử Giang", "DistrictId": 48 }, { "Id": 12331, "Name": "Dương Tự Quán", "DistrictId": 48 }, { "Id": 12332, "Name": "Hải Hồ", "DistrictId": 48 }, { "Id": 12333, "Name": "Hải Triều", "DistrictId": 48 }, { "Id": 12334, "Name": "Hàm Tử", "DistrictId": 48 }, { "Id": 12335, "Name": "Hồ Xuân Hương", "DistrictId": 48 }, { "Id": 12336, "Name": "Hoài Thanh", "DistrictId": 48 }, { "Id": 12337, "Name": "Hoàng Kế Viêm", "DistrictId": 48 }, { "Id": 12338, "Name": "Hoàng Sa", "DistrictId": 48 }, { "Id": 12339, "Name": "Hoàng Thiều Hoa", "DistrictId": 48 }, { "Id": 12340, "Name": "Hoàng Văn Hòe", "DistrictId": 48 }, { "Id": 12341, "Name": "Huyền Trân Công Chúa", "DistrictId": 48 }, { "Id": 12342, "Name": "Huỳnh Bá Chánh", "DistrictId": 48 }, { "Id": 12343, "Name": "Lê Lộ", "DistrictId": 48 }, { "Id": 12344, "Name": "Lê Quang Đạo", "DistrictId": 48 }, { "Id": 12345, "Name": "Lê Thị Riêng", "DistrictId": 48 }, { "Id": 12346, "Name": "Lê Văn Hiến", "DistrictId": 48 }, { "Id": 12347, "Name": "Lê Văn Hưu", "DistrictId": 48 }, { "Id": 12348, "Name": "Lương Thế Vinh", "DistrictId": 48 }, { "Id": 12349, "Name": "Lưu Văn Lang", "DistrictId": 48 }, { "Id": 12350, "Name": "Mạc Cửu", "DistrictId": 48 }, { "Id": 12351, "Name": "Mạc Thiên Tích", "DistrictId": 48 }, { "Id": 12352, "Name": "Mỹ An 7", "DistrictId": 48 }, { "Id": 12353, "Name": "Ngũ Hành Sơn", "DistrictId": 48 }, { "Id": 12354, "Name": "Nguyễn Bá Lân", "DistrictId": 48 }, { "Id": 12355, "Name": "Nguyễn Cơ Thạch", "DistrictId": 48 }, { "Id": 12356, "Name": "Nguyễn Đình Chiểu", "DistrictId": 48 }, { "Id": 12357, "Name": "Nguyễn Đức Thuận", "DistrictId": 48 }, { "Id": 12358, "Name": "Nguyễn Duy Trinh", "DistrictId": 48 }, { "Id": 12359, "Name": "Nguyễn Khắc Viện", "DistrictId": 48 }, { "Id": 12360, "Name": "Nguyễn Minh Châu", "DistrictId": 48 }, { "Id": 12361, "Name": "Nguyễn Nghiêm", "DistrictId": 48 }, { "Id": 12362, "Name": "Nguyễn Phạm Tuân", "DistrictId": 48 }, { "Id": 12363, "Name": "Nguyễn Thần Hiến", "DistrictId": 48 }, { "Id": 12364, "Name": "Nguyễn Thành Ý", "DistrictId": 48 }, { "Id": 12365, "Name": "Nguyễn Thông", "DistrictId": 48 }, { "Id": 12366, "Name": "Nguyễn Thức Tự", "DistrictId": 48 }, { "Id": 12367, "Name": "Nguyễn Tri Phương", "DistrictId": 48 }, { "Id": 12368, "Name": "Nguyễn Trung Trực", "DistrictId": 48 }, { "Id": 12369, "Name": "Nguyễn Tư Giản", "DistrictId": 48 }, { "Id": 12370, "Name": "Nguyễn Xiển", "DistrictId": 48 }, { "Id": 12371, "Name": "Phạm Thận Duật", "DistrictId": 48 }, { "Id": 12372, "Name": "Phạm Tuấn Tài", "DistrictId": 48 }, { "Id": 12373, "Name": "Phạm Văn Đồng", "DistrictId": 48 }, { "Id": 12374, "Name": "Phan Đình Thông", "DistrictId": 48 }, { "Id": 12375, "Name": "Phan Thúc Duyện", "DistrictId": 48 }, { "Id": 12376, "Name": "Phan Tôn", "DistrictId": 48 }, { "Id": 12377, "Name": "Sư Vạn Hạnh", "DistrictId": 48 }, { "Id": 12378, "Name": "Tây Sơn", "DistrictId": 48 }, { "Id": 12379, "Name": "Thạch Lam", "DistrictId": 48 }, { "Id": 12380, "Name": "Tiền Đức", "DistrictId": 48 }, { "Id": 12381, "Name": "Tôn Thất Thiệp", "DistrictId": 48 }, { "Id": 12382, "Name": "Trần Đại Nghĩa", "DistrictId": 48 }, { "Id": 12383, "Name": "Trần Khánh Dư", "DistrictId": 48 }, { "Id": 12384, "Name": "Trần Quốc Hoàn", "DistrictId": 48 }, { "Id": 12385, "Name": "Trần Văn Dư", "DistrictId": 48 }, { "Id": 12386, "Name": "Trần Văn Thành", "DistrictId": 48 }, { "Id": 12387, "Name": "Trịnh Lỗi", "DistrictId": 48 }, { "Id": 12388, "Name": "Trương Đăng Quế", "DistrictId": 48 }, { "Id": 12389, "Name": "Trường Sa", "DistrictId": 48 }, { "Id": 12390, "Name": "Tùng Thiện Vương", "DistrictId": 48 }, { "Id": 12391, "Name": "Tuy Lý Vương", "DistrictId": 48 }, { "Id": 12392, "Name": "Ung Văn Khiêm", "DistrictId": 48 }, { "Id": 12393, "Name": "Võ Chí Công", "DistrictId": 48 }, { "Id": 12394, "Name": "Võ Nguyên Giáp", "DistrictId": 48 }, { "Id": 12395, "Name": "Yersin", "DistrictId": 48 }, { "Id": 20264, "Name": "An Thượng 14", "DistrictId": 48 }, { "Id": 20265, "Name": "Bá Giang 1", "DistrictId": 48 }, { "Id": 20266, "Name": "Đa Mặn 3", "DistrictId": 48 }, { "Id": 20267, "Name": "Đa Mặn 7", "DistrictId": 48 }, { "Id": 20268, "Name": "Mỹ Đa Tây 2", "DistrictId": 48 }, { "Id": 20269, "Name": "Nguyễn Duy Cung", "DistrictId": 48 }, { "Id": 20270, "Name": "Nguyễn Phan Chánh", "DistrictId": 48 }, { "Id": 20271, "Name": "Sơn Thủy Đông 1", "DistrictId": 48 }, { "Id": 20272, "Name": "Trần Xuân Hòa", "DistrictId": 48 }, { "Id": 20315, "Name": "Sơn Trà - Điện Ngọc", "DistrictId": 48 }] }, { "Id": 49, "Name": "Sơn Trà", "CityId": 4, "Wards": [{ "Id": 261, "Name": "An Hải Đông", "DistrictId": 49 }, { "Id": 262, "Name": " An Hải Bắc", "DistrictId": 49 }, { "Id": 263, "Name": "An Hải Tây", "DistrictId": 49 }, { "Id": 264, "Name": "Mân Thái", "DistrictId": 49 }, { "Id": 265, "Name": "Phước Mỹ", "DistrictId": 49 }, { "Id": 266, "Name": "Nại Hiên Đông ", "DistrictId": 49 }, { "Id": 267, "Name": "Thọ Quang", "DistrictId": 49 }], "Streets": [{ "Id": 1571, "Name": "Khúc Thừa Dụ", "DistrictId": 49 }, { "Id": 1939, "Name": "Bùi Quốc Hưng", "DistrictId": 49 }, { "Id": 2021, "Name": "Dương Lâm", "DistrictId": 49 }, { "Id": 2027, "Name": "Dương Trí Trạch", "DistrictId": 49 }, { "Id": 2029, "Name": "Dương Tự Minh", "DistrictId": 49 }, { "Id": 2032, "Name": "Dương Vân Nga", "DistrictId": 49 }, { "Id": 2124, "Name": "Vũ Văn Dũng", "DistrictId": 49 }, { "Id": 2127, "Name": "An Trung 1", "DistrictId": 49 }, { "Id": 2128, "Name": "An Trung 2", "DistrictId": 49 }, { "Id": 2130, "Name": "An Trung 3", "DistrictId": 49 }, { "Id": 2135, "Name": "Phước Mỹ 3", "DistrictId": 49 }, { "Id": 2137, "Name": "Phước Mỹ 1", "DistrictId": 49 }, { "Id": 2139, "Name": "Phước Mỹ 4", "DistrictId": 49 }, { "Id": 2141, "Name": "Lê Tấn Trung.", "DistrictId": 49 }, { "Id": 2143, "Name": "Đinh Công Trứ", "DistrictId": 49 }, { "Id": 2144, "Name": "Đinh Nhật Thận", "DistrictId": 49 }, { "Id": 2177, "Name": "Hồ Sĩ Phấn", "DistrictId": 49 }, { "Id": 2178, "Name": "Lê Phụ Trần", "DistrictId": 49 }, { "Id": 2180, "Name": "Bình Than", "DistrictId": 49 }, { "Id": 2181, "Name": "Mân Quang 8", "DistrictId": 49 }, { "Id": 2182, "Name": "Mân Quang 6", "DistrictId": 49 }, { "Id": 2183, "Name": "Mân Quang 7", "DistrictId": 49 }, { "Id": 2184, "Name": "Mân Quang 9", "DistrictId": 49 }, { "Id": 2187, "Name": "Mân Quang 10", "DistrictId": 49 }, { "Id": 2188, "Name": "Nại Nghĩa 1", "DistrictId": 49 }, { "Id": 2192, "Name": "Nại Nghĩa 2", "DistrictId": 49 }, { "Id": 2193, "Name": "Nại Nghĩa 3", "DistrictId": 49 }, { "Id": 2194, "Name": "Nại Nghĩa 4", "DistrictId": 49 }, { "Id": 2196, "Name": "Nại Nghĩa 5", "DistrictId": 49 }, { "Id": 2197, "Name": "Nại Nghĩa 6", "DistrictId": 49 }, { "Id": 2201, "Name": "Lý Nhật Quang", "DistrictId": 49 }, { "Id": 2211, "Name": "Hồ Sĩ Tân", "DistrictId": 49 }, { "Id": 2214, "Name": "Nguyễn Thị Ba", "DistrictId": 49 }, { "Id": 2219, "Name": "Vũng Thùng 1", "DistrictId": 49 }, { "Id": 2220, "Name": "Ngô Thì Hương", "DistrictId": 49 }, { "Id": 2222, "Name": "Ngô Thì Trí", "DistrictId": 49 }, { "Id": 2226, "Name": "Ngô Thì Hiệu", "DistrictId": 49 }, { "Id": 2235, "Name": "Nại Hiên Đông 11", "DistrictId": 49 }, { "Id": 2238, "Name": "Nại Hiên Đông 12", "DistrictId": 49 }, { "Id": 2241, "Name": "Nại Hiên Đông 14", "DistrictId": 49 }, { "Id": 2242, "Name": "Nại Hiên Đông 15", "DistrictId": 49 }, { "Id": 2243, "Name": "Nại Hiên Đông 16", "DistrictId": 49 }, { "Id": 2245, "Name": "Vũng Thùng 2", "DistrictId": 49 }, { "Id": 2246, "Name": "Vũng Thùng 3", "DistrictId": 49 }, { "Id": 2248, "Name": "Vũng Thùng 4", "DistrictId": 49 }, { "Id": 2250, "Name": "Vũng Thùng 5", "DistrictId": 49 }, { "Id": 2255, "Name": "Hà Tông Huân", "DistrictId": 49 }, { "Id": 2258, "Name": "Vũ Ngọc Nhạ", "DistrictId": 49 }, { "Id": 2260, "Name": "Nguyễn Tuấn Thiện", "DistrictId": 49 }, { "Id": 2261, "Name": "Thích Thiện Chiếu", "DistrictId": 49 }, { "Id": 2267, "Name": "Lý Tử Tấn", "DistrictId": 49 }, { "Id": 2269, "Name": "Ngô Cao Lãng", "DistrictId": 49 }, { "Id": 2271, "Name": "Nguyễn Đăng Tuyển", "DistrictId": 49 }, { "Id": 2274, "Name": "Suối Đá 2", "DistrictId": 49 }, { "Id": 2275, "Name": "Thôi Hữu", "DistrictId": 49 }, { "Id": 2278, "Name": "Trần Thuyết", "DistrictId": 49 }, { "Id": 2280, "Name": "Suối Đá 1", "DistrictId": 49 }, { "Id": 2282, "Name": "Suối Đá 2", "DistrictId": 49 }, { "Id": 2283, "Name": "Suối Đá 3", "DistrictId": 49 }, { "Id": 2299, "Name": "Mỹ Đa Đông 2", "DistrictId": 49 }, { "Id": 2417, "Name": "Tân Thái 1", "DistrictId": 49 }, { "Id": 2418, "Name": "Tân Thái 2", "DistrictId": 49 }, { "Id": 2419, "Name": "Tân Thái 3", "DistrictId": 49 }, { "Id": 2420, "Name": "Tân Thái 4", "DistrictId": 49 }, { "Id": 2421, "Name": "Tân Thái 5", "DistrictId": 49 }, { "Id": 2422, "Name": "Tân Thái 6", "DistrictId": 49 }, { "Id": 2423, "Name": "Tân Thái 7", "DistrictId": 49 }, { "Id": 2424, "Name": "Tân Thái 8", "DistrictId": 49 }, { "Id": 2425, "Name": "Tân Thái 9", "DistrictId": 49 }, { "Id": 2426, "Name": "Tân Thái 10", "DistrictId": 49 }, { "Id": 3044, "Name": "Đông Kinh Nghĩa Thục", "DistrictId": 49 }, { "Id": 3059, "Name": "Phạm Thiều", "DistrictId": 49 }, { "Id": 3359, "Name": "Lê Chân", "DistrictId": 49 }, { "Id": 3376, "Name": "Nguyễn Văn Siêu", "DistrictId": 49 }, { "Id": 3382, "Name": "Nguyễn Chí Diễu", "DistrictId": 49 }, { "Id": 3418, "Name": "Hoàng Bích Sơn", "DistrictId": 49 }, { "Id": 4054, "Name": "Nguyễn Thiện Kế", "DistrictId": 49 }, { "Id": 4060, "Name": "Phạm Tu", "DistrictId": 49 }, { "Id": 4069, "Name": "Tôn Quang Phiệt", "DistrictId": 49 }, { "Id": 5052, "Name": "Ngọc Hân", "DistrictId": 49 }, { "Id": 5153, "Name": "Nguyễn Phục", "DistrictId": 49 }, { "Id": 5665, "Name": "Đỗ Anh Hàn", "DistrictId": 49 }, { "Id": 5861, "Name": "An Nhơn 1", "DistrictId": 49 }, { "Id": 5869, "Name": "Phan Bôi", "DistrictId": 49 }, { "Id": 5881, "Name": "Đỗ Huy Uyển", "DistrictId": 49 }, { "Id": 5888, "Name": "Phạm Cực Lượng", "DistrictId": 49 }, { "Id": 6056, "Name": "An Hải 6", "DistrictId": 49 }, { "Id": 6057, "Name": "An Hải 3", "DistrictId": 49 }, { "Id": 6107, "Name": "An Hải 10", "DistrictId": 49 }, { "Id": 6142, "Name": "Hà Bổng", "DistrictId": 49 }, { "Id": 6203, "Name": "Nguyễn Công Sáu", "DistrictId": 49 }, { "Id": 6288, "Name": "Loseby", "DistrictId": 49 }, { "Id": 6289, "Name": "Phước Trường 6", "DistrictId": 49 }, { "Id": 6290, "Name": "Trần Đình Đàn", "DistrictId": 49 }, { "Id": 6460, "Name": "Phúc Hạo", "DistrictId": 49 }, { "Id": 6468, "Name": "Đỗ Thế Chấp", "DistrictId": 49 }, { "Id": 6477, "Name": "Tạ Mỹ Duật", "DistrictId": 49 }, { "Id": 6483, "Name": "Đinh Đạt", "DistrictId": 49 }, { "Id": 6486, "Name": "An Nhơn 7", "DistrictId": 49 }, { "Id": 6529, "Name": "Ngô Trí Hòa", "DistrictId": 49 }, { "Id": 6565, "Name": "Chu Huy Mân", "DistrictId": 49 }, { "Id": 6691, "Name": "Hương Hải Thiền Sư", "DistrictId": 49 }, { "Id": 6693, "Name": "Hoàng Đức Lương", "DistrictId": 49 }, { "Id": 6709, "Name": "Trần Đức Thông", "DistrictId": 49 }, { "Id": 6752, "Name": "Vũ Đình Long", "DistrictId": 49 }, { "Id": 6780, "Name": "An Cư 5", "DistrictId": 49 }, { "Id": 6791, "Name": "Đông Giang", "DistrictId": 49 }, { "Id": 6900, "Name": "An Hải 18", "DistrictId": 49 }, { "Id": 7079, "Name": "Lệ Ninh", "DistrictId": 49 }, { "Id": 7106, "Name": "An Cư 4", "DistrictId": 49 }, { "Id": 7199, "Name": "Mỹ Khê", "DistrictId": 49 }, { "Id": 7200, "Name": "An Cư 3", "DistrictId": 49 }, { "Id": 7201, "Name": "An Cư 2", "DistrictId": 49 }, { "Id": 7208, "Name": "Nguyễn Hữu Thông", "DistrictId": 49 }, { "Id": 7308, "Name": "Nguyễn Đức An", "DistrictId": 49 }, { "Id": 7336, "Name": "Hồ Sỹ Tân", "DistrictId": 49 }, { "Id": 7340, "Name": "Nại Hiên Đông 9", "DistrictId": 49 }, { "Id": 7352, "Name": "Nam Thọ 4", "DistrictId": 49 }, { "Id": 7354, "Name": "Lê Văn Quý", "DistrictId": 49 }, { "Id": 7423, "Name": "Đinh Thị Hòa", "DistrictId": 49 }, { "Id": 7429, "Name": "An Hải 7", "DistrictId": 49 }, { "Id": 7444, "Name": "Lê Sĩ Tân", "DistrictId": 49 }, { "Id": 7499, "Name": "Lê Tấn Toán", "DistrictId": 49 }, { "Id": 7621, "Name": "An Hòa 4", "DistrictId": 49 }, { "Id": 7718, "Name": "Lê Minh Trung", "DistrictId": 49 }, { "Id": 7860, "Name": "Thanh Bình Xanh", "DistrictId": 49 }, { "Id": 7900, "Name": "Hoàng Sỹ Khải", "DistrictId": 49 }, { "Id": 7948, "Name": "An Nhơn 5", "DistrictId": 49 }, { "Id": 8079, "Name": "An Nhơn 8", "DistrictId": 49 }, { "Id": 8105, "Name": "Lê Bôi", "DistrictId": 49 }, { "Id": 8153, "Name": "Lộc Phước", "DistrictId": 49 }, { "Id": 8170, "Name": "Cổ Mân 9", "DistrictId": 49 }, { "Id": 8206, "Name": "Đào Duy Kỳ", "DistrictId": 49 }, { "Id": 8268, "Name": "Phước Trường 4", "DistrictId": 49 }, { "Id": 8281, "Name": "Phước Tường 2", "DistrictId": 49 }, { "Id": 8389, "Name": "An Cư 7", "DistrictId": 49 }, { "Id": 8481, "Name": "An Đồn 5", "DistrictId": 49 }, { "Id": 8524, "Name": "Phước Trường 3", "DistrictId": 49 }, { "Id": 8525, "Name": "An Nhơn 6", "DistrictId": 49 }, { "Id": 8623, "Name": "Tân Phú 1", "DistrictId": 49 }, { "Id": 8624, "Name": "Tân Phú 2", "DistrictId": 49 }, { "Id": 8775, "Name": "An Nhơn 9", "DistrictId": 49 }, { "Id": 8778, "Name": "Morrison", "DistrictId": 49 }, { "Id": 8781, "Name": "Thích Phước Huệ", "DistrictId": 49 }, { "Id": 8843, "Name": "An Hải 15", "DistrictId": 49 }, { "Id": 8885, "Name": "Phước Trường 5", "DistrictId": 49 }, { "Id": 8913, "Name": "An Cư 1", "DistrictId": 49 }, { "Id": 8915, "Name": "Trần Sâm", "DistrictId": 49 }, { "Id": 8920, "Name": "Lê Mạnh Trinh", "DistrictId": 49 }, { "Id": 8949, "Name": "An Nhơn 3", "DistrictId": 49 }, { "Id": 8978, "Name": "An Hải 20", "DistrictId": 49 }, { "Id": 9168, "Name": "An Hải 11", "DistrictId": 49 }, { "Id": 9230, "Name": "An Hải 1", "DistrictId": 49 }, { "Id": 9238, "Name": "Nại Hiên Đông 2", "DistrictId": 49 }, { "Id": 9247, "Name": "Phước Trường 1", "DistrictId": 49 }, { "Id": 9266, "Name": "An Hải Bắc 8", "DistrictId": 49 }, { "Id": 9281, "Name": "Võ Nghĩa", "DistrictId": 49 }, { "Id": 9295, "Name": "Phước Trường 10", "DistrictId": 49 }, { "Id": 9296, "Name": "Phước Trường 11", "DistrictId": 49 }, { "Id": 9297, "Name": "Phước Trường 12", "DistrictId": 49 }, { "Id": 9298, "Name": "Phước Trường 14", "DistrictId": 49 }, { "Id": 9299, "Name": "Phước Trường 15", "DistrictId": 49 }, { "Id": 9337, "Name": "An Cư 6", "DistrictId": 49 }, { "Id": 9374, "Name": "Mân Quang 4", "DistrictId": 49 }, { "Id": 9402, "Name": "Nại Thịnh 2", "DistrictId": 49 }, { "Id": 9412, "Name": "An Hải 14", "DistrictId": 49 }, { "Id": 12396, "Name": "An Hải 4", "DistrictId": 49 }, { "Id": 12397, "Name": "An Mỹ", "DistrictId": 49 }, { "Id": 12398, "Name": "An Nhơn", "DistrictId": 49 }, { "Id": 12399, "Name": "An Thượng", "DistrictId": 49 }, { "Id": 12400, "Name": "An Thượng 1", "DistrictId": 49 }, { "Id": 12401, "Name": "An Thượng 27", "DistrictId": 49 }, { "Id": 12402, "Name": "An Thượng 4", "DistrictId": 49 }, { "Id": 12403, "Name": "Bạch Đằng Đông", "DistrictId": 49 }, { "Id": 12404, "Name": "Bùi Dương Lịch", "DistrictId": 49 }, { "Id": 12405, "Name": "Bùi Hữu Nghĩa", "DistrictId": 49 }, { "Id": 12406, "Name": "Bùi Huy Bích", "DistrictId": 49 }, { "Id": 12407, "Name": "Bùi Lâm", "DistrictId": 49 }, { "Id": 12408, "Name": "Bùi Thị Xuân", "DistrictId": 49 }, { "Id": 12409, "Name": "Cẩm Bắc 10", "DistrictId": 49 }, { "Id": 12410, "Name": "Cao Bá Nhạ", "DistrictId": 49 }, { "Id": 12411, "Name": "Cao Bá Quát", "DistrictId": 49 }, { "Id": 12412, "Name": "Châu Thị Vĩnh Tế", "DistrictId": 49 }, { "Id": 12413, "Name": "Chương Dương", "DistrictId": 49 }, { "Id": 12414, "Name": "Dã Tượng", "DistrictId": 49 }, { "Id": 12415, "Name": "Đại lộ Thăng Long", "DistrictId": 49 }, { "Id": 12416, "Name": "Đặng Nhữ Lâm", "DistrictId": 49 }, { "Id": 12417, "Name": "Đặng Trần Côn", "DistrictId": 49 }, { "Id": 12418, "Name": "Đinh Lễ", "DistrictId": 49 }, { "Id": 12419, "Name": "Đỗ Hành", "DistrictId": 49 }, { "Id": 12420, "Name": "Đỗ Xuân Hợp", "DistrictId": 49 }, { "Id": 12421, "Name": "Đông Du", "DistrictId": 49 }, { "Id": 12422, "Name": "Dương Đình Nghệ", "DistrictId": 49 }, { "Id": 12423, "Name": "Dương Thanh", "DistrictId": 49 }, { "Id": 12424, "Name": "Dương Văn An", "DistrictId": 49 }, { "Id": 12425, "Name": "Giáp Hải", "DistrictId": 49 }, { "Id": 12426, "Name": "Hà Chương", "DistrictId": 49 }, { "Id": 12427, "Name": "Hà Đặc", "DistrictId": 49 }, { "Id": 12428, "Name": "Hậu Lân", "DistrictId": 49 }, { "Id": 12429, "Name": "Hiệp Thành 13", "DistrictId": 49 }, { "Id": 12430, "Name": "Hồ Học Lãm", "DistrictId": 49 }, { "Id": 12431, "Name": "Hồ Nghinh", "DistrictId": 49 }, { "Id": 12432, "Name": "Hồ Xuân Hương", "DistrictId": 49 }, { "Id": 12433, "Name": "Hoa Lư", "DistrictId": 49 }, { "Id": 12434, "Name": "Hoàng Kế Viêm", "DistrictId": 49 }, { "Id": 12435, "Name": "Hoàng Quốc Việt", "DistrictId": 49 }, { "Id": 12436, "Name": "Hoàng Sa", "DistrictId": 49 }, { "Id": 12437, "Name": "Hoàng Sĩ Khải", "DistrictId": 49 }, { "Id": 12438, "Name": "Khúc Hạo", "DistrictId": 49 }, { "Id": 12439, "Name": "Lâm Hoành", "DistrictId": 49 }, { "Id": 12440, "Name": "Lê Bình", "DistrictId": 49 }, { "Id": 12441, "Name": "Lê Cảnh Tuân", "DistrictId": 49 }, { "Id": 12442, "Name": "Lê Đức Thọ", "DistrictId": 49 }, { "Id": 12443, "Name": "Lê Hữu Kiều", "DistrictId": 49 }, { "Id": 12444, "Name": "Lê Hữu Trác", "DistrictId": 49 }, { "Id": 12445, "Name": "Lê Lộ", "DistrictId": 49 }, { "Id": 12446, "Name": "Lê Phụng Hiểu", "DistrictId": 49 }, { "Id": 12447, "Name": "Lê Quang Đạo", "DistrictId": 49 }, { "Id": 12448, "Name": "Lê Thước", "DistrictId": 49 }, { "Id": 12449, "Name": "Lê Văn Huân", "DistrictId": 49 }, { "Id": 12450, "Name": "Lê Văn Lương", "DistrictId": 49 }, { "Id": 12451, "Name": "Lê Văn Thiêm", "DistrictId": 49 }, { "Id": 12452, "Name": "Lê Văn Thứ", "DistrictId": 49 }, { "Id": 12453, "Name": "Lương Hữu Khánh", "DistrictId": 49 }, { "Id": 12454, "Name": "Lương Thế Vinh", "DistrictId": 49 }, { "Id": 12455, "Name": "Lưu Hữu Phước", "DistrictId": 49 }, { "Id": 12456, "Name": "Lý Đạo Thành", "DistrictId": 49 }, { "Id": 12457, "Name": "Lý Ông Trọng", "DistrictId": 49 }, { "Id": 12458, "Name": "Lý Thái Tổ", "DistrictId": 49 }, { "Id": 12459, "Name": "Lý Thánh Tông", "DistrictId": 49 }, { "Id": 12460, "Name": "Lý Văn Tố", "DistrictId": 49 }, { "Id": 12461, "Name": "Mai Hắc Đế", "DistrictId": 49 }, { "Id": 12462, "Name": "Mỹ An 18", "DistrictId": 49 }, { "Id": 12463, "Name": "Nam Thọ 1", "DistrictId": 49 }, { "Id": 12464, "Name": "Ngô Quang Huy", "DistrictId": 49 }, { "Id": 12465, "Name": "Ngô Quyền", "DistrictId": 49 }, { "Id": 12466, "Name": "Nguyễn Bỉnh Khiêm", "DistrictId": 49 }, { "Id": 12467, "Name": "Nguyễn Cao Luyện", "DistrictId": 49 }, { "Id": 12468, "Name": "Nguyễn Công Trứ", "DistrictId": 49 }, { "Id": 12469, "Name": "Nguyễn Đăng Giai", "DistrictId": 49 }, { "Id": 12470, "Name": "Nguyễn Địa Lô", "DistrictId": 49 }, { "Id": 12471, "Name": "Nguyễn Duy Hiệu", "DistrictId": 49 }, { "Id": 12472, "Name": "Nguyễn Hiền", "DistrictId": 49 }, { "Id": 12473, "Name": "Nguyễn Huy Chương", "DistrictId": 49 }, { "Id": 12474, "Name": "Nguyễn Khắc Cần", "DistrictId": 49 }, { "Id": 12475, "Name": "Nguyễn Khanh", "DistrictId": 49 }, { "Id": 12476, "Name": "Nguyễn Lâm", "DistrictId": 49 }, { "Id": 12477, "Name": "Nguyễn Phan Vinh", "DistrictId": 49 }, { "Id": 12478, "Name": "Nguyễn Sáng", "DistrictId": 49 }, { "Id": 12479, "Name": "Nguyễn Sỹ Cố", "DistrictId": 49 }, { "Id": 12480, "Name": "Nguyễn Thế Lộc", "DistrictId": 49 }, { "Id": 12481, "Name": "Nguyễn Thị Định", "DistrictId": 49 }, { "Id": 12482, "Name": "Nguyễn Thiếp", "DistrictId": 49 }, { "Id": 12483, "Name": "Nguyễn Thông", "DistrictId": 49 }, { "Id": 12484, "Name": "Nguyễn Trực", "DistrictId": 49 }, { "Id": 12485, "Name": "Nguyễn Trung Trực", "DistrictId": 49 }, { "Id": 12486, "Name": "Nguyễn Tuân", "DistrictId": 49 }, { "Id": 12487, "Name": "Nguyễn Văn Côn", "DistrictId": 49 }, { "Id": 12488, "Name": "Nguyễn Văn Cừ", "DistrictId": 49 }, { "Id": 12489, "Name": "Nguyễn Văn Linh", "DistrictId": 49 }, { "Id": 12490, "Name": "Nguyễn Văn Thoại", "DistrictId": 49 }, { "Id": 12491, "Name": "Nguyễn Xuân Khoát", "DistrictId": 49 }, { "Id": 12492, "Name": "Phạm Cự Lượng", "DistrictId": 49 }, { "Id": 12493, "Name": "Phạm Hữu Kính", "DistrictId": 49 }, { "Id": 12494, "Name": "Phạm Vấn", "DistrictId": 49 }, { "Id": 12495, "Name": "Phạm Văn Đồng", "DistrictId": 49 }, { "Id": 12496, "Name": "Phạm Văn Xảo", "DistrictId": 49 }, { "Id": 12497, "Name": "Phan Bá Phiến", "DistrictId": 49 }, { "Id": 12498, "Name": "Phan Chu Trinh", "DistrictId": 49 }, { "Id": 12499, "Name": "Phan Đăng Lưu", "DistrictId": 49 }, { "Id": 12500, "Name": "Phan Huy Chú", "DistrictId": 49 }, { "Id": 12501, "Name": "Phan Huy Ích", "DistrictId": 49 }, { "Id": 12502, "Name": "Phan Huy Thực.", "DistrictId": 49 }, { "Id": 12503, "Name": "Phan Tứ", "DistrictId": 49 }, { "Id": 12504, "Name": "Phan Văn Hớn", "DistrictId": 49 }, { "Id": 12505, "Name": "Phó Đức Chính", "DistrictId": 49 }, { "Id": 12506, "Name": "Phú Lộc 15", "DistrictId": 49 }, { "Id": 12507, "Name": "Sương Nguyệt Ánh", "DistrictId": 49 }, { "Id": 12508, "Name": "Tân Chánh Hiệp 16", "DistrictId": 49 }, { "Id": 12509, "Name": "Tản Đà", "DistrictId": 49 }, { "Id": 12510, "Name": "Thạch Lam", "DistrictId": 49 }, { "Id": 12511, "Name": "Thái Phiên", "DistrictId": 49 }, { "Id": 12512, "Name": "Thạnh Lộc 27", "DistrictId": 49 }, { "Id": 12513, "Name": "Thanh Thủy", "DistrictId": 49 }, { "Id": 12514, "Name": "Thanh Vinh", "DistrictId": 49 }, { "Id": 12515, "Name": "Thế Lữ", "DistrictId": 49 }, { "Id": 12516, "Name": "Thủ Khoa Huân", "DistrictId": 49 }, { "Id": 12517, "Name": "Tô Hiến Thành", "DistrictId": 49 }, { "Id": 12518, "Name": "Tôn Thất Tùng", "DistrictId": 49 }, { "Id": 12519, "Name": "Trại Gà", "DistrictId": 49 }, { "Id": 12520, "Name": "Trần Đức Lương", "DistrictId": 49 }, { "Id": 12521, "Name": "Trần Hưng Đạo", "DistrictId": 49 }, { "Id": 12522, "Name": "Trần Khát Chân", "DistrictId": 49 }, { "Id": 12523, "Name": "Trần Nguyên Hãn", "DistrictId": 49 }, { "Id": 12524, "Name": "Trần Nhân Tông", "DistrictId": 49 }, { "Id": 12525, "Name": "Trần Quang Diệu", "DistrictId": 49 }, { "Id": 12526, "Name": "Trần Quang Khải", "DistrictId": 49 }, { "Id": 12527, "Name": "Trần Thanh Mại", "DistrictId": 49 }, { "Id": 12528, "Name": "Trần Thánh Tông", "DistrictId": 49 }, { "Id": 12529, "Name": "Trần Văn Dư", "DistrictId": 49 }, { "Id": 12530, "Name": "Triệu Việt Vương", "DistrictId": 49 }, { "Id": 12531, "Name": "Trương Định", "DistrictId": 49 }, { "Id": 12532, "Name": "Trương Hán Siêu", "DistrictId": 49 }, { "Id": 12533, "Name": "Trương Quốc Dung", "DistrictId": 49 }, { "Id": 12534, "Name": "Trường Sa", "DistrictId": 49 }, { "Id": 12535, "Name": "Trường Sơn", "DistrictId": 49 }, { "Id": 12536, "Name": "Vân Đồn", "DistrictId": 49 }, { "Id": 12537, "Name": "Võ Duy Ninh", "DistrictId": 49 }, { "Id": 12538, "Name": "Võ Nguyên Giáp", "DistrictId": 49 }, { "Id": 12539, "Name": "Võ Trường Toản", "DistrictId": 49 }, { "Id": 12540, "Name": "Võ Văn Kiệt", "DistrictId": 49 }, { "Id": 12541, "Name": "Vũ Tông Phan", "DistrictId": 49 }, { "Id": 12542, "Name": "Vương Thừa Vũ", "DistrictId": 49 }, { "Id": 12543, "Name": "Yết Kiêu", "DistrictId": 49 }, { "Id": 20273, "Name": "Hồ Thấu", "DistrictId": 49 }, { "Id": 20274, "Name": "Nại Hiên Đông", "DistrictId": 49 }, { "Id": 20275, "Name": "Phùng Khắc Khoan", "DistrictId": 49 }] }, { "Id": 50, "Name": "Thanh Khê", "CityId": 4, "Wards": [{ "Id": 251, "Name": "An Khê", "DistrictId": 50 }, { "Id": 252, "Name": "Chính Gián", "DistrictId": 50 }, { "Id": 253, "Name": "Tam Thuận", "DistrictId": 50 }, { "Id": 254, "Name": "Tân Chính", "DistrictId": 50 }, { "Id": 255, "Name": "Thạc Gián", "DistrictId": 50 }, { "Id": 256, "Name": "Hòa Khê", "DistrictId": 50 }, { "Id": 257, "Name": "Xuân Hà", "DistrictId": 50 }, { "Id": 258, "Name": "Vĩnh Trung", "DistrictId": 50 }, { "Id": 259, "Name": "Thanh Khê Đông", "DistrictId": 50 }, { "Id": 260, "Name": "Thanh Khê Tây", "DistrictId": 50 }, { "Id": 12070, "Name": "Thanh Lộc Đán", "DistrictId": 50 }], "Streets": [{ "Id": 2068, "Name": "Đặng Đình Vân", "DistrictId": 50 }, { "Id": 2347, "Name": "Nguyễn Đăng", "DistrictId": 50 }, { "Id": 2348, "Name": "Nguyễn Công Hãng", "DistrictId": 50 }, { "Id": 2355, "Name": "Trần Xuân Lê", "DistrictId": 50 }, { "Id": 2356, "Name": "Thúc Tề", "DistrictId": 50 }, { "Id": 2369, "Name": "Phần Lăng 1", "DistrictId": 50 }, { "Id": 2370, "Name": "Phần Lăng 2", "DistrictId": 50 }, { "Id": 2371, "Name": "Phần Lăng 3", "DistrictId": 50 }, { "Id": 2372, "Name": "Phần Lăng 4", "DistrictId": 50 }, { "Id": 2373, "Name": "Phần Lăng 5", "DistrictId": 50 }, { "Id": 2430, "Name": "Thanh Huy 1", "DistrictId": 50 }, { "Id": 2431, "Name": "Thanh Huy 2", "DistrictId": 50 }, { "Id": 2433, "Name": "Thanh Huy 4", "DistrictId": 50 }, { "Id": 2434, "Name": "Thanh Huy 5", "DistrictId": 50 }, { "Id": 2439, "Name": "Thuận An 2", "DistrictId": 50 }, { "Id": 2440, "Name": "Thuận An 3", "DistrictId": 50 }, { "Id": 2465, "Name": "Thuận An 4", "DistrictId": 50 }, { "Id": 2467, "Name": "Thuận An 5", "DistrictId": 50 }, { "Id": 2469, "Name": "Thuận An 6", "DistrictId": 50 }, { "Id": 2470, "Name": "Thuận An 7", "DistrictId": 50 }, { "Id": 2494, "Name": "Tiên Sơn 12", "DistrictId": 50 }, { "Id": 2495, "Name": "Tiên Sơn 13", "DistrictId": 50 }, { "Id": 2497, "Name": "Tiên Sơn 15", "DistrictId": 50 }, { "Id": 2503, "Name": "Tiên Sơn 18", "DistrictId": 50 }, { "Id": 2504, "Name": "Tiên Sơn 19", "DistrictId": 50 }, { "Id": 2507, "Name": "Tiên Sơn 21", "DistrictId": 50 }, { "Id": 2536, "Name": "Xuân Đán 2", "DistrictId": 50 }, { "Id": 3413, "Name": "Đinh Núp", "DistrictId": 50 }, { "Id": 3423, "Name": "Phạm Nhữ Tăng", "DistrictId": 50 }, { "Id": 3968, "Name": "Hà Khê", "DistrictId": 50 }, { "Id": 5781, "Name": "Dũng Sĩ", "DistrictId": 50 }, { "Id": 5782, "Name": "Lý Triện", "DistrictId": 50 }, { "Id": 5886, "Name": "Hồ Tương", "DistrictId": 50 }, { "Id": 5893, "Name": "Phần Lăng 7", "DistrictId": 50 }, { "Id": 5902, "Name": "Nguyễn Đình Tựu", "DistrictId": 50 }, { "Id": 5975, "Name": "Thái Thị Bôi", "DistrictId": 50 }, { "Id": 5986, "Name": "Nguyễn Phước Nguyên", "DistrictId": 50 }, { "Id": 6076, "Name": "Phú Lộc 11", "DistrictId": 50 }, { "Id": 6077, "Name": "Nguyễn Trung Đức", "DistrictId": 50 }, { "Id": 6091, "Name": "Xuân Hòa 1", "DistrictId": 50 }, { "Id": 6201, "Name": "Yên Khê 2", "DistrictId": 50 }, { "Id": 6236, "Name": "Trần Tống", "DistrictId": 50 }, { "Id": 6326, "Name": "Mẹ Nhu", "DistrictId": 50 }, { "Id": 6356, "Name": "Lê Thị Tính", "DistrictId": 50 }, { "Id": 6487, "Name": "Nguyễn Phước Thái", "DistrictId": 50 }, { "Id": 6492, "Name": "Phần Lăng 9", "DistrictId": 50 }, { "Id": 6496, "Name": "Yên Khê 1", "DistrictId": 50 }, { "Id": 6659, "Name": "Lê Thị Xuyến", "DistrictId": 50 }, { "Id": 6798, "Name": "Hà Xuân", "DistrictId": 50 }, { "Id": 6812, "Name": "Vũ Huỳnh", "DistrictId": 50 }, { "Id": 6814, "Name": "Phú Lộc 4", "DistrictId": 50 }, { "Id": 6850, "Name": "An Xuân", "DistrictId": 50 }, { "Id": 6983, "Name": "Mẹ Hiền", "DistrictId": 50 }, { "Id": 7061, "Name": "Xuân Đán 1", "DistrictId": 50 }, { "Id": 7202, "Name": "Trần Thanh Trung", "DistrictId": 50 }, { "Id": 7206, "Name": "Phú Lộc 18", "DistrictId": 50 }, { "Id": 7297, "Name": "An Xuân 2", "DistrictId": 50 }, { "Id": 7298, "Name": "An Xuân 1", "DistrictId": 50 }, { "Id": 7383, "Name": "Lê Duy Đình", "DistrictId": 50 }, { "Id": 7474, "Name": "Dũng Sĩ Thanh Khê", "DistrictId": 50 }, { "Id": 7515, "Name": "Bàu Hạc 4", "DistrictId": 50 }, { "Id": 7563, "Name": "Nguyễn Thị Bảy", "DistrictId": 50 }, { "Id": 7721, "Name": "Phần Lăng 11", "DistrictId": 50 }, { "Id": 7782, "Name": "Nguyễn Văn Phương", "DistrictId": 50 }, { "Id": 7963, "Name": "Bàu Trảng 6", "DistrictId": 50 }, { "Id": 8004, "Name": "Bàu Hạc", "DistrictId": 50 }, { "Id": 8032, "Name": "Nguyễn Văn Huề", "DistrictId": 50 }, { "Id": 8053, "Name": "Lương Nhữ Hộc", "DistrictId": 50 }, { "Id": 8155, "Name": "Phan Nhu", "DistrictId": 50 }, { "Id": 8262, "Name": "Hà Xuân 1", "DistrictId": 50 }, { "Id": 8371, "Name": "Quang Dũng", "DistrictId": 50 }, { "Id": 8541, "Name": "Đông Lợi 1", "DistrictId": 50 }, { "Id": 8884, "Name": "Phần Lăng 6", "DistrictId": 50 }, { "Id": 8934, "Name": "Phú Lộc 12", "DistrictId": 50 }, { "Id": 9129, "Name": "Bàu Hạc 1", "DistrictId": 50 }, { "Id": 9161, "Name": "Đức Lợi 1", "DistrictId": 50 }, { "Id": 9170, "Name": "Đinh Thị Vân", "DistrictId": 50 }, { "Id": 9222, "Name": "Bàu Trảng 1", "DistrictId": 50 }, { "Id": 9231, "Name": "Bàu Hạc 6", "DistrictId": 50 }, { "Id": 9271, "Name": "Nguyễn Hữu Thuận", "DistrictId": 50 }, { "Id": 9353, "Name": "Phạm Ngọc Mậu", "DistrictId": 50 }, { "Id": 9394, "Name": "Bàu Làng", "DistrictId": 50 }, { "Id": 12544, "Name": "29", "DistrictId": 50 }, { "Id": 12545, "Name": "30/4", "DistrictId": 50 }, { "Id": 12546, "Name": "Bầu Hạc 5", "DistrictId": 50 }, { "Id": 12547, "Name": "Bàu Hạt 2", "DistrictId": 50 }, { "Id": 12548, "Name": "Bầu Trảng 2", "DistrictId": 50 }, { "Id": 12549, "Name": "Bàu Trảng 5", "DistrictId": 50 }, { "Id": 12550, "Name": "Bế Văn Đàn", "DistrictId": 50 }, { "Id": 12551, "Name": "Cách Mạng Tháng Tám", "DistrictId": 50 }, { "Id": 12552, "Name": "Cần Giuộc", "DistrictId": 50 }, { "Id": 12553, "Name": "Cù Chính Lan", "DistrictId": 50 }, { "Id": 12554, "Name": "Đặng Thai Mai", "DistrictId": 50 }, { "Id": 12555, "Name": "Đặng Thùy Trâm", "DistrictId": 50 }, { "Id": 12556, "Name": "Đào Duy Anh", "DistrictId": 50 }, { "Id": 12557, "Name": "Đào Duy Từ", "DistrictId": 50 }, { "Id": 12558, "Name": "Đào Nguyên Phổ", "DistrictId": 50 }, { "Id": 12559, "Name": "Điện Biên Phủ", "DistrictId": 50 }, { "Id": 12560, "Name": "Đinh Tiên Hoàng", "DistrictId": 50 }, { "Id": 12561, "Name": "Đỗ Đức Dục", "DistrictId": 50 }, { "Id": 12562, "Name": "Đỗ Ngọc Du", "DistrictId": 50 }, { "Id": 12563, "Name": "Đỗ Quang", "DistrictId": 50 }, { "Id": 12564, "Name": "Đoàn Nhữ Hài", "DistrictId": 50 }, { "Id": 12565, "Name": "Đống Đa", "DistrictId": 50 }, { "Id": 12566, "Name": "Dương Bích Liên", "DistrictId": 50 }, { "Id": 12567, "Name": "Hà Huy Tập", "DistrictId": 50 }, { "Id": 12568, "Name": "Hải Hồ", "DistrictId": 50 }, { "Id": 12569, "Name": "Hải Phòng", "DistrictId": 50 }, { "Id": 12570, "Name": "Hàm Nghi", "DistrictId": 50 }, { "Id": 12571, "Name": "Hàn Mặc Tử", "DistrictId": 50 }, { "Id": 12572, "Name": "Hồ Quý Ly", "DistrictId": 50 }, { "Id": 12573, "Name": "Hòa An 8", "DistrictId": 50 }, { "Id": 12574, "Name": "Hòa Mỹ 3", "DistrictId": 50 }, { "Id": 12575, "Name": "Hoàng Diệu", "DistrictId": 50 }, { "Id": 12576, "Name": "Hoàng Hoa Thám", "DistrictId": 50 }, { "Id": 12577, "Name": "Hùng Vương", "DistrictId": 50 }, { "Id": 12578, "Name": "Huỳnh Ngọc Huệ", "DistrictId": 50 }, { "Id": 12579, "Name": "Kim Hải", "DistrictId": 50 }, { "Id": 12580, "Name": "Kỳ Đồng", "DistrictId": 50 }, { "Id": 12581, "Name": "Lê Đình Dương", "DistrictId": 50 }, { "Id": 12582, "Name": "Lê Đình Lý", "DistrictId": 50 }, { "Id": 12583, "Name": "Lê Độ", "DistrictId": 50 }, { "Id": 12584, "Name": "Lê Duẩn", "DistrictId": 50 }, { "Id": 12585, "Name": "Lê Quang Sung", "DistrictId": 50 }, { "Id": 12586, "Name": "Lê Trọng Tấn", "DistrictId": 50 }, { "Id": 12587, "Name": "Lê Văn Thịnh", "DistrictId": 50 }, { "Id": 12588, "Name": "Lý Nhân Tông", "DistrictId": 50 }, { "Id": 12589, "Name": "Lý Thái Tổ", "DistrictId": 50 }, { "Id": 12590, "Name": "Lý Thái Tông", "DistrictId": 50 }, { "Id": 12591, "Name": "Mai Xuân Thưởng", "DistrictId": 50 }, { "Id": 12592, "Name": "Man Thiện", "DistrictId": 50 }, { "Id": 12593, "Name": "Ngô Đức Kế", "DistrictId": 50 }, { "Id": 12594, "Name": "Ngô Gia Khảm", "DistrictId": 50 }, { "Id": 12595, "Name": "Ngọc Hồi", "DistrictId": 50 }, { "Id": 12596, "Name": "Nguyễn Biểu", "DistrictId": 50 }, { "Id": 12597, "Name": "Nguyễn Cảnh Dị", "DistrictId": 50 }, { "Id": 12598, "Name": "Nguyễn Cao", "DistrictId": 50 }, { "Id": 12599, "Name": "Nguyễn Đình Tứ", "DistrictId": 50 }, { "Id": 12600, "Name": "Nguyễn Đức Trung", "DistrictId": 50 }, { "Id": 12601, "Name": "Nguyễn Gia Thiều", "DistrictId": 50 }, { "Id": 12602, "Name": "Nguyễn Giản Thanh", "DistrictId": 50 }, { "Id": 12603, "Name": "Nguyễn Hoàng", "DistrictId": 50 }, { "Id": 12604, "Name": "Nguyễn Hữu Thọ", "DistrictId": 50 }, { "Id": 12605, "Name": "Nguyễn Huy Lượng", "DistrictId": 50 }, { "Id": 12606, "Name": "Nguyễn Huy Tưởng", "DistrictId": 50 }, { "Id": 12607, "Name": "Nguyễn Khang", "DistrictId": 50 }, { "Id": 12608, "Name": "Nguyễn Khoa Chiêm", "DistrictId": 50 }, { "Id": 12609, "Name": "Nguyễn Nghiêm", "DistrictId": 50 }, { "Id": 12610, "Name": "Nguyễn Nhàn", "DistrictId": 50 }, { "Id": 12611, "Name": "Nguyễn Tất Thành", "DistrictId": 50 }, { "Id": 12612, "Name": "Nguyễn Thị Thập", "DistrictId": 50 }, { "Id": 12613, "Name": "Nguyễn Tri Phương", "DistrictId": 50 }, { "Id": 12614, "Name": "Nguyễn Văn Linh", "DistrictId": 50 }, { "Id": 12615, "Name": "Ông Ích Khiêm", "DistrictId": 50 }, { "Id": 12616, "Name": "Phạm Văn Nghị", "DistrictId": 50 }, { "Id": 12617, "Name": "Phan Anh", "DistrictId": 50 }, { "Id": 12618, "Name": "Phan Chu Trinh", "DistrictId": 50 }, { "Id": 12619, "Name": "Phần Lăng 16", "DistrictId": 50 }, { "Id": 12620, "Name": "Phần Lăng 17", "DistrictId": 50 }, { "Id": 12621, "Name": "Phần Lăng 8", "DistrictId": 50 }, { "Id": 12622, "Name": "Phan Phú Tiên", "DistrictId": 50 }, { "Id": 12623, "Name": "Phan Thanh", "DistrictId": 50 }, { "Id": 12624, "Name": "Phan Thành Tài", "DistrictId": 50 }, { "Id": 12625, "Name": "Phú Lộc 15", "DistrictId": 50 }, { "Id": 12626, "Name": "Phùng Hưng", "DistrictId": 50 }, { "Id": 12627, "Name": "Tản Đà", "DistrictId": 50 }, { "Id": 12628, "Name": "Thân Nhân Trung", "DistrictId": 50 }, { "Id": 12629, "Name": "Thanh Huy 3", "DistrictId": 50 }, { "Id": 12630, "Name": "Thuận An 1", "DistrictId": 50 }, { "Id": 12631, "Name": "Tiên Sơn 10", "DistrictId": 50 }, { "Id": 12632, "Name": "Tiên Sơn 11", "DistrictId": 50 }, { "Id": 12633, "Name": "Tiên Sơn 14", "DistrictId": 50 }, { "Id": 12634, "Name": "Tiên Sơn 16", "DistrictId": 50 }, { "Id": 12635, "Name": "Tiên Sơn 17", "DistrictId": 50 }, { "Id": 12636, "Name": "Tiên Sơn 20", "DistrictId": 50 }, { "Id": 12637, "Name": "Tô Hiệu", "DistrictId": 50 }, { "Id": 12638, "Name": "Tô Ngọc Vân", "DistrictId": 50 }, { "Id": 12639, "Name": "Tôn Đản", "DistrictId": 50 }, { "Id": 12640, "Name": "Tôn Đức Thắng", "DistrictId": 50 }, { "Id": 12641, "Name": "Tôn Thất Đạm", "DistrictId": 50 }, { "Id": 12642, "Name": "Tôn Thất Tùng", "DistrictId": 50 }, { "Id": 12643, "Name": "Trần Anh Tông", "DistrictId": 50 }, { "Id": 12644, "Name": "Trần Can", "DistrictId": 50 }, { "Id": 12645, "Name": "Trần Cao Vân", "DistrictId": 50 }, { "Id": 12646, "Name": "Trần Cừ", "DistrictId": 50 }, { "Id": 12647, "Name": "Trần Đình Long", "DistrictId": 50 }, { "Id": 12648, "Name": "Trần Nguyên Đán", "DistrictId": 50 }, { "Id": 12649, "Name": "Trần Phước Thành", "DistrictId": 50 }, { "Id": 12650, "Name": "Trần Thái Tông", "DistrictId": 50 }, { "Id": 12651, "Name": "Trần Thị Lý", "DistrictId": 50 }, { "Id": 12652, "Name": "Trường Chinh", "DistrictId": 50 }, { "Id": 12653, "Name": "Văn Cao", "DistrictId": 50 }, { "Id": 12654, "Name": "Võ Nguyên Giáp", "DistrictId": 50 }, { "Id": 12655, "Name": "Võ Văn Tần", "DistrictId": 50 }, { "Id": 12656, "Name": "Vũ Quỳnh", "DistrictId": 50 }, { "Id": 12657, "Name": "Xô Viết Nghệ Tĩnh", "DistrictId": 50 }, { "Id": 12658, "Name": "Xuân Hòa 2", "DistrictId": 50 }, { "Id": 20276, "Name": "Phú Lộc 10", "DistrictId": 50 }] }, { "Id": 51, "Name": "Hòa Vang", "CityId": 4, "Wards": [{ "Id": 227, "Name": "Hòa Bắc", "DistrictId": 51 }, { "Id": 228, "Name": "Hòa Châu", "DistrictId": 51 }, { "Id": 229, "Name": "Hòa Khương", "DistrictId": 51 }, { "Id": 230, "Name": "Hòa Liên", "DistrictId": 51 }, { "Id": 231, "Name": "Hòa Nhơn", "DistrictId": 51 }, { "Id": 232, "Name": "Hòa Ninh", "DistrictId": 51 }, { "Id": 233, "Name": "Hòa Phong", "DistrictId": 51 }, { "Id": 234, "Name": "Hòa Phú", "DistrictId": 51 }, { "Id": 235, "Name": "Hòa Phước", "DistrictId": 51 }, { "Id": 236, "Name": "Hòa Sơn", "DistrictId": 51 }, { "Id": 237, "Name": "Hòa Tiến", "DistrictId": 51 }], "Streets": [{ "Id": 1509, "Name": "Ngũ Hành Sơn", "DistrictId": 51 }, { "Id": 2375, "Name": "Trừ Văn Thố", "DistrictId": 51 }, { "Id": 2377, "Name": "Nguyễn Thế Lịch", "DistrictId": 51 }, { "Id": 2379, "Name": "Trần Văn Lan", "DistrictId": 51 }, { "Id": 2384, "Name": "Cẩm Bắc 7", "DistrictId": 51 }, { "Id": 2385, "Name": "Hồ Sĩ Dương", "DistrictId": 51 }, { "Id": 2386, "Name": "Cẩm Bắc 10", "DistrictId": 51 }, { "Id": 2387, "Name": "Đông Thạnh 2", "DistrictId": 51 }, { "Id": 2396, "Name": "Nguyễn Bảo", "DistrictId": 51 }, { "Id": 2399, "Name": "Bàu Tràm Trung", "DistrictId": 51 }, { "Id": 5732, "Name": "Cẩm Toại Trung", "DistrictId": 51 }, { "Id": 5733, "Name": "Bạch Đằng Đông", "DistrictId": 51 }, { "Id": 6082, "Name": "602", "DistrictId": 51 }, { "Id": 6395, "Name": "Cẩm Thoại Tây", "DistrictId": 51 }, { "Id": 7325, "Name": "DH8", "DistrictId": 51 }, { "Id": 7417, "Name": "Phú Hòa 1", "DistrictId": 51 }, { "Id": 7486, "Name": "603", "DistrictId": 51 }, { "Id": 7691, "Name": "409", "DistrictId": 51 }, { "Id": 7996, "Name": "ĐT 605", "DistrictId": 51 }, { "Id": 8538, "Name": "Quốc Lộ 14B", "DistrictId": 51 }, { "Id": 8974, "Name": "Hòa Liên 4", "DistrictId": 51 }, { "Id": 9346, "Name": "Phong Nam", "DistrictId": 51 }, { "Id": 12213, "Name": "14B", "DistrictId": 51 }, { "Id": 12214, "Name": "Đông Thạnh 1", "DistrictId": 51 }, { "Id": 12215, "Name": "Đông Thạnh 3", "DistrictId": 51 }, { "Id": 12216, "Name": "ĐT 602", "DistrictId": 51 }, { "Id": 12217, "Name": "Hà Duy Phiên", "DistrictId": 51 }, { "Id": 12218, "Name": "Hà Huy Tập", "DistrictId": 51 }, { "Id": 12219, "Name": "Hoàng Đạo Thành", "DistrictId": 51 }, { "Id": 12220, "Name": "Lê Đức Thọ", "DistrictId": 51 }, { "Id": 12221, "Name": "Lê Duy Lương", "DistrictId": 51 }, { "Id": 12222, "Name": "Nguyễn Đăng Đạo", "DistrictId": 51 }, { "Id": 12223, "Name": "Nguyễn Phan Vinh", "DistrictId": 51 }, { "Id": 12224, "Name": "Nguyễn Trung Ngạn", "DistrictId": 51 }, { "Id": 12225, "Name": "Nguyễn Trung Trực", "DistrictId": 51 }, { "Id": 12226, "Name": "Phạm Phú Tiết", "DistrictId": 51 }, { "Id": 12227, "Name": "Quốc lộ 1A", "DistrictId": 51 }, { "Id": 12228, "Name": "Trần Huy Liệu", "DistrictId": 51 }, { "Id": 12229, "Name": "Trần Quang Khải", "DistrictId": 51 }, { "Id": 12230, "Name": "Trần Văn Dư", "DistrictId": 51 }, { "Id": 12231, "Name": "Trịnh Đình Thảo", "DistrictId": 51 }, { "Id": 12232, "Name": "Văn Tiến Dũng", "DistrictId": 51 }, { "Id": 12233, "Name": "Xô Viết Nghệ Tĩnh", "DistrictId": 51 }, { "Id": 12234, "Name": "Xuân Thủy", "DistrictId": 51 }, { "Id": 20254, "Name": "Hoàng Thị Ái", "DistrictId": 51 }, { "Id": 20255, "Name": "Phạm Hùng", "DistrictId": 51 }, { "Id": 20256, "Name": "Tùng Lâm 8", "DistrictId": 51 }] }, { "Id": 52, "Name": "Hoàng Sa", "CityId": 4, "Wards": [], "Streets": [] }] };

    //    console.log(data);
    //    for (var i = 0; i < data.Data[1].Streets.length; i++) {
        
    //          var data_insert = JSON.stringify({
    //              "Is_Insert": 1, "Name": data.Data[3].Streets[i].Name, "ID": 0, "IDtrouser": 1014
    //          });

    //          $http.post(host + "/api/QuanTri/edit_Streets/", data_insert).then(function(response) {
    //              console.log('thanhcong' + i);
    //          });
        
          
    //    }
      
    //};
    //$scope.insert_duong();
    $rootScope.tab_index = 1;
    $rootScope.change_tab = function (index) {
        $rootScope.tab_index = index;
    };
    $rootScope.dang_xuat = function () {
        //$rootScope.taikhoan.test = 0;
        $rootScope.taikhoan = { test: 0, tenkh: "", username: "", makh: "", admin: false };
        $cookies.remove('user');
        $location.path('/TrangChu/');
    };
    $rootScope.add_office_follow = function (mavp) {
       
        var data = JSON.stringify({ "_mavp": mavp, "_makh": $rootScope.taikhoan.makh });
        $http.put(host + "/api/TimKiem/add_office_follow/", data).then(function (response) {
            swal({
                title: "Thông Báo",
                text: "Bạn Đã Thêm BDS Vào Danh Sách Quan Tâm",
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
                // window.open(host + '/#/TimKiem', '_self', '');
            }
                 );
        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
    $rootScope.test_follow = function (makh, mavp) {
        var test = false;
        var url = host + "/api/TimKiem/test_follow/?makh=" + makh + "&mavp=" + mavp;
        $http.get(url).then(function(response) {
            var data = response.data;
            test = data;
            
            //console.log(test);
            //return test;
        });
        return test;
        //console.log(test);
        //return test;

    };
    $rootScope.remove_office_follow = function (mavp) {
      
        var data = JSON.stringify({ "_mavp": mavp, "_makh": $rootScope.taikhoan.makh });
        $http.put(host + "/api/TimKiem/remove_office_follow/", data).then(function (response) {
            swal({
                title: "Thông Báo",
                text: "Bạn Đã Xóa BDS Khỏi Danh Sách Quan Tâm",
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
                // window.open(host + '/#/TimKiem', '_self', '');
            }
                 );
        }, function (res) {
            swal("Thông báo", "Server unavailable", "error");
        });
    };
  
}]);
app.controller("route_view", ['$scope', '$window', '$cookies', function ($scope, $window, $cookies) {
   
   
}]);
app.run(['$location', '$rootScope', '$cookies', '$http', '$window', '$timeout', '$route',
    function ($location, $rootScope, $cookies, $http, $window, $timeout, $route) {
     var routespermision = ['/TaiKhoan', '/TaiKhoan/dangbai'];
    var routespermision3 = ['/TaiKhoan/ql_tracuu', '/TaiKhoan/ql_khachhang', '/TaiKhoan/ql_baidang'];
    var routespermision2 = ['/TheoDoi/'];

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
       
        $rootScope.title = current.$$route.title;
       
        $rootScope.scrolltotop();
        if (current.replace === true) {
            
        }
    });
    //console.log($location.path());

    //var str = $cookies.get('user');
    //console.log(str);
    
   
    $rootScope.$on('$routeChangeStart', function (evt, to, from) {
        //console.log(to.authorize);
       
        if (to.authorize === true) {
           
            var str = $cookies.get('user');
            //console.log(str);
            
            if (str != null) {
                $http.get(host + "/api/DangNhap/ThongTinKH/?makh=" + str).then(function(res) {
                    var data = res.data;
                    if (data == null) {
                        $rootScope.taikhoan.test = 0;
                        $rootScope.taikhoan.admin = false;
                    } else {
                        $rootScope.taikhoan.test = 1;
                        $rootScope.taikhoan.username = data._User;
                        $rootScope.taikhoan.tenkh = data._TenKH;
                        $rootScope.taikhoan.makh = data._MaKH;
                        $rootScope.taikhoan.admin = data._Admin;
                    }
                    if ($rootScope.taikhoan.test == 0) {
                        swal("Thông báo", "Mời Bạn Đăng Nhập Tài Khoản", "warning");
                        $window.history.back();
                    }
                    //console.log($rootScope.taikhoan);
                    //if (routespermision.indexOf($location.path()) != -1 && $rootScope.taikhoan.test == 0) {
                    //    swal("Thông báo", "Mời Bạn Đăng Nhập Tài Khoản", "warning");
                    //    $window.history.back();

                    //    //$location.path();
                    //}
                    //if (routespermision3.indexOf($location.path()) != -1 && $rootScope.taikhoan.admin == false) {
                    //    swal("Thông báo", "Bạn Không Có Quyền Hạn", "warning");
                    //    // $window.history.back();

                    //    $location.path('#/TimKiem');
                    //}
                    //if (routespermision2.indexOf($location.path()) != -1 && $rootScope.taikhoan.test == 0) {
                    //    swal("Thông báo", "Mời Bạn Đăng Nhập Tài Khoản", "warning");
                    //    // $window.history.back();

                    //    $location.path();
                    //}
                });
                //console.log($rootScope.taikhoan);
               
            } else {
                if ($rootScope.taikhoan.test == 0) {
                    swal("Thông báo", "Mời Bạn Đăng Nhập Tài Khoản", "warning");
                    $window.history.back();
                }
            }
           
        }
        if (to.admin === true) {
            if ($rootScope.taikhoan.admin != true) {
                swal("Thông báo", "Bạn Không Có Quyền Hạn", "warning");
                // $window.history.back();
                $window.history.back();
                //$location.path('#/TimKiem');
            }
        }
      
       // console.log($rootScope.taikhoan);
        //console.log($location.path());
       
       
    });
    
}]);
app.directive('ngFiles', [
    '$parse', function($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function(event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    }
]);
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
app.service("authService", function ($q, $timeout) {
    var self = this;
    this.authenticated = false;
    this.authorize = function () {
        return this
                .getInfo()
                .then(function (info) {
                    if (info.authenticated === true)
                        return true;
                    // anonymous
                    throw new AuthorizationError();
                });
    };
    this.getInfo = function () {
        return $timeout(function () {
            return self;
        }, 1000);
    };
});
app.directive("scroll", function ($window) {
    
    return function (scope, element, attrs) {
        scope.pageYOffsetCurrent = 0;
        scope.hien_nav_mini = 1;
        scope.boolChange = 1;
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset < 100) {
                scope.hien_nav_mini = 1;
            } else {
                scope.hien_nav_mini = 0;
            }
            if (this.pageYOffset - scope.pageYOffsetCurrent >= 1) {
                scope.boolChange = 0;
                scope.pageYOffsetCurrent = this.pageYOffset -1 ;
             
            } else {
                scope.boolChange = 1;
                scope.pageYOffsetCurrent = this.pageYOffset;
              
            }
            //console.log(scope.boolChange);
            scope.$apply();
        });
    };
});
app.service('anchorSmoothScroll', function () {

    this.scrollTo = function (eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});
app.directive('fbLike', [
    '$window', '$rootScope', function($window, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                fbLike: '=?'
            },
            link: function(scope, element, attrs) {
                if (!$window.FB) {
                    // Load Facebook SDK if not already loaded
                    $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
                        $window.FB.init({
                            appId: $rootScope.facebookAppId,
                            xfbml: true,
                            version: 'v2.0'
                        });
                        renderLikeButton();
                    });
                } else {
                    renderLikeButton();
                }

                var watchAdded = false;

                function renderLikeButton() {
                    if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                        // wait for data if it hasn't loaded yet
                        watchAdded = true;
                        var unbindWatch = scope.$watch('fbLike', function(newValue, oldValue) {
                            if (newValue) {
                                renderLikeButton();

                                // only need to run once
                                unbindWatch();
                            }

                        });
                        return;
                    } else {
                        element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-size="large" data-action="like" data-show-faces="true" data-share="true"></div>');
                        $window.FB.XFBML.parse(element.parent()[0]);
                    }
                }
            }
        };
    }
]);
app.directive('fbLikem', [
    '$window', '$rootScope', function ($window, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                fbLike: '=?'
            },
            link: function (scope, element, attrs) {
                if (!$window.FB) {
                    // Load Facebook SDK if not already loaded
                    $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                        $window.FB.init({
                            appId: $rootScope.facebookAppId,
                            xfbml: true,
                            version: 'v2.0'
                        });
                        renderLikeButton();
                    });
                } else {
                    renderLikeButton();
                }

                var watchAdded = false;

                function renderLikeButton() {
                    if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                        // wait for data if it hasn't loaded yet
                        watchAdded = true;
                        var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                            if (newValue) {
                                renderLikeButton();

                                // only need to run once
                                unbindWatch();
                            }

                        });
                        return;
                    } else {
                        element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-size="small" data-action="like" data-show-faces="true" data-share="true"></div>');
                        $window.FB.XFBML.parse(element.parent()[0]);
                    }
                }
            }
        };
    }
]);
    app.directive('googlePlus', [
        '$window', function($window) {
            return {
                restrict: 'A',
                scope: {
                    googlePlus: '=?'
                },
                link: function(scope, element, attrs) {
                    if (!$window.gapi) {
                        // Load Google SDK if not already loaded
                        $.getScript('//apis.google.com/js/platform.js', function() {
                            renderPlusButton();
                        });
                    } else {
                        renderPlusButton();
                    }

                    var watchAdded = false;

                    function renderPlusButton() {
                        if (!!attrs.googlePlus && !scope.googlePlus && !watchAdded) {
                            // wait for data if it hasn't loaded yet
                            watchAdded = true;
                            var unbindWatch = scope.$watch('googlePlus', function(newValue, oldValue) {
                                if (newValue) {
                                    renderPlusButton();

                                    // only need to run once
                                    unbindWatch();
                                }

                            });
                            return;
                        } else {
                            element.html('<div class="g-plusone"' + (!!scope.googlePlus ? ' data-href="' + scope.googlePlus + '"' : '') + ' data-size="standard"></div>');
                            $window.gapi.plusone.go(element.parent()[0]);
                        }
                    }
                }
            };
        }
    ]);
    app.directive('tweet', [
        '$window', '$location',
        function($window, $location) {
            return {
                restrict: 'A',
                scope: {
                    tweet: '=',
                    tweetUrl: '='
                },
                link: function(scope, element, attrs) {
                    if (!$window.twttr) {
                        // Load Twitter SDK if not already loaded
                        $.getScript('//platform.twitter.com/widgets.js', function() {
                            renderTweetButton();
                        });
                    } else {
                        renderTweetButton();
                    }

                    var watchAdded = false;

                    function renderTweetButton() {
                        if (!scope.tweet && !watchAdded) {
                            // wait for data if it hasn't loaded yet
                            watchAdded = true;
                            var unbindWatch = scope.$watch('tweet', function(newValue, oldValue) {
                                if (newValue) {
                                    renderTweetButton();

                                    // only need to run once
                                    unbindWatch();
                                }
                            });
                            return;
                        } else {
                            element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '" data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
                            $window.twttr.widgets.load(element.parent()[0]);
                        }
                    }
                }
            };
        }
    ]);

    app.directive('pinIt', [
         '$window', '$location',
         function ($window, $location) {
             return {
                 restrict: 'A',
                 scope: {
                     pinIt: '=',
                     pinItImage: '=',
                     pinItUrl: '='
                 },
                 link: function (scope, element, attrs) {
                     if (!$window.parsePins) {
                         // Load Pinterest SDK if not already loaded
                         (function (d) {
                             var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
                             p.type = 'text/javascript';
                             p.async = true;
                             p.src = '//assets.pinterest.com/js/pinit.js';
                             p['data-pin-build'] = 'parsePins';
                             p.onload = function () {
                                 if (!!$window.parsePins) {
                                     renderPinItButton();
                                 } else {
                                     setTimeout(p.onload, 100);
                                 }
                             };
                             f.parentNode.insertBefore(p, f);
                         }($window.document));
                     } else {
                         renderPinItButton();
                     }

                     var watchAdded = false;
                     function renderPinItButton() {
                         if (!scope.pinIt && !watchAdded) {
                             // wait for data if it hasn't loaded yet
                             watchAdded = true;
                             var unbindWatch = scope.$watch('pinIt', function (newValue, oldValue) {
                                 if (newValue) {
                                     renderPinItButton();
                                      
                                     // only need to run once
                                     unbindWatch();
                                 }
                             });
                             return;
                         } else {
                             element.html('<a href="//www.pinterest.com/pin/create/button/?url=' + (scope.pinItUrl || $location.absUrl()) + '&media=' + scope.pinItImage + '&description=' + scope.pinIt + '" data-pin-do="buttonPin" data-pin-config="beside"></a>');
                             $window.parsePins(element.parent()[0]);
                         }
                     }
                 }
             };
         }
    ]);
    app.directive('myDraggable',function(){
        return{
            restrict: 'A', // directive confined to be an attribute only
            link: function(scope,el,attrs){
                var opts = scope.$eval(attrs.myDraggable); // user $eval because the value of the our attribute is an actual JS Object
                // $apply is used because jQuery UI events occur outside the context of our directive and its controller and we need them to be "applied" to the scope of our directive
                var evts = {
                    drag: function(evt){ 
                        scope.$apply(function(){ scope.$emit('dragging',{}); });
                    },
                    stop: function(evt){ 
                        scope.$apply(function(){ scope.$emit('dragging.stopped',{}); });
                    }
                }; // end evts (events)
                var options = $.extend({},opts,evts) // extending the options to feed to the "draggable" function
                el.draggable(options); // jQuery UI
            }
        }
    });
app.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function() {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function() {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function() {
            scope.$apply();
        });
    }
});
app.directive('fancybox', function ($compile, $http) {
    return {
        restrict: 'A',

        controller: function ($scope) {
            $scope.openFancybox = function (url) {

                $http.get(url).then(function (response) {
                    if (response.status == 200) {

                        var template = angular.element(response.data);
                        var compiledTemplate = $compile(template);
                        compiledTemplate($scope);

                        $.fancybox.open({ content: template, type: 'html' });
                    }
                });
            };
        }
    };
});
