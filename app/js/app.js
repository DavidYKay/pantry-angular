'use strict';

/* App Module */

angular.module('recipecat', ['recipecatFilters', 'recipecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/recipes', {templateUrl: 'partials/recipe-list.html',   controller: RecipeListCtrl}).
      when('/recipe/new', {templateUrl: 'partials/recipe-new.html',   controller: RecipeNewCtrl}).
      when('/recipes/:recipeId', {templateUrl: 'partials/recipe-detail.html', controller: RecipeDetailCtrl}).
      otherwise({redirectTo: '/recipes'});
}]);
