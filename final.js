
// Constant getters by CSS
const buttonList = document.querySelector(".btns").getElementsByTagName("button");
const theScreen = document.querySelector(".display");

// Variables
let startFlag = 0;
let counter = 0;
let flagPoint = 0;
let dividingByZero = false;
let holder = [];


const Status = {
  first: 0,
  second: 0,
  rest: 0,
  op: null,
  prevOp: null,
  restOp: 0,
  typeOp: null,
  prevTypeOp: null,
  last: null
};

let CurrentStatus = Object.create(Status);

document.addEventListener('DOMContentLoaded', reset);

// Events by pressing buttons
for (let i = 0; buttonList.length > i; i++) {
  if (i == 16) { buttonList[i].addEventListener('click', reset)}
  else if (i == 9 || i == 11 || i == 12 || i == 14 ) {
    buttonList[i].addEventListener("click", operator)
  }
  else if (i == 13) {
    buttonList[i].addEventListener('click', equal)
  }
  else if (i == 15) {
    buttonList[i].addEventListener('click', delete_last)
  }
  else if (i == 17) {
    buttonList[i].addEventListener('click', point)
  }
  else {
    buttonList[i].addEventListener('click', show)
  }
};

// Turns screen on
function open(){
  theScreen.style.backgroundColor = "#ffff80";
  theScreen.style.boxShadow = "0px 0px 20px #ffffcc";
};
// Pushing copy of a current object into array
function hold(){
  let inside = JSON.parse(JSON.stringify(CurrentStatus));
  holder.push(inside);
};
// Last element getter
function lastSymbol(){
  let text = theScreen.innerHTML;
  let splitted = text.split('');
  CurrentStatus.last = splitted[splitted.length-1];
  return CurrentStatus.last;
};
// Checking if last element is an operator
function checkLastElement(lastElem){
  if (lastElem == "+" || lastElem == "-" || lastElem == "x" || lastElem == "/") {
    return true;
  }
  else {
    return false;
  }
};
// Checking if operator is simple, or super
function checkOpType(noTypeOp){
  if (noTypeOp == "x" || noTypeOp == "/") {
    return true;
  }
  else {
    return false;
  }
};
// Searching for specific element
function checkForElement(char){
  for (let i = 0; i < CurrentStatus.first.length; i++) {
      if (CurrentStatus.first[i] == char) {
        return true;
      }
  }
      return false;
};
// Reset function
function resetValues() {
  CurrentStatus.first = 0;
  CurrentStatus.second = 0;
  CurrentStatus.rest = 0;
  CurrentStatus.restOp = 0;
  CurrentStatus.op = null;
  CurrentStatus.prevOp = null;
  CurrentStatus.typeOp = null;
  CurrentStatus.last = null;

  startFlag = 0;
  holder = [];
};
// Divide by zero error
function zeroDividing(){
  delete_last();
  counter = CurrentStatus.first.length;
  dividingByZero = false;
};

// Font changing depending on amount of elements
function limit(){
  if (counter < 9) {
      theScreen.style.fontSize = "3em";
      theScreen.style.paddingTop = "15px";
  }
  else if (counter > 9 && counter < 16) {
      theScreen.style.fontSize = "2em";
      theScreen.style.paddingTop = "30px";
  }
  else if (counter > 16 && counter < 22 ){
      theScreen.style.fontSize = "1.5em";
      theScreen.style.paddingTop = "35px";
  }
  else if (counter > 22){
      alert("Congratulations you have reached the limt")
      delete_last();
  }
};

// Main functions attached to html buttons:

