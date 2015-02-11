/**
 * Created by domenicovacchiano on 11/02/15.
 */
var progressBarController=angular.module('myApp.ProgressBarController', []);
progressBarController.controller('ProgressBarController',function($scope,$interval){

    $scope.ProgressValues={
        "maxValue":75,
        "currentValue":0
    };
    var increment=$scope.ProgressValues.maxValue/100;
    $scope.startProgress=function(){
        $scope.ProgressValues.currentValue=0;
        $interval(tick,30,100);
    };

    var tick=function(){
        $scope.ProgressValues.currentValue=$scope.ProgressValues.currentValue+increment;
    }

});