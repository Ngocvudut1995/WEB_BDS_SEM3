

app.directive('slider', function ($timeout) {
    //var app = "/VanPhong/";
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '=',
            miniimages:'=',
            info: '=',
            host: '=',
            windowWidths: '=',
        },
        link: function(scope, elem, attrs) {
            scope.currentIndex = 0;
            scope.index_mini = 1;
            scope.body_width = window.innerWidth;
            scope.myVar = 1;
            scope.next = function () {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };
            scope.change_money = function(money) {
                money = money.replace(/,/g, ".");
                return money;
            };
            scope.prev = function () {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };
            scope.down = function () {
                if (scope.miniimages.length - 1 >= scope.index_mini + 2) {
                    scope.index_mini += 2;
                }
                
            };

            scope.up = function () {
                if (scope.index_mini - 2 >= 0) {
                    scope.index_mini -= 2;
                }
                //scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };
            scope.show = function (index) {
                scope.images.forEach(function (image) {
                    image.visible = false;
                });
                scope.images[index].visible = true;
            };
            scope.$watch('currentIndex', function () {
                scope.images.forEach(function (image) {
                    image.visible = false;
                });
                scope.images[scope.currentIndex].visible = true;
            });
            scope.$watch('index_mini', function () {
                scope.miniimages.forEach(function (image) {
                    image.visible = false;
                });
                for (var i = scope.index_mini - 1; i < scope.index_mini + 2; i++)
                {
                    scope.miniimages[i].visible = true;
                }
                
            });

            /* Start: For Automatic slideshow*/

            var timer;

            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 5000);
                }, 5000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer);
            });
            scope.pause = function () {
                $timeout.cancel(timer);
            };
            /* End : For Automatic slideshow*/
        },
        templateUrl: host+"/Home/Slide"
    };
});
app.directive('slider_index', function ($timeout) {
    //var app = "/VanPhong/";
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '=',
           
        },
        link: function (scope, elem, attrs) {
            scope.currentIndex = 0;
            scope.index_mini = 1;
            scope.body_width = window.innerWidth;
            scope.myVar = 1;
            scope.next = function () {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };
           
            scope.prev = function () {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };
            scope.$watch('currentIndex', function () {
                scope.images.forEach(function (image) {
                    image.visible = false;
                });
                scope.images[scope.currentIndex].visible = true;
            });
          

            /* Start: For Automatic slideshow*/

            var timer;

            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 5000);
                }, 5000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer);
            });
            scope.pause = function () {
                $timeout.cancel(timer);
            };
            /* End : For Automatic slideshow*/
        },
        templateUrl: host + "/Home/Slide_Index"
    };
});