
(function () {
	'use strict'; 

	angular.module('ppl', ['ngRoute', 'ngCookies'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
		.when('/', {
		    templateUrl: '../workout.html',
		    controller: 'workoutController'
		})
		.when('/auth/facebook/callback', {
			templateUrl: '../workout.html',
		    controller: 'workoutController'
		})
		.when('/routines', {
		    templateUrl: '../routines.html',
		    controller: 'routineController'
		})
		.when('/login', {
		    templateUrl: '../login.html',
		    controller: 'loginController'
		});
	}])
	.run(['$rootScope', '$cookies', '$location', 'dataService', function ($rootScope, $cookies, $location, dataService) {
		if(!$cookies.get('connect.sid')) {
			$rootScope.loggedIn = false;
			$rootScope.menu = false;
			$location.path('/login');
		}
		else if (!$rootScope.user){
			$rootScope.loggedIn = true;
			$rootScope.loading = true;
			dataService.userInfo(window.localStorage.getItem("userID"))
			.then(function (payload) {
				$rootScope.user = payload.data;
				$rootScope.loading = false;
			});
		}
	}])
	.service('dataService', function($q, $http){
		return {
			login : function(body) {
				return $http({
					url:'/login',
					method: "POST",
					data: body
				});
			},

			loginFB : function(body) {
				return $http({
					url:'/auth/facebook/login',
					method: "GET"
				});
			},

			routines : function() {
				return $http({
					url:'/api/routines',
					method: "GET"
				});
			},

			userInfo : function(id) {
				return $http({
					url:'/api/user/id/' + id,
					method: "GET"
				});
			}
		};
	})
	.controller('loginController', function($scope, dataService, $cookies, $location, $rootScope, $sce) {
		$rootScope.loggedIn = false;
		if($cookies.get('connect.sid')) {
			$rootScope.loggedIn = true;
			$location.path('/');
		}
		$scope.submit = function() {
			var body = 
			{
				email: $scope.user,
				password: $scope.pass
			}
			dataService.login(body)
			.then(function (payload) {
				$rootScope.user = angular.copy(payload.data);
				$rootScope.loggedIn = true;
				window.localStorage.setItem("userID", payload.data._id);
				$location.path('/');
			});
		}
		$scope.submitFB = function() {

			dataService.loginFB()
			.then(function (payload) {
				console.log(payload.data);
			});
		}
	})
	.controller('menuController', function($scope, $cookies, $rootScope, $location) {
		$rootScope.menu = false;

		$scope.active = '';


		$scope.goTo = function(where) {
			$rootScope.menu = false;
			$scope.active = where;
			$location.path('/' + where);
		}

		$scope.logout = function() {
			$cookies.remove('connect.sid');
			$rootScope.menu = false;
			$rootScope.loggedIn = false;
			$location.path('/login');
		}
	})
	.controller('routineController', function ($scope, $rootScope, dataService, $location, $cookies) {
		$scope.loading = true;

		dataService.routines()
		.then(function (payload) {
			$scope.loading = false;
			$scope.routines = payload.data;
		})

		$scope.setRoutine = function(routine) {
			$scope.selectedRoutine = routine;
		}

		$scope.selectMuscleMenu = function() {
			for(var x in $scope.selectedRoutine.workouts) {
				for(var y in $scope.selectedRoutine.workouts[x].movements) {
					$scope.selectedRoutine.workouts[x].movements[y].showMuscle = false;
				}
			}

		}
	})
	.controller('workoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		

	});
	

})();
