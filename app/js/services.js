'use strict';

/* Services */

var recipeCatServices = angular.module('recipecatServices', ['ngResource']);


recipeCatServices.factory('Recipe', function($resource){
  return $resource('recipes/:recipeId.json', {}, {
    query: {method:'GET', params:{recipeId:'recipes'}, isArray:true}
  });

});

recipeCatServices.factory( 'stepStorage', function() {
  var STORAGE_ID = 'steps-angularjs';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function( recipes ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(recipes));
    }
  };
});

recipeCatServices.factory( 'ingredientStorage', function() {
  var STORAGE_ID = 'ingredients-angularjs';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function( recipes ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(recipes));
    }
  };
});
