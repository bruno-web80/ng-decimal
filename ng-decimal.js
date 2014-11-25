    angular.module('ng-decimal', [])
        .directive('ngDecimal', function($filter) {
            var FLOAT_REGEXP_1 = /^\$?\d+(.\d{3})*(\,\d*)?$/; //Numbers like: 1.123,56
            var FLOAT_REGEXP_2 = /^\$?\d+(,\d{3})*(\.\d*)?$/; //Numbers like: 1,123.56
            var nDecimal = 3;
            var formatNumber = function(n, d) {
                n = parseFloat(n);
                if (isNaN(d) || d === undefined) d = nDecimal;
                return $filter('number')(n, d);
            };
            var getNumber = function(num, d) {
                if (isNaN(d) || d === undefined) d = nDecimal;
                d = parseInt(d);
                if (!isNaN(num)) num = num.toString();
                if (FLOAT_REGEXP_1.test(num)) {
                    return parseFloat(num.replace('.', '').replace(',', '.')).toFixed(d);
                } else if (FLOAT_REGEXP_2.test(num)) {
                    return parseFloat(num.replace(',', '')).toFixed(d);
                } else {
                    return 0;
                }
            };
            return {
                require: 'ngModel',
                replace: true,
                scope: {
                    maxdecimal: '='
                },
                link: function(scope, elm, attrs, ctrl) {
                    scope.$watch('maxdecimal', function(newValue, oldValue) {
                        if (!isNaN(newValue)) nDecimal = newValue;
                        var newNumber = getNumber(elm.val(), nDecimal);
                        ctrl.$setViewValue(formatNumber(newNumber));
                        ctrl.$render();
                    });
                    elm.bind('blur', function() {
                        ctrl.$viewValue = formatNumber(ctrl.$modelValue);
                        ctrl.$render();
                    });
                    ctrl.$parsers.unshift(function(viewValue) {
                        var testnum = getNumber(viewValue, nDecimal);
                        ctrl.$setValidity('float', (testnum === 0 ? false : true));
                        return (testnum === 0 ? undefined : testnum);
                    });
                    ctrl.$formatters.unshift(
                        function(modelValue) {
                            return formatNumber(modelValue, nDecimal);
                        }
                    );
                }
            };
        });
