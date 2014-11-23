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
	    		'<ng-arc actual=".50" expected="1" ng-model="test"></ng-arc>';
	    	element = $compile(element)(scope);
    		scope.$digest();
		}));

		
		it("should compute the size to create other values", function() {
			expect(element.attr('actual')).toBe('.50');
			expect(element.attr('expected')).toBe('1');
		});

	});

});

// TODO: tests for green, orange, red based on expected and actual