angular.module('myApp', ['ngRoute', 'ngAnimate'])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl',
            controllerAs : 'ws'
        })
        .when('/home', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl',
            controllerAs : 'ws'
        })
        .when('/newmeal', {
            templateUrl : 'newmeal.html',
            controller : 'MealCtrl',
            controllerAs: 'ws'
        })
        .when('/myearnings', {
            templateUrl : 'myearnings.html',
            controller : 'EarningsCtrl',
            controllerAs: 'ws'
        })
        .when('/error', {
            template : '<p>Error - Page Not Found</p>'
        })
        .otherwise('/error');
    }])
    .run(['$rootScope', '$location', function($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function() {
                $location.path('/error');
            });
        }])
    .factory('meals', function() {
        var savedData = {
            //first settings
            basePrice: null,
            taxRate: null,
            tipRate: null,

            //customer charges
            subtotal: 0,
            tip: 0,
            total:0,
            
            //running total
            tipTotal: 0,
            mealCount: 0,
            averageTip: 0

        };

        savedData.set = function(data){
            return savedData;
        }
        savedData.calculate = function(){
            savedData.subtotal=savedData.basePrice+(savedData.basePrice*(savedData.taxRate/100));
            savedData.tip=savedData.basePrice*(savedData.tipRate/100);
            savedData.total=savedData.tip+savedData.subtotal;
            savedData.tipTotal+=savedData.tip;
            savedData.mealCount+=1;
            savedData.averageTip=(savedData.tipTotal+savedData.tip)/savedData.mealCount;
            savedData.basePrice=null;
            savedData.taxRate=null;
            savedData.tipRate=null;
            return savedData;
        }

        savedData.reset = function(){
            savedData.basePrice= null;
            savedData.taxRate= null;
            savedData.tipRate= null;
            savedData.subtotal= 0;
            savedData.tip= 0;
            savedData.total=0;
            savedData.tipTotal= 0;
            savedData.mealCount= 0;
            savedData.averageTip= 0;
            return savedData;
        }

        return savedData;
       
    })
    .controller('HomeCtrl', function(meals) {
    })
    .controller('MealCtrl', function(meals) {
        var ws = this;
        ws.meal = meals;

        ws.submit = function(){
            ws.meal.calculate();
        };

        ws.cancel = function(){
            ws.meal.basePrice='';
            ws.meal.taxRate='';
            ws.meal.tipRate='';
        };

    }).controller('EarningsCtrl', function(meals) {
        var ws = this;
        ws.meal = meals;

        ws.reset = function(){
            ws.meal.reset();
        }
    });


