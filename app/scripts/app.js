'use strict';

var app = angular.module('site', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'IndexCtrl',
        templateUrl: '/templates/blog_index.html',
        resolve: {
          posts: function($http) {
            return $http.get('/posts.json');
          }
        }
      })
      .state('projects', {
        url: '/projects',
        templateUrl: '/templates/projects.html'
      })
      .state('blog', {
        url: '/:blog_title',
        templateUrl: function($stateParams) {
          return '/posts/'+$stateParams.blog_title+'.html';
        }
      });
  });

app.controller('IndexCtrl', function($scope, posts) {
  $scope.posts = posts.data;
  console.log(posts.data)

});

app.controller('BlogCtrl', function($scope) {

});

