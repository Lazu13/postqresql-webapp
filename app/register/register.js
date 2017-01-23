'use strict';

angular.module('myApp.register', [
    'ui.validate',
    'ui.router',
    'vcRecaptcha',
    'myApp'
])

    .controller('RegisterCtrl', function ($scope, $state, vcRecaptchaService, $http) {

        $scope.goto = function () {
            var dataToSend = {
                'id' : Math.floor((Math.random() * 9999999) + 1),
                'username': $scope.user.name,
                'password': $scope.user.password,
                'email' : $scope.user.email
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:8000/users/register',
                dataToSend,
                config
            )
                .success(function (data) {
                    //$cookies.put('Authorization', data.token);
                    //console.log($cookies.get('Authorization'));
                    alert("Zarejestrowano pomyślnie");
                    $state.go('login');
                })
                .error(function (data) {
                    console.log(data);
                    var keys = [];
                    for (var key in data)
                        keys.push(key);
                    alert("Nie zarejestrowana \nbłąd z: " + keys + " - " + data[key]);
                });
        };

        $scope.mySubmit = function (myFields) {
            console.log(myFields.myRecaptchaResponse);
        }

    })

    .directive('noSpaces', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function (inputValue) {

                    var transformedInput = inputValue.replace(/ /g, '');

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })

    .directive('toLower', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {

                    var transformedInput = inputValue.toLowerCase();

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        }
    });