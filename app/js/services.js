'use strict';

/* Services */

angular.module('recipecatServices', ['ngResource']).
    factory('Recipe', function($resource){
  return $resource('recipes/:recipeId.json', {}, {
    query: {method:'GET', params:{recipeId:'recipes'}, isArray:true}
  });
});
