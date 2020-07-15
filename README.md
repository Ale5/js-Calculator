# js-Calculator
Calculate without parenthesis

HTML document:
<br>Basic html document with buttons.

CSS document:
<br>Calculator design and visual changes.

JavaScript document:

Description:

This calculator working by object status, the object properties changes by clicking buttons and so the object changes.
<br>Each object changing makes a copy of a global (current object) and push that copy inside an array.
<br>The array holds all the copies of a global object and let us know what was the status of object properties in specific moment.
<br>The main model is "first value - operator - second value". There is a lot of another properties that helps us make a right flow.
<br>So we can delete last element and go back if we make a mistake. We can back in every point of program and it isn't affects the logics behind.
<br>Show function makes changes on display and difines who is first and who is a second.
<br>The operator function makes a math and a major logic of the program.
<br>Equal function shows the final answer and pushing it into a new, clean array as a first object with initialized "first" property.

There is a lot of simple functions that make the calculator work efficiently and beeing a user friendly:

Font size changing depending on how much symbols appear on the screen.
<br>Alert window when you write a second point
<br>Dividing by zero
<br>Clicking on operator after operator
<br>Starting with operator, or a point
<br>Pressing point straight after the operator
<br>Deleting last element before equal function going to calculate if the last element is an operator, or a point. 

Code structure:

1 - declaring constant variables and attaching them to html elements.
<br>2 - declaring global variables for saving data and changing them due to functional logic.
<br>3 - declaring an object with simple variables as object properties.
<br>4 - main for loop that runs betwen the buttons and attach functionality to them.
<br>5 - simple functions.
<br>6 - main functions that attached to event listener.
