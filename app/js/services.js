'use strict';

/* Services */

angular.module('recipecatServices', ['ngResource']).
  factory('Recipe', function($resource){
    return $resource('recipes/:recipeId.json', {}, {
      query: {method:'GET', params:{recipeId:'recipes'}, isArray:true}
    });

  factory( 'recipeStorage', function() {
    var STORAGE_ID = 'recipes-angularjs';

    return {
      get: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      put: function( recipes ) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(recipes));
      }
    };
  });
});
