
var app = angular.module('AngularApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngCookies']);
var show_dn = 0;
app.controller("main", ['$scope', '$window', '$cookies','$rootScope', function ($scope, $window, $cookies,$rootScope) {
    $scope.name = 'Tra Cứu BDS';
    $rootScope.show_dn = 0;
    $rootScope.show_form_contact = 0;
    $rootScope.app = host;
    $rootScope.MaKH = 'KH10001';
    $rootScope.change_money = function (money) {
        money = money.replace(/,/g, ".");
        return money;
    };
    // $rootScope.app = "";
    $scope.img1 = "Content/Images/view.jpg";
    $scope.img2 = "Content/Images/banner_ser_vpa.png";
    $rootScope.dangnhap = function () {
        $rootScope.show_dn = 1;
    };

    var email = 'ngocvudut1995@gmail.com';
    $rootScope.send_gmail = function () {
        window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to='+email, '', 'width=400,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
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
     
        str = str.toLowerCase();
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
app.controller("index", ['$scope', '$window', '$cookies', '$rootScope', '$http', '$location', function ($scope, $window,
    $cookies, $rootScope, $http,$location) {
    $scope.username = "";
    $scope.password = "";
    $scope.body_width = window.innerWidth;
    $rootScope.taikhoan = { test: 0, makh:"",username: "" };
    var expireDate = new Date();
    expireDate.setMonth(11);
    expireDate.setDate(expireDate.getDate() + 1);
    //$cookies.put('technology', 'Web', { 'expires': expireDate });
    // Kiem tra co cookies luu tai khoan hay khong
    var str = $cookies.get('user');
    console.log(str);
    if (str != null) {
        $http.get(host + "api/DangNhap/ThongTinKH/?makh=" + str).then(function (res) {
            var data = res.data;
            $rootScope.taikhoan.test = 1;
            $rootScope.taikhoan.username = data._User;
            $rootScope.taikhoan.makh = data._MaKH;
        });
    }
    $rootScope.dangky = function () {
        $location.path('/DangKy');
    };
    // Kiem tra qua tring dang nhap
    $scope.ktdangnhap = function () {
 
        var url = host + "api/DangNhap/KT_DangNhap/?user=" + $scope.username + "&pass=" + $scope.password;
        $http.get(url).then(function (response) {
            var test = response.data;
            if (test != null) {
                
                $cookies.put('user', test);
                $http.get(host + "api/DangNhap/ThongTinKH/?makh="+test).then(function (res) {
                    var data = res.data;
                    $rootScope.taikhoan.test = 1;
                    $rootScope.taikhoan.username = data._User;
                    $rootScope.taikhoan.makh = data._MaKH;
                });
                swal("Thông báo", "Đăng nhập thành công", "success");
                //$window.alert("Login success!");
                $rootScope.show_dn = 0;
            } else {
                swal("Thông báo", "Tài Khoản Hoặc Mật Khẩu Không Hợp Lệ", "error");
            }
        });
        
       
    };
    $rootScope.tab_index = 1;
    $rootScope.change_tab = function (index) {
        $rootScope.tab_index = index;
    };
    $rootScope.dang_xuat = function () {
        //$rootScope.taikhoan.test = 0;
        $rootScope.taikhoan = { test: 0, makh: '', username: '' };
        $cookies.remove('user');
        $location.path('/TimKiem');
    };
  
}]);
app.controller("route_view", ['$scope', '$window', '$cookies', function ($scope, $window, $cookies) {
   
   
}]);
app.run(['$location', '$rootScope', function ($location, $rootScope) {

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
