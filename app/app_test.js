'use strict';

describe('progressIndicatorApp module', function() {

	describe('progressIndicatorApp controller', function(){

		var scope, ctrl;
		beforeEach(module('progressIndicatorApp'));

		beforeEach(inject(function($controller){
			scope = {};
			ctrl = $controller('IndicatorCtrl', {$scope:scope});
		}));

		it('should be defined', inject(function($controller) {
      		expect(ctrl).toBeDefined();
    	}));

  	});


	describe('directive: ngArc', function(){
		var element, scope;

		beforeEach(module('progressIndicatorApp'));

		beforeEach(inject(function($rootScope, $compile) {
	    	scope = $rootScope.$new();
	    	element=
	    		'<ng-arc actual="{{actual}}" expected="1"></ng-arc>';
	    	scope.actual=.75;
	    	element = $compile(element)(scope);
    		scope.$digest();
		}));

		describe('with the first given value', function() {
		  it("should compute the size to create other values", function() {
		    //var isolated = element.isolateScope();
		    //expect(isolated.values.ele_width).toBe(200);
		    //expect(isolated.values.ele_height).toBe(200);
		    expect(element.attr('actual')).toBe('.75');
		    expect(element.attr('expected')).toBe('1');
		  });
		});

	});

});

// TODO: tests for green, orange, red based on expected and actual