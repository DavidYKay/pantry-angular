'use strict';

/* Controllers */

function RecipeListCtrl($scope, Recipe) {
  $scope.recipes = Recipe.query();
  $scope.orderProp = 'age';
}

function RecipeNewCtrl($scope, Recipe, stepStorage, ingredientStorage, filterFilter) {
  var steps = $scope.steps = stepStorage.get();

  $scope.newStep = "";
  $scope.editedStep = null;
  
  var ingredients = $scope.ingredients = ingredientStorage.get();
  $scope.newIngredient = "";
  $scope.editedIngredient = null;

  $scope.$watch('steps', function() {
    $scope.remainingCount = filterFilter(steps, {completed: false}).length;
    $scope.doneCount = steps.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount
    stepStorage.put(steps);
  }, true);
  
  $scope.$watch('ingredients', function() {
    $scope.remainingCount = filterFilter(ingredients, {completed: false}).length;
    $scope.doneCount = ingredients.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount
    ingredientStorage.put(ingredients);
  }, true);


  $scope.addStep = function() {
    if ( !$scope.newStep.length ) {
      return;
    }

    steps.push({
      title: $scope.newStep,
      completed: false
    });

    $scope.newStep = '';
  };
  
  $scope.addIngredient = function() {
    if ( !$scope.newIngredient.length ) {
      return;
    }

    ingredients.push({
      title: $scope.newIngredient,
    });

    $scope.newIngredient = '';
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
