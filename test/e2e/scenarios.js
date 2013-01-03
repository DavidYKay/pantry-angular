'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('RecipeCat App', function() {

  it('should redirect index.html to index.html#/recipes', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/recipes');
  });


  describe('Recipe list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/recipes');
    });


    it('should filter the recipe list as user types into the search box', function() {
      expect(repeater('.recipes li').count()).toBe(20);

      input('query').enter('nexus');
      expect(repeater('.recipes li').count()).toBe(1);

      input('query').enter('motorola');
      expect(repeater('.recipes li').count()).toBe(8);
    });


    it('should be possible to control recipe order via the drop down select box', function() {
      input('query').enter('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(repeater('.recipes li', 'Recipe List').column('recipe.name')).
          toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                   "MOTOROLA XOOM\u2122"]);

      select('orderProp').option('Alphabetical');

      expect(repeater('.recipes li', 'Recipe List').column('recipe.name')).
          toEqual(["MOTOROLA XOOM\u2122",
                   "Motorola XOOM\u2122 with Wi-Fi"]);
    });


    it('should render recipe specific links', function() {
      input('query').enter('nexus');
      element('.recipes li a').click();
      expect(browser().location().url()).toBe('/recipes/nexus-s');
    });
  });


  describe('Recipe detail view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/recipes/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(binding('recipe.name')).toBe('Nexus S');
    });


    it('should display the first recipe image as the main recipe image', function() {
      expect(element('img.recipe').attr('src')).toBe('img/recipes/nexus-s.0.jpg');
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element('.recipe-thumbs li:nth-child(3) img').click();
      expect(element('img.recipe').attr('src')).toBe('img/recipes/nexus-s.2.jpg');

      element('.recipe-thumbs li:nth-child(1) img').click();
      expect(element('img.recipe').attr('src')).toBe('img/recipes/nexus-s.0.jpg');
    });
  });
});
