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


	describe('ngArc directive', function(){
		var element, scope;

		beforeEach(module('progressIndicatorApp'));

		// Added ng-model attribute to ng-arc directive to avoid the following
		// error:
		//   Error: [$compile:ctreq] Controller 'ngModel', required by directive 'ngArc',
		//   can't be found!
		beforeEach(inject(function($rootScope, $compile) {
	    	scope = $rootScope.$new();
	    	element=
	    		'<ng-arc actual=".50" expected="1" ng-model="test"></ng-arc>';
	    	element = $compile(element)(scope);
    		scope.$digest();
		}));

		it("should have the correct attribute values", function() {
			expect(element.attr('actual')).toBe('.50');
			expect(element.attr('expected')).toBe('1');
		});

		it("should have an svg element of correct width and height", function() {
			expect(element.find('svg').attr('width')).toBe('200');
			expect(element.find('svg').attr('height')).toBe('200');
		});

		it("should have an svg element of correct width and height", function() {
			expect(element.find('g').attr('transform')).toBe('translate(100,100)');
		});

	});

});

// TODO: tests for green, orange, red based on expected and actual