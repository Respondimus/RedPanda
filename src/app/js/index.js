'use strict';

angular.module('responymous', ['ngAnimate', 'ngCookies', 'ngTouch', 'ui.router', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/partials/main.html',
        controller: 'MainCtrl'
      })
      .state('student', {
        url: '/student',
        templateUrl: 'app/partials/student.html',
        controller: 'StudentCtrl'
      })
      .state('instructor', {
        url: '/instructor',
        templateUrl: 'app/partials/instructor.html'
      });

    $urlRouterProvider.otherwise('/');
  })
;
