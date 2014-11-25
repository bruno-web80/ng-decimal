ng-decimal
==========

AngularJS Directive for decimal numbers.

Main features:

* Permits work with decimal numbers
* Has a decimal limiter  (default: 3)
* The only required dependency is angular!
* Input value is always filtered with locale number when load and on blur (with the decimal limit).

## Bower

You may install it via bower using

`bower install ng-decimal`

## How to use


+ Include the required libraries:

>
``` html
<script src="/path/to/angular.js"></script>
<script src="/path/to/ng-decimal.js"></script>
```

+ Inject the `ngDecimal` module into your app:

>
``` JavaScript
angular.module('myApp', ['ng-decimal']);
```

+ In your input tag

>
``` html
<input type="text" model="yourModel" ng-decimal />
```

+ It is also possible to add 'max decimal'

>
``` html
<input type="text" model="yourModel" ng-currency maxdecimal="3" />
```

+ If you want to be able to dynamically change maxdecimal

>
``` html
<input type="text" model="yourModel" ng-currency min="1" maxdecimal="my_scope_variable" />
```

## Authors

**Bruno Porto**

+ http://github.com/brunoporto
