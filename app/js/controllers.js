'use strict';

/* Controllers */

function RecipeListCtrl($scope, Recipe) {
  $scope.recipes = Recipe.query();
  $scope.orderProp = 'age';
}

function RecipeNewCtrl($scope, Recipe) {
  var recipes = $scope.recipes = recipeStorage.get();

  $scope.newRecipe = "";
  $scope.editedRecipe = null;

  $scope.$watch('recipes', function() {
    $scope.remainingCount = filterFilter(recipes, {completed: false}).length;
    $scope.doneCount = recipes.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount
    recipeStorage.put(recipes);
  }, true);


  $scope.addRecipe = function() {
    if ( !$scope.newRecipe.length ) {
      return;
    }

    recipes.push({
      title: $scope.newRecipe,
        completed: false
    });

    $scope.newRecipe = '';
  };

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
