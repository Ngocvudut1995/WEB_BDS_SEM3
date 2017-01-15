//var host = 'http://shome.ddns.net/VanPhong/';
//var host = '';
app.config(function ($routeProvider) {
    //var app = '/TraCuuBDS/';
    var app = '';
    $routeProvider
        .when("/TrangChu", {
            templateUrl: app + "Home/TrangChu",
            controller: "trangchuCtrl",
            title: "Trang chủ tracuuBDS.com"
        })
        .when("/TimKiem", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", caseInsensitiveMatch: true, title: "Tìm Kiếm" })
        .when("/TimKiem/:sell/:h/:p/:d/:g/:dt/:k/:type/:huongnha", { templateUrl: app + "Home/TimKiem", controller: "timkiemCtrl", title: "Tìm Kiếm" })
        .when("/GioiThieu", {
            templateUrl: app + "Home/GioiThieu",
            controller: "gioithieuCtrl",
            title: "Giới thiệu trang tracuuBDS.com"
        })
      
        .when("/ChiTiet/:id/", {
            templateUrl: app + "Home/ChiTiet",
            controller: "chitietCtrl",
            title: "Trang Chi Tiết"
            //resolve: {
            //    meta: ['$rootScope', '$routeParams', '$http', function ($rootScope, $routeParams, $http) {
            //        console.log($routeParams.id);
            //        return $http.get(host + "/api/ChiTiet/get_title_by_id/?mavp=" + $routeParams.id).then(function (response) {
            //            var title = response.data;
            //            console.log(title);
            //            $rootScope.title = title + " | TracuuBDS.com";
            //        });


            //    }]
            //}
               
           

        })
         .when("/TheoDoi", {
             templateUrl: app + "Home/TheoDoi",
             controller: "theodoiCtrl",
             title: "Trang Bài Đăng Đã Theo Dõi",
             authorize: true

         })
         .when("/TheoDoi/:id", {
             templateUrl: app + "Home/TheoDoi",
             controller: "theodoiCtrl",
             title: "Trang Bài Đăng Đã Theo Dõi",
             authorize: true

         })
        .when("/TaiKhoan", {
            templateUrl: app + "Home/TaiKhoan",
            controller: "taikhoanCtrl",
            title: "Trang Tài Khoản",
            authorize: true,
            replace: true

        })
        .when("/TaiKhoan/:select/", {
            templateUrl: app + "Home/TaiKhoan",
            controller: "taikhoanCtrl",
            title: "Tài Khoản",
            authorize: true

        })
         .when("/TaiKhoan/:select/baidang/:id", {
             templateUrl: app + "Home/QuanTriTaiKhoan",
             controller: "taikhoanCtrl",
             title: "Tài Khoản",
             authorize: true,

         })
         .when("/TaiKhoan/:select/:id", {
             templateUrl: app + "Home/QuanTriTaiKhoan",
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

    .otherwise({ redirectTo: "/TrangChu", dontTrack: true });
});








