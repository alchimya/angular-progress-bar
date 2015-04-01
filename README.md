# angular-progress-bar
A very simple implementation of a progress bar with an AngularJs directive

# How to use

  attr name   |     type        |   description    
--------------| ----------------|-------------------------------------------------------------------
value         | two-way binding | sets the current position of the progress bar
maxValue      | one-way binding | sets the maximum value of the range of the control
classProgress | one-way binding | sets the Cascading Style Sheet (CSS) class for the container
classPercent  | one-way binding | sets the Cascading Style Sheet (CSS) class for the percent label
classBar      | one-way binding | sets the Cascading Style Sheet (CSS) class for the bar

```javascript
<ng-dv-progress-bar
        max-value="100"
        value="myData.currentValue">
</ng-dv-progress-bar>

<ng-dv-progress-bar
        max-value="100"
        value="myData.currentValue">
        class-progress="myProgressClass"
        class-bar="myBarClass"
        class-percent="myPercentClass">
</ng-dv-progress-bar>
```


<br/>
![ScreenShot](https://raw.github.com/alchimya/angular-progress-bar/master/screenshots/angular-progress-bar.gif)
