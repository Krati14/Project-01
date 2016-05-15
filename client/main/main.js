'use strict';

angular.module('myApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<main></main>'
      });
  });
