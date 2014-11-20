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
});
