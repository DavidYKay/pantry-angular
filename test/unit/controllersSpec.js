'use strict';

/* jasmine specs for controllers go here */
describe('RecipeCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  beforeEach(module('recipecatServices'));


  describe('RecipeListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('recipes/recipes.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller(RecipeListCtrl, {$scope: scope});
    }));


    it('should create "recipes" model with 2 recipes fetched from xhr', function() {
      expect(scope.recipes).toEqual([]);
      $httpBackend.flush();

      expect(scope.recipes).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('RecipeDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzRecipeData = function() {
          return {
            name: 'recipe xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('recipes/xyz.json').respond(xyzRecipeData());

      $routeParams.recipeId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller(RecipeDetailCtrl, {$scope: scope});
    }));


    it('should fetch recipe detail', function() {
      expect(scope.recipe).toEqualData({});
      $httpBackend.flush();

      expect(scope.recipe).toEqualData(xyzRecipeData());
    });
  });
});
