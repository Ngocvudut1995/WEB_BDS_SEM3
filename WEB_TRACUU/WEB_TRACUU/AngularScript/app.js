var list_all = [];
var app = angular.module('AngularApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngCookies', 'textAngular']);
var show_dn = 0;
app.controller("main", ['$scope', '$window', '$cookies','$rootScope', function ($scope, $window, $cookies,$rootScope) {
    $scope.name = 'Tra Cứu BDS';
    $rootScope.show_dn = 0;
    $rootScope.loading = 0;
    $rootScope.show_form_contact = 0;
    $rootScope.app = host;
    //$rootScope.MaKH = 'KH10001';
    $rootScope.loading = 1;
   
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
app.controller("index", ['$scope', '$window', '$cookies', '$rootScope', '$http', '$location', function ($scope, $window,
    $cookies, $rootScope, $http,$location) {
    $scope.username = "";
    $scope.password = "";
    $rootScope.body_width = window.innerWidth;
    $rootScope.body_height = window.innerHeight;
    $rootScope.taikhoan = { test: 0, tenkh: null, username: null ,makh:null,admin:false};
    //var expireDate = new Date();
    //expireDate.setMonth(11);
    //expireDate.setDate(expireDate.getDate() + 1);
    $rootScope.open_dangbai = function () {
        $location.path('/TaiKhoan/dangbai/');
    };
    $http.get(host + "/api/TimKiem/get_VP").then(function (response) {
        //$scope.listVP = response.data;
        list_all = response.data;

        $rootScope.loading = 0;
    });
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
                
                $cookies.put('user', data._MaKH);
                //var data = res.data;
                $rootScope.taikhoan.test = 1;
                $rootScope.taikhoan.username = data._User;
                $rootScope.taikhoan.tenkh = data._TenKH;
                $rootScope.taikhoan.makh = data._MaKH;
                $rootScope.taikhoan.admin = data._Admin;
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
        $rootScope.taikhoan = { test: 0, tenkh: "", username: "", makh: "", admin: false };
        $cookies.remove('user');
        $location.path('/TimKiem');
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
            
            console.log(test);
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
app.run(['$location', '$rootScope', '$cookies', '$http', '$window', '$timeout', function ($location, $rootScope, $cookies, $http, $window, $timeout) {
     var routespermision = ['/TaiKhoan', '/TaiKhoan/dangbai'];
    var routespermision3 = ['/TaiKhoan/ql_tracuu', '/TaiKhoan/ql_khachhang', '/TaiKhoan/ql_baidang'];
    var routespermision2 = ['/TheoDoi/'];

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
       
        $rootScope.title = current.$$route.title;

        $rootScope.scrolltotop();
        if (current.view === true) {
           
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
            if (routespermision3.indexOf($location.path()) != -1 && $rootScope.taikhoan.admin != true) {
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
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset < 300) {
                scope.hien_nav_mini = 1;
            } else {
                scope.hien_nav_mini = 0;
            }
            if (this.pageYOffset - scope.pageYOffsetCurrent >= 1 && this.pageYOffset > 300) {
                scope.boolChange = 0;
                scope.pageYOffsetCurrent = this.pageYOffset;
             
            } else {
                scope.boolChange = 1;
                scope.pageYOffsetCurrent = this.pageYOffset;
              
            }
            scope.$apply();
        });
    };
});
