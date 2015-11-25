
(function () {
	'use strict'; 

	angular.module('ppl', ['ngRoute', 'ngCookies'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
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
		else {
			$rootScope.loggedIn = true;
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
					url:'/auth/facebook',
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



		$scope.goTo = function(where) {
			$rootScope.menu = false;
			$location.path('/' + where);
		}

		$scope.logout = function() {
			console.log('logging out');
			$cookies.remove('connect.sid');
			$rootScope.menu = false;
			$rootScope.loggedIn = false;
			$location.path('/login');
		}
	})
	.controller('routineController', function ($scope, $rootScope, dataService, $location, $cookies) {
		$scope.loading = true;

		$rootScope.activeMenu = 'routines';

		dataService.routines()
		.then(function (payload) {
			$scope.loading = false;
			$scope.routines = payload.data;
		})

		$scope.setRoutine = function(routine) {
			$scope.selectedRoutine = routine;
		}
		
		$scope.getNumber = function(num) {
			return new Array(num);   
		}
		
		/*
		 * marks the set as complete
		 */
		$scope.completeSet = function(movement, setNumber, weight) {
			if (movement.completed !== undefined) { // have we set up the 'completed' array?
			}
			else {
				movement.completed = [];
			}
			
			if (movement.completed[setNumber] !== undefined) {  //user wants to decrease the amount of reps
				if (movement.completed[setNumber].reps === 0) { //if user has decreased the count to 0, reset it
					movement.completed[setNumber].reps = movement.reps;
				}
				else { //decrease the count by 1
					movement.completed[setNumber].reps = movement.completed[setNumber].reps - 1;
				}
			}
			else {
				movement.completed[setNumber] = {setNumber: setNumber, weight: weight, reps: movement.reps};
				$scope.startTimer(movement);
			}
			console.log(movement.completed);
		}
		
		/*
		 * Timer functions
		 */
		$scope.startTimer = function(movement){
			if (movement.timeLeft) { //timer has already been started; we just want to reset it
				movement.timeLeft = movement.restTime;
			}
			else {
				movement.timeLeft = movement.restTime;
				
				var i = setInterval(timer, 1000);
			}
			
			function timer() {
					if ( movement.timeLeft < 1) {
						clearInterval(i);
						return;
					}
					movement.timeLeft -= 1;
					
					$scope.$apply();
				}
		}
		/* end timer functions */
		
		$scope.selectMuscleMenu = function() {
			for(var x in $scope.selectedRoutine.workouts) {
				for(var y in $scope.selectedRoutine.workouts[x].movements) {
					$scope.selectedRoutine.workouts[x].movements[y].showMuscle = false;
				}
			}

		}
		
	})
	.controller('workoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';
	});
	

})();
