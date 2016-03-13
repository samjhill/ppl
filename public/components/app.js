
(function () {
	'use strict'; 

	angular.module('ppl', ['ngRoute', 'ngCookies', 'chart.js'])
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
		.when('/stats', {
		    templateUrl: '../stats.html',
		    controller: 'statsController'
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
			
			user : function() {
				return $http({
					url:'/api/user',
					method: "GET"
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
	.factory('authInterceptorService', ['$q','$location', function ($q, $location){
		var responseError = function (rejection) {
		    if (rejection.status === 403) {
			$location.path('login');
			$rootScope.loggedIn = false;
		    }
		    return $q.reject(rejection);
		};
	    
		return {
		    responseError: responseError
		};
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptorService');
	}])
	.controller('loginController', function($scope, dataService, $cookies, $location, $rootScope, $sce) {
		$rootScope.loggedIn = false;
		
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
	.controller('statsController', function ($scope, $rootScope, dataService, $location, $cookies) {
		$scope.loading = true;

		$rootScope.activeMenu = 'stats';

		dataService.user()
		.then(function(payload){
			$scope.loading = false;

			var monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];

			var workoutsByMonth = {};

			for(var i = 0; i < payload.data.data.completedRoutines.length; i++){
				var d = new Date(payload.data.data.completedRoutines[i].dateCompleted);
				var n = d.getMonth();
				if(workoutsByMonth[monthNames[n]]){
					workoutsByMonth[monthNames[n]] += 1;
				}
				else {
					workoutsByMonth[monthNames[n]] = 0; //initialize
					workoutsByMonth[monthNames[n]] += 1;
				}
			}

			$scope.labels = Object.keys(workoutsByMonth);
			$scope.series = ['Workouts Completed, by Month'];
			var vals = Object.keys(workoutsByMonth).map(function (key) {
			    return workoutsByMonth[key];
			});
			console.log($scope.labels);
			console.log(vals);
			$scope.data = [vals]; 
		});

		
		// $scope.onClick = function (points, evt) {
		//     console.log(points, evt);
		// };
		
	})
	.controller('workoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';
		
		dataService.user()
		.then(function(payload){
			console.log(payload);
			$rootScope.user = angular.copy(payload.data);
			window.localStorage.setItem("userID", payload.data._id);
			
			if (payload.data.data && payload.data.data.completedRoutines && payload.data.data.completedRoutines.length > 0) { //if there is prior user data
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
			}
			else { //new user
				$scope.completedRoutines = [];
			}
			
			
			
			
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
						$rootScope.activeWorkout.routineId = payload.data[i]._id;
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
			//console.log(movement.completed);
		}
		
		/*
		 * Timer functions
		 */
		$scope.startTimer = function(movement){
			if (movement.timeLeft) { //timer has already been started; we just want to reset it
				movement.timeLeft = movement.restTime;
				movement.startTime = Date.now(); //reset the start time
				console.log('resetting the timer');
				console.log(movement.startTime)
			}
			else {
				movement.timeLeft = movement.restTime;
				movement.startTime = Date.now();
				console.log(movement.startTime);
				var i = setInterval(timer, 1000);

				function timer() {
					if ( movement.timeLeft < 1) {
						clearInterval(i);
						return;
					}

					var elapsed = Math.abs(Date.now() - movement.startTime);
					movement.timeLeft = movement.restTime - Math.round(elapsed/1000);
					
					$scope.$apply();
				}
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
