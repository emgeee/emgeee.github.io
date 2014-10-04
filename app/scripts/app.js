'use strict';

angular.module('site', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('about', {
        url: '/',
        templateUrl: 'templates/about.html'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'templates/projects.html'
      })
      .state('blog', {
        url: '/blog',
        templateUrl: 'templates/blog.html'
      });
  });

