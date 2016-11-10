angular.module('myApp', ['ngMessages'])
    .controller('WaitstaffController', function() {
    	var _this = this;
        this.basePrice=0;
        this.taxRate=0;
        this.tipPercentage=0;

        this.mealCount=0;
        this.tipTotal=0;
        this.basePrice=0;
        this.averageTip=0;
        this.subtotal=0;
        this.tip=0;
        this.tipTotal=0;
        this.averageTip=0;
        this.total=0;

        this.submit = function(){
            _this.tax_rate= _this.taxRate/100;
            _this.tip_rate= _this.tipPercentage/100;
            _this.subtotal= _this.basePrice*_this.tax_rate;
            _this.tip = _this.basePrice*_this.tip_rate;
            _this.total = _this.basePrice+_this.subtotal+_this.tip;
            _this.mealCount+=1;
            _this.tipTotal+=_this.tip;
            _this.averageTip=(_this.tipTotal+_this.tip)/_this.mealCount;
        };

        this.cancel = function(){
            _this.basePrice='';
            _this.taxRate='';
            _this.tipPercentage='';
        };

        this.double = function(value){return value*2;};


    });