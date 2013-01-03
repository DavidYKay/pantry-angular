'use strict';

/* Controllers */

function RecipeListCtrl($scope, Recipe) {
  $scope.recipes = Recipe.query();
  $scope.orderProp = 'age';
}

//RecipeListCtrl.$inject = ['$scope', 'Recipe'];



function RecipeDetailCtrl($scope, $routeParams, Recipe) {
  $scope.recipe = Recipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
    $scope.mainImageUrl = recipe.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//RecipeDetailCtrl.$inject = ['$scope', '$routeParams', 'Recipe'];
