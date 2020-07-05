# js-Calculator
Calculate without brackets

HTML document:
<br>Basic html document with buttons.

CSS document:
<br>Calculator design and visual changes.

JavaScript document:

Description:

<br>This calculator working by object status, the object properties changes by clicking buttons and so the object changes.
<br>Each object changing makes a copy of a global (current object) and push that copy inside an array.
<br>The array holds all the copies of a global object and let us know what was the status of object properties in specific moment.
<br>The main model is "first value - operator - second value". There is a lot of another properties that helps us make a wright flow.
<br>So we can delete last element and go back if we make a mistake. We can back in every point of program and it isn't affect the logics behind.
<br>Show function makes changes on display and difines who is first and who is a second.
<br>The operator function makes a math and major logic of a program.
<br>Equal function shows the final answer and pushing it into a new, clean array as a first object with initialized "first" property.

There is a lot of simple functions that make the calculator work efficiently and beeing a user friendly:

<br>Font size changing depending on how much symbols is on the screen.
<br>Alert when you write a second point
<br>Dividing by zero
<br>Pressing an operator after operator
<br>Starting with operator, or point
<br>Pressing point straight after operator
<br>Deleting last element before equal function going to calculate if the last element is an operator, or point. 

Code structure:

