    angular.module('ng-decimal', [])
        .directive('ngDecimal', function($filter) {
            var FLOAT_REGEXP_1 = /^\$?\d+(.\d{3})*(\,\d*)?$/; //Numbers like: 1.123,56
            var FLOAT_REGEXP_2 = /^\$?\d+(,\d{3})*(\.\d*)?$/; //Numbers like: 1,123.56
            var nDecimal = undefined;
            var decimalPlaces = function(num) {
                var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if (!match) return 0;
                return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
            }
            var formatNumber = function(_num, d) {
                console.log('_num0',_num,d);
                if (d==undefined) {
                    if (nDecimal == undefined) {
                        d = decimalPlaces(_num);
                    } else {
                        d = nDecimal;
                    }
                }
                console.log('_num1',_num,d);
                //_num = parseFloat(_num);
                //console.log('_num2',_num);
                return (isNaN(d) || d === undefined) ? $filter('number')(_num) : $filter('number')(_num, d);
            };
            var getNumber = function(_num, d) {
                if (d==undefined) {
                    if (nDecimal == undefined) {
                        d = decimalPlaces(_num);
                    } else {
                        d = nDecimal;
                    }
                }
                if (!isNaN(_num)) _num = _num.toString();
                if (FLOAT_REGEXP_1.test(_num)) {
                    var num = parseFloat(_num.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(_num)) {
                    var num = parseFloat(_num.replace(',', ''))
                } else {
                    var num = 0;
                }
                console.log('_num',_num,d);
                if (!isNaN(d) || d !== undefined && d!==decimalPlaces(_num)) num = num.toFixed(d);
                return num;
            };
            return {
                require: 'ngModel',
                replace: true,
                scope: {
                    decimal: '='
                },
                link: function(scope, elm, attrs, ctrl) {
                    scope.$watch('decimal', function(newValue, oldValue) {
                        nDecimal = newValue;
                        var newNumber = getNumber(elm.val());
                        ctrl.$setViewValue(formatNumber(newNumber));
                        ctrl.$render();
                    });
                    elm.bind('blur', function() {
                        ctrl.$viewValue = formatNumber(ctrl.$modelValue);
                        ctrl.$render();
                    });
                    ctrl.$parsers.unshift(function(viewValue) {
                        var testnum = getNumber(viewValue);
                        ctrl.$setValidity('float', (testnum === 0 ? false : true));
                        return (testnum === 0 ? undefined : testnum);
                    });
                    ctrl.$formatters.unshift(
                        function(modelValue) {
                            console.log('formater',modelValue,attrs.decimal);
                            return modelValue === undefined ? modelValue : formatNumber(modelValue);
                        }
                    );
                }
            };
        });
