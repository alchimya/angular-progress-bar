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
 * attr name        type                description
 * ------------------------------------------------------------------------------------------------------
 * value            two-way binding     sets the current position of the progress bar
 * maxValue         one-way binding     sets the maximum value of the range of the control
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
ngDvProgressBar.directive('ngDvProgressBar',function($compile){

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

            //gets the progress bar element from template
            var _divs=element.find('div');
            var _progress=$compile(_divs[0])(scope);
            var _bar=$compile(_divs[1])(scope);
            var _percent=$compile(element.find('span')[0])(scope);

            //gets some css properties from the element
            var _width=element.css("width") ? element.css("width") : "500px"  ;
            var _height=element.css("height") ? element.css("height") : "20px"  ;

            //sets maxValue into a local var
            var _maxValue=scope.maxValue===undefined ? 0 : scope.maxValue;

            scope.$watch("value",function(newValue, oldValue){
                //watching on the value

                if (_maxValue==0 || newValue===undefined){
                    return;
                }
                //calculates the current progress value
                var value=Math.round((newValue*100)/_maxValue);
                _bar.css("width",value + "%")
                _percent.text(value.toString() + "%");
            });

            var setDefaultLayout=function(){
                //sets the default layout of the progress bar

                //progress style
                if (scope.classProgress===undefined){
                    _progress
                        .css("width",_width)
                        .css("border","1px solid black")
                        .css("position","relative");
                }
                //percent style
                if (scope.classPercent===undefined){
                    _percent
                        .css("position","absolute")
                        .css("left","50%")
                        .css("lineHeight",_height)
                        .css("verticalAlign","middle")
                }
                //bar style
                if (scope.classBar===undefined){
                    _bar
                        .css("height",_height)
                        .css("backgroundColor","orange");
                }

            };
            setDefaultLayout();
        }
    };


});
