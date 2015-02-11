/**
 * Created by domenicovacchiano on 11/02/15.
 */
/**
 * @name        ngDvProgressBar
 * @restrict    E
 * @description
 * Represents a progress bar control.
 * @isolated_scope
 * ------------------------------------------------------------------------------------------------------
 * name             type                description
 * ------------------------------------------------------------------------------------------------------
 * value            two-way binding     sets the current position of the progress bar.
 * maxValue         one-way binding     sets the maximum value of the range of the control.
 * classProgress    one-way binding     sets the Cascading Style Sheet (CSS) class for the container
 * classPercent     one-way binding     sets the Cascading Style Sheet (CSS) class for the percent label
 * classBar         one-way binding     sets the Cascading Style Sheet (CSS) class for the bar
 * ------------------------------------------------------------------------------------------------------
 * @example
 * 1) progress bar with default style
 *  <ng-dv-progress-bar
 *      max-value="{{ProgressValues.maxValue}}"
 *      value="ProgressValues.currentValue" >
 *  </ng-dv-progress-bar>
 *
 * 2) progress bar with with custom width and height
 *  <ng-dv-progress-bar
 *      max-value="{{ProgressValues.maxValue}}"
 *      value="ProgressValues.currentValue" style="width: 300px;height: 50px" >
 *  </ng-dv-progress-bar>
 *
 * 3) progress bar with with a custom style
 *  <ng-dv-progress-bar
 *      max-value="{{ProgressValues.maxValue}}"
 *      value="ProgressValues.currentValue"
 *      class-progress="progress"
 *      class-bar="bar"
 *      class-percent="percent">
 *  </ng-dv-progress-bar>
 *  -------------------------------------------------------------
 *  For the previous example I used the controller below
 *  Invoke the startProgress function.
 *  -------------------------------------------------------------
 *  var progressBarController=angular.module('myApp.ProgressBarController', []);
 *  progressBarController.controller('ProgressBarController',function($scope,$interval){
 *      $scope.ProgressValues={
 *          "maxValue":75,
 *          "currentValue":0
 *      };
 *      var increment=$scope.ProgressValues.maxValue/100;
 *      $scope.startProgress=function(){
 *          $scope.ProgressValues.currentValue=0;
 *          $interval(tick,30,100);
 *      };
 *      var tick=function(){
 *          $scope.ProgressValues.currentValue=$scope.ProgressValues.currentValue+increment;
 *      }
 * });
 *-------------------------------------------------------------
 */
var ngDvProgressBar=angular.module('ngDvProgressBar',[]);
ngDvProgressBar.directive('ngDvProgressBar',function(){

    return{
        restrict:'E',
        replace:false,
        scope:{
            value:'=',
            maxValue:'@',
            classProgress:'@',
            classPercent:'@',
            classBar:'@'
        },
        template:'<div id="progress" class="{{classProgress}}"> ' +
            '<span id="percent" class="{{classPercent}}">0%</span> ' +
            '<div id="bar" class="{{classBar}}"></div> ' +
        '</div>',
        link:function(scope,element,attrs){

            //get the progress bar element from template
            var _divs=element.find('div');
            var _progress=_divs[0];
            var _bar=_divs[1];
            var _percent=element.find('span')[0];

            //get some css properties from the element
            var _width=element.css("width")=="" ?"500px":element.css("width");
            var _height=element.css("height")=="" ?"20px":element.css("height");


            scope.$watch("value",function(newValue, oldValue){
                //watching on the value
                //calc the current progress value
                var value=Math.round((newValue*100)/scope.maxValue);
                _bar.style.width=value + '%';
                _percent.innerText= value.toString() + '%';
            });

            var setDefaultLayout=function(){
                //set the default layout of the progressbar

                //progress style
                if (scope.classProgress===undefined){
                    _progress.style.width=_width;
                    _progress.style.border="1px solid black";
                    _progress.style.position="relative";
                }
                //percent style
                if (scope.classPercent===undefined){
                    _percent.style.position="absolute";
                    _percent.style.left="50%";
                    _percent.style.lineHeight=_height;
                    _percent.style.verticalAlign="middle";
                }
                //bar style
                if (scope.classBar===undefined){
                    _bar.style.height=_height;//"20px";
                    _bar.style.backgroundColor="orange";
                }

            };

            setDefaultLayout();

        }
    };


});
