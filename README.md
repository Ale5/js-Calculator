# js-Calculator
Calculate without brackets

HTML document:
Basic html document with buttons.

CSS document:
Calculator design and visual changes.

JavaScript document:

Description:

This calculator working by object status, the object properties changes by clicking buttons and so the object changes.
Each object changing makes a copy of a global (current object) and push that copy inside an array.
The array holds all the copies of a global object and let us know what was the status of object properties in specific moment.
The main model is "first value - operator - second value". There is a lot of another properties that helps us make a wright flow.
So we can delete last element and go back if we make a mistake. We can back in every point of program and it isn't affect the logics behind.
Show function makes changes on display and difines who is first and who is a second.
The operator function makes a math and major logic of a program.
Equal function shows the final answer and pushing it into a new, clean array as a first object with initialized "first" property.

There is a lot of simple functions that make the calculator work efficiently and beeing a user friendly:

Font size changing depending on how much symbols is on the screen.
Alert when you write a second point
Dividing by zero
Pressing an operator after operator
Starting with operator, or point
Pressing point straight after operator
Deleting last element before equal function going to calculate if the last element is an operator, or point. 

Code structure:

1 - declaring constant variables and attaching them to html elements.

2 - declaring global variables for saving data and changing them due to functional logic.

3 - declaring an object with simple variables as object properties.

4 - main for loop that runs betwen the buttons and attach functionality to them.

5 - simple functions.

6 - main functions that attached to event listener.
