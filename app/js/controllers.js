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
  
  $scope.removeStep = function(step) {
    console.log("Attempting to remove step: " + step);
    steps.splice(steps.indexOf(step), 1);
  };
  
  $scope.removeIngredient = function(ingredient) {
    console.log("Attempting to remove ingredient: " + ingredient);
    ingredients.splice(ingredients.indexOf(ingredient), 1);
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
