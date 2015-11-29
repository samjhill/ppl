
(function () {
	'use strict'; 

	angular.module('ppl', ['ngRoute', 'ngCookies'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$routeProvider
		.when('/', {
		    templateUrl: '../workout.html',
		    controller: 'workoutController'
		})
		.when('/workout', {
		    templateUrl: '../workout.html',
		    controller: 'workoutController'
		})
		.when('/activeWorkout', {
		    templateUrl: '../activeWorkout.html',
		    controller: 'activeWorkoutController'
		})
		.when('/auth/facebook/callback', {
		    templateUrl: '../routines.html',
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
			
			logout : function() {
				return $http({
					url:'/session',
					method: "DELETE"
				});
			},
			
			loginFB : function(body) {
				return $http({
					url:'/auth/facebook',
					method: "GET"
				});
			},
			
			routine : function(id) {
				return $http({
					url:'/api/routine/id/' + id,
					method: "GET"
				});
			},
			
			
			routines : function() {
				return $http({
					url:'/api/routines',
					method: "GET"
				});
			},
			
			completedRoutine : function(userId, body) {
				return $http({
					url:'/api/user/id/' + userId + '/completedRoutine',
					method: "POST",
					data: body
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
		//if($cookies.get('connect.sid')) {
		//	$rootScope.loggedIn = true;
		//	$location.path('/');
		//}

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
				$rootScope.user = angular.copy(payload.data);
				$rootScope.loggedIn = true;
				window.localStorage.setItem("userID", payload.data._id);
				$location.path('/');
			});
		}
	})
	.controller('menuController', function($scope, $cookies, $rootScope, $location, dataService) {
		$rootScope.menu = false;



		$scope.goTo = function(where) {
			$rootScope.menu = false;
			$location.path('/' + where);
		}

		$scope.logout = function() {
			dataService.logout()
			.then(function(payload){
				console.log(payload);
				console.log('logging out');
				delete $cookies['connect.sid'];
				$rootScope.menu = false;
				$rootScope.loggedIn = false;
				$location.path('/login');
			});
			
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

		
		
	})
	.controller('workoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';
		
		console.log('getting info for id ' + window.localStorage.getItem("userID"));
		dataService.userInfo(window.localStorage.getItem("userID"))
		.then(function(payload){
			$scope.completedRoutines = payload.data.data.completedRoutines;
			$scope.previousRoutine = $scope.completedRoutines[$scope.completedRoutines.length -1];
			
			//look up the next routine in the series
			dataService.routine($scope.previousRoutine.routineId)
			.then(function(payload){
				var routine = payload.data;
				
				for(var i = 0; i < routine.workouts.length; i++){
					if ($scope.previousRoutine.name == routine.workouts[i].name) {
						$scope.nextRoutine = routine.workouts[(i + 1) % routine.workouts.length]; //set next routine
						$scope.nextRoutine.routineId = routine._id; // set parent id
						break;
					}
				}
			});
		});
		
		/*
		 * starts the tutorial workout
		 */
		$scope.startFirstWorkout = function(){
			dataService.routines()
			.then(function (payload) {
				for(var i = 0; i < payload.data.length; i++){
					if(payload.data[i].workouts.length > 0){
						$rootScope.activeWorkout = payload.data[i].workouts[0];
						$rootScope.activeWorkout = payload.data[i]._id;
						$location.path('/activeWorkout');
					}
				}
				
			})
			
			
			
		}
			
		/*
		 * starts the next workout in the series
		 */
		$scope.startWorkout = function(){
			$location.path('/activeWorkout');
			$rootScope.activeWorkout = $scope.nextRoutine;
		}
	})
	.controller('activeWorkoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';
		
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
					delete movement.completed[setNumber];
					movement.timeLeft = 0;
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
		
		/*
		 * saves & completes the user's current workout
		 */
		$scope.saveWorkout = function( workout ){
			var currentdate = new Date(); //add the date to the object
			workout.dateCompleted = currentdate;
			
			dataService.completedRoutine(window.localStorage.getItem("userID"), workout)
			.then(function (payload) {
				console.log(payload);
				$location.path('workout');
			});
		};
		
	});
	

})();
