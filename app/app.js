'use strict';

angular.module('myApp', [
    'ui.router',
    'ngResource',
    'ngCookies',
    'myApp.home',
    'myApp.login',
    'myApp.logout',
    'myApp.person',
    'myApp.personO',
    'myApp.add',
    'myApp.overview',
    'angular-input-stars',
    'ui.validate'
])

    .factory('principal', ['$q', '$http', '$cookies', function ($q, $http, $cookies) {

        var _identity = undefined,
            _authenticated = false;

        return {

            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },

            isAuthenticated: function () {
                if($cookies.get('Authorization') != undefined)
                    return true
            },

            isInRole: function (role) {
                if (!$cookies.get('Roles'))
                    return false;

                return $cookies.get('Roles').indexOf(role) != -1;
            },

            isInAnyRole: function (roles) {
                if ($cookies.get('Roles') == undefined) return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) return true;
                }

                return false;
            },

            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;
            },

            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) {
                    _identity = undefined;
                }

                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                var self = this;
                $http.get('http://127.0.0.1:3004/user', {
                    headers: {
                        'Authorization': 'token ' + $cookies.get('Authorization'),
                        'Role': $cookies.get('Roles'),
                        'Content-Type': 'application/json'
                    }
                })
                    .success(function (data) {
                        self.authenticate(data);
                        deferred.resolve(_identity);
                    })
                    .error(function () {
                        self.authenticate(null);
                        deferred.resolve(_identity);
                    });

                return deferred.promise;
            }
        };
    }
    ])

    .factory('authorization', ['$rootScope', '$state', 'principal',
        function ($rootScope, $state, principal) {
            return {
                authorize: function () {
                    return principal.identity()
                        .then(function () {
                                var isAuthenticated = principal.isAuthenticated();
                                if (isAuthenticated) {
                                    if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0
                                        && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                        alert("Access denied");
                                        $state.go('home');
                                    }
                                }
                                else {
                                    $rootScope.returnToState = $rootScope.toState;
                                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                                    $state.go('login', {}, {reload: true});
                                }
                            }, function () {
                                alert("ERROR !");
                                $state.go('login', {}, {reload: true});
                            }
                        );
                }
            };
        }
    ])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        };

        var person = {
            name: 'person',
            url: '/person/{personId}',
            data: {
                roles: ['admin', 'pracownik']
            },
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'person/person.html',
            controller: 'PersonCtrl'
        };

        var personO = {
            name: 'personO',
            url: '/personO/{personId}',
            data: {
                roles: []
            },
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'person/personO.html',
            controller: 'PersonOCtrl'
        };

        var add = {
            name: 'add',
            url: '/add',
            data: {
                roles: ['admin', 'policjant', 'pracownik']
            },
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'add/add.html',
            controller: 'AddCtrl'
        };

        var overview = {
            name: 'overview',
            url: '/overview',
            data: {
                roles: []
            },
            templateUrl: 'overview/overview.html',
            controller: 'OverviewCtrl'
        };


        var login = {
            name: 'login',
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        };

        var logout = {
            name: 'logout',
            url: '/logout',
            onEnter: ['$cookies', '$state', function ($cookies, $state) {
                $cookies.remove('Authorization');
                alert("Wylogowane pomyślnie");
                if ($state.transition) {
                    $state.transition.finally(function () {
                        $state.go('home', {});
                    });
                }
            }],
            controller: 'LogoutCtrl'
        };

        $stateProvider.state(home);

        $stateProvider.state(add);
        $stateProvider.state(overview);

        $stateProvider.state(person);
        $stateProvider.state(personO);

        $stateProvider.state(login);
        $stateProvider.state(logout);
    }
    ])

    .controller('MyAppCtrl', ['$scope', '$rootScope', 'principal', function ($scope, $rootScope, principal) {
        $rootScope.principal = principal;
    }])

    .run(['$rootScope', '$state', '$stateParams',
        'authorization', 'principal',
        function ($rootScope, $state, $stateParams,
                  authorization, principal) {
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toStateParams) {
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;

                    if (principal.isAuthenticated() === false)
                        authorization.authorize();
                });
        }
    ]);