// Restart
function reset() {
  resetValues();
  theScreen.innerHTML = null;
};
// Show each element on screen by pressing buttons
function show() {
  theScreen.innerHTML += this.innerHTML;
  if (startFlag != 0) {
        CurrentStatus.second += this.innerHTML;
  }
  else {
        CurrentStatus.first += this.innerHTML;
        open();
  }
  lastSymbol();
  hold();
  counter++;
  limit();
};
// Back arrow function
function delete_last(){
  let str = theScreen.innerHTML;
  theScreen.innerHTML = str.slice(0,str.length-1);
  CurrentStatus.last = str[str.length-1];
  holder.pop();
  if (holder[holder.length-1] != undefined) {
    CurrentStatus = JSON.parse(JSON.stringify(holder[holder.length-1]))
  }
  else {
    reset();
  }
  counter = theScreen.innerHTML.length;
};
// Operator function
// Most important function that changes the logic of calculating flowchart and Object values
function operator() {
  if (checkLastElement(lastSymbol()) || lastSymbol() == ".") {
      delete_last();
  }
  if (lastSymbol() == undefined){
    if (this.innerHTML != "-"){
        theScreen.innerHTML += CurrentStatus.first;
    }
    open();
  }

  CurrentStatus.first *= 1;
  CurrentStatus.op = this.innerHTML;

    if (CurrentStatus.prevOp != null) { // previous operator ISN'T null
        CurrentStatus.typeOp = checkOpType(CurrentStatus.op);
        CurrentStatus.prevTypeOp = checkOpType(CurrentStatus.prevOp);
        operation(CurrentStatus.typeOp);
        theScreen.innerHTML += this.innerHTML;
        CurrentStatus.prevOp = CurrentStatus.op;
    }
    else {    // previous operator IS null
        startFlag = 1;
        flagPoint = 0;
        CurrentStatus.typeOp = checkOpType(CurrentStatus.op);
        theScreen.innerHTML += this.innerHTML;
        CurrentStatus.prevOp = CurrentStatus.op;
    }
    hold();
    lastSymbol();
    limit();
    counter++;
};
// Changes by pressing a point
function point(){

  if (flagPoint == 1){
      alert("Only one point");
  }
  else {
    if (lastSymbol() == undefined) {
        CurrentStatus.first += this.innerHTML;
        theScreen.innerHTML += CurrentStatus.first;
        open();
    }
    else if (checkLastElement(lastSymbol())) {      //if last was an operator ---> add zero firstly
        CurrentStatus.second += this.innerHTML;
        theScreen.innerHTML += CurrentStatus.second;
    }
    else if (typeof(CurrentStatus.second) != "string") {
        CurrentStatus.first += this.innerHTML;
        theScreen.innerHTML += this.innerHTML;
    }
    else {
        CurrentStatus.second += this.innerHTML;
        theScreen.innerHTML += this.innerHTML;
    }
    flagPoint = 1;
    hold();
    lastSymbol();
  }
};
// Final computing and a result
function equal() {
  if (lastSymbol() == "+" || lastSymbol() == "-"){
      CurrentStatus.second = 0;
  }
  else if (lastSymbol() == "x" || lastSymbol() == "/") {
      CurrentStatus.second = 1;
  }
  calculate(CurrentStatus.op);
  if (dividingByZero == true) {
        return zeroDividing();
  }
  restOperation();
  CurrentStatus.prevOp = CurrentStatus.op;
  theScreen.innerHTML = CurrentStatus.first;
  resetValues();
  CurrentStatus.first = theScreen.innerHTML;
  if(checkForElement(".")) {
    flagPoint = 1;
  }
  else {
    flagPoint = 0;
  }
  counter = CurrentStatus.first.length;
  limit();
  hold();
};

// Operator function assistance
function operation(par){
  if (par == true) {                  // if current operator is super
    if (CurrentStatus.prevTypeOp == true) { // if previous operator is super
        calculate(CurrentStatus.prevOp);
    }
    else {                            // if previous operator is simple
        CurrentStatus.rest = CurrentStatus.first;
        CurrentStatus.restOp = CurrentStatus.prevOp;
        CurrentStatus.first = CurrentStatus.second;
        CurrentStatus.typeOp = true;
    }
  }
  else {                              // type of current operator is simple
    //if (current.prevTypeOp == false) {
      calculate(CurrentStatus.prevOp);
      restOperation();
  }
  CurrentStatus.second = 0;
  flagPoint = 0;
};

/**
 * Function that makes a math
 * @param {string} o current operator
 */
function calculate(o) {
  if (o == "x")
  {
    CurrentStatus.first *= +CurrentStatus.second;
  }
  else if (o == "/") {
    if (CurrentStatus.second == 0) {
        dividingByZero = true;
        alert("Dividing by zero");
    }
    else {
        CurrentStatus.first /= +CurrentStatus.second;
    }
  }
  else if (o == "+") {
      CurrentStatus.first += +CurrentStatus.second;
  }
  else {
      CurrentStatus.first = CurrentStatus.first - +CurrentStatus.second;
  }
};
/**
 * Calculate function assistance
 */
function restOperation(){
    if (CurrentStatus.restOp == "-") {
        CurrentStatus.first = CurrentStatus.rest - CurrentStatus.first;
    }
    else {
        CurrentStatus.first += CurrentStatus.rest;
    }
    CurrentStatus.restOp = null;
    CurrentStatus.rest = 0;
};
