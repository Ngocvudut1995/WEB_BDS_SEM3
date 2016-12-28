app.service('Map', function ($q) {

    this.init = function (latitude, longitude) {
        var options = {
            center: new google.maps.LatLng(latitude,longitude),
            zoom: 18,
            zoomControl: true,
            zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
            disableDefaultUI: true
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);

        //var markerOptions = {
        //    position: new google.maps.LatLng(latitude, longitude),
        //    map: this.map,
        //    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        //};

        //var marker = new google.maps.Marker(markerOptions);
        //var infowindow = new google.maps.InfoWindow({
        //    content:content
        //});

        //google.maps.event.addListener(marker, 'click', function () {
        //    if (infowindow.OPENED) {
        //        infowindow.close();
        //        infowindow.OPENED = false;
        //    } else {
        //        infowindow.open(map, marker);
        //        infowindow.OPENED = true;
        //    }

        //});

    }

    this.search = function (str) {
        var d = $q.defer();
        this.places.textSearch({ query: str }, function (results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    this.addMarker = function (res,str) {
        if (this.marker) this.marker.setMap(null);
        //this.marker = new google.maps.Marker({
        //    map: this.map,
        //    position: res.geometry.location,
        //    animation: google.maps.Animation.DROP
        //});
        this.map.setCenter(res.geometry.location);
        var infowindow1 = new google.maps.InfoWindow({
            content: str
        });
        var markerOptions = {
            position: res.geometry.location,
            map: this.map,
            animation: google.maps.Animation.DROP
        };
        var marker1 = new google.maps.Marker(markerOptions);
        google.maps.event.addListener(marker1, 'click', function () {
            if (infowindow1.OPENED) {
                infowindow1.close();
                infowindow1.OPENED = false;
            } else {
                infowindow1.open(this.map, marker1);
                infowindow1.OPENED = true;
            }

        });
    }

});

app.controller('newPlaceCtrl', function ($scope, Map) {

    $scope.place = {};

    $scope.search = function () {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function (res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function (status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }

    $scope.send = function () {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    }

    Map.init(16.063636, 108.21812499999999);
})