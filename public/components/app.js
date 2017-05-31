
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
		})
		.when('/demo', {
			templateUrl: '../routines.html',
			controller: 'demoController'
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
			
			routineInProgress : function(userId, body) {
				return $http({
					url:'/api/user/id/' + userId + '/routineInProgress',
					method: "PUT",
					data: body
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
			};

			dataService.login(body)
			.then(function (payload) {
				$rootScope.user = angular.copy(payload.data);
				$rootScope.loggedIn = true;
				window.localStorage.setItem("userID", payload.data._id);
				$location.path('/');
			});
		};
	})
	.controller('demoController', function($http, $scope, $cookies, $rootScope, $location, dataService) {

		var body = 
			{
				email: 'demo@ppl.com',
				password: 'demo'
			};

			dataService.login(body)
			.then(function (payload) {
				$rootScope.user = angular.copy(payload.data);
				$rootScope.loggedIn = true;
				window.localStorage.setItem("userID", payload.data._id);
				$location.path('/');
			});
	})
	.controller('menuController', function($scope, $cookies, $rootScope, $location, dataService) {
		$rootScope.menu = false;

		$scope.goTo = function(where) {
			$rootScope.menu = false;
			$location.path('/' + where);
		};

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
		};
	})
	.controller('routineController', function ($scope, $rootScope, dataService, $location, $cookies) {
		$scope.loading = true;

		$rootScope.activeMenu = 'routines';

		dataService.routines()
		.then(function (payload) {
			$scope.loading = false;
			$scope.routines = payload.data;
		});
	})
	.controller('statsController', function ($scope, $rootScope, dataService, $location, $cookies) {
		$scope.loading = true;

		$rootScope.activeMenu = 'stats';

		dataService.user()
		.then(function(payload){
			$scope.loading = false;
			
			$scope.chartData = [];
			$scope.labels = [];
			$scope.series = [];

			var buildChart = function( labels, series, data ){
				$scope.labels.push( labels );
				$scope.series.push( series );
				$scope.chartData.push( data );
			};

			
			var monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];

			var workoutsByMonth = {};
			var movements = {};
			var dates = [];
			var weightDates = [];

			for(var i = 0; i < payload.data.data.completedRoutines.length; i++){
				var d = new Date(payload.data.data.completedRoutines[i].dateCompleted);
				dates.push(d);

				var n = d.getMonth();

				//collect all movements completed together, sorted by name, for later use
				for(var j = 0; j < payload.data.data.completedRoutines[i].movements.length; j++){
					if(!movements[payload.data.data.completedRoutines[i].movements[j].movement.name]){ //add the movement name to the collection
						movements[payload.data.data.completedRoutines[i].movements[j].movement.name] = [];
					}
					if(payload.data.data.completedRoutines[i].movements[j].weight){ //add the date the movement was performed, if weight was recorded
						var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
						if( weightDates.indexOf(date) == -1 ){
							weightDates.push(date);
						}
					}
					movements[payload.data.data.completedRoutines[i].movements[j].movement.name].push(payload.data.data.completedRoutines[i].movements[j]);
				}

				//workouts per month
				if(workoutsByMonth[monthNames[n]]){
					workoutsByMonth[monthNames[n]] += 1;
				}
				else {
					workoutsByMonth[monthNames[n]] = 0; //initialize
					workoutsByMonth[monthNames[n]] += 1;
				}
			}

			var vals = Object.keys(workoutsByMonth).map(function (key) {
			    return workoutsByMonth[key];
			});

			buildChart(Object.keys(workoutsByMonth), ['Workouts Completed'], [vals]);
			
			//weight lifted over time
			var weights = Object.keys(movements).map(function (key) {

				var weight = [];
				for(var i = 0; i < movements[key].length; i++){
					if(movements[key][i]['weight']){
						weight.push( movements[key][i]['weight'] );
					}
					else {
						weight.push( 0 );
					}
				}
				return weight;
			});
			buildChart(weightDates, Object.keys(movements), weights);
			
		});
	})
	.controller('workoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';
		
		dataService.user()
		.then(function(payload){
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

				if(payload.data.data.routineInProgress){
					$scope.inProgress = true;
				}
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
			});
		};
			
		/*
		 * starts the next workout in the series
		 */
		$scope.startWorkout = function(){
			$location.path('/activeWorkout');
			$rootScope.activeWorkout = $scope.nextRoutine;
		};
	})
	.controller('activeWorkoutController', function ($scope, $rootScope, $cookies, $location, dataService) {
		$rootScope.activeMenu = 'workout';

		//check for workout in progress
		dataService.user()
		.then(function(payload){
			$rootScope.completedRoutines = payload.data.data.completedRoutines;
			
			if(payload.data.data.routineInProgress){
				$rootScope.activeWorkout = payload.data.data.routineInProgress;
				
			}
			else {
				//get weight values for each movement
				//iterating backwards so we get the most recent and save time
				for(var i = $rootScope.completedRoutines.length - 1; i >= 0; i--){
					if($rootScope.completedRoutines[i]['name'] == $rootScope.activeWorkout.name){
						console.log($rootScope.completedRoutines[i]);
						for(var j = 0; j < $rootScope.activeWorkout.movements.length; j++){
							if($rootScope.completedRoutines[i].movements[j].weight){
								$rootScope.activeWorkout.movements[j].weight = $rootScope.completedRoutines[i].movements[j].weight;
							}
							else{
								$rootScope.activeWorkout.movements[j].weight = 0;
							}
						}
					}
				}
			}
		});

		

		$scope.getNumber = function(num) {
			return new Array(num);   
		};

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
				if (movement.completed[setNumber].reps < 1) { //if user has decreased the count to 0, reset it
					delete movement.completed[setNumber];
					movement.timeLeft = 0;
				}
				else { //decrease the count by 1
					movement.completed[setNumber].reps = movement.completed[setNumber].reps - 1;
				}
			}
			else {
				movement.completed[setNumber] = {setNumber: setNumber, weight: movement.weight, reps: movement.reps};
				console.log(movement);
				$scope.startTimer(movement);
				$scope.updateRoutineInProgress($rootScope.activeWorkout);
			}
		};
		
		$scope.updateRoutineInProgress = function( workout ) {
			dataService.routineInProgress(window.localStorage.getItem("userID"), workout)
			.then(function (payload) {
				console.log(payload);
			});
		};

		/*
		 * Timer functions
		 */
		$scope.startTimer = function(movement){
			if (movement.timeLeft) { //timer has already been started; we just want to reset it
				movement.timeLeft = movement.restTime;
				movement.startTime = Date.now(); //reset the start time
			}
			else {
				movement.timeLeft = movement.restTime;
				movement.startTime = Date.now();
				

				var timer = function() {
					if ( movement.timeLeft < 1) {
						clearInterval(i);
						delete movement.timeLeft;
						return;
					}

					var elapsed = Math.abs(Date.now() - movement.startTime);
					movement.timeLeft = movement.restTime - Math.round(elapsed/1000);
					if(movement.timeLeft < 1){
						movement.timeLeft = 0;
					}
					$scope.$apply();
				};

				var i = setInterval(timer, 1000);
			}
		};
		/* end timer functions */
		
		/*
		 * saves & completes the user's current workout
		 */
		$scope.saveWorkout = function( workout ){
			var currentdate = new Date(); //add the date to the object
			workout.dateCompleted = currentdate;
			
			dataService.completedRoutine(window.localStorage.getItem("userID"), workout)
			.then(function (payload) {
				$scope.updateRoutineInProgress({});
				$location.path('workout');
			});
		};
		
	});
	

})();
