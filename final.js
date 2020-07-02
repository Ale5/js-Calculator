
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
  first1: 0,
  second1: 0,
  rest: 0,
  op1: null,
  prevOp1: null,
  restOp1: 0,
  flag1:0,
  typeOp1: null,
  last: null,
  prevTypeOp: null
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

function open(){
  theScreen.style.backgroundColor = "#ffff80";
  theScreen.style.boxShadow = "0px 0px 20px #ffffcc";
}

function hold(){
  let inside = JSON.parse(JSON.stringify(CurrentStatus));
  holder.push(inside);
}

function lastSymbol(){
  let text = theScreen.innerHTML;
  let splitted = text.split('');
  CurrentStatus.last = splitted[splitted.length-1];
  return CurrentStatus.last;
}

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
}

function checkLastElement(lastElem){
  if (lastElem == "+" || lastElem == "-" || lastElem == "x" || lastElem == "/") {
    return true;
  }
  else {
    return false;
  }
}

function checkOpType(noTypeOp){
  if (noTypeOp == "x" || noTypeOp == "/") {
    return true;
  }
  else {
    return false;
  }
};

function checkForElement(char){
  for (let i = 0; i < CurrentStatus.first1.length; i++) {
      if (CurrentStatus.first1[i] == char) {
        return true;
      }
  }
        return false;
};

function resetValues() {
  CurrentStatus.first1 = 0;
  CurrentStatus.second1 = 0;
  CurrentStatus.rest1 = 0;
  CurrentStatus.restOp1 = 0;
  CurrentStatus.op1 = null;
  CurrentStatus.prevOp1 = null;
  CurrentStatus.typeOp1 = null;
  CurrentStatus.last = null;

  startFlag = 0;
  holder = [];
};

function reset() {
  resetValues();
  theScreen.innerHTML = null;
}

function point(){

  if (flagPoint == 1){
      alert("Only one point");
  }
  else {
    if (lastSymbol() == undefined) {
        CurrentStatus.first1 += this.innerHTML;
        theScreen.innerHTML += CurrentStatus.first1;
        open();
    }
    else if (checkLastElement(lastSymbol())) {      //if last was an operator ---> add zero firstly
        CurrentStatus.second1 += this.innerHTML;
        theScreen.innerHTML += CurrentStatus.second1;
    }
    else if (typeof(CurrentStatus.second1) != "string") {
        CurrentStatus.first1 += this.innerHTML;
        theScreen.innerHTML += this.innerHTML;
    }
    else {
        CurrentStatus.second1 += this.innerHTML;
        theScreen.innerHTML += this.innerHTML;
    }
    flagPoint = 1;
    hold();
    lastSymbol();
  }
}

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

function show() {
  theScreen.innerHTML += this.innerHTML;
  if (startFlag != 0) {
        CurrentStatus.second1 += this.innerHTML;
  }
  else {
        CurrentStatus.first1 += this.innerHTML;
        open();
  }
  lastSymbol();
  hold();
  counter++;
  limit();
};

function operator() {
  if (checkLastElement(lastSymbol()) || lastSymbol() == ".") {
      delete_last();
  }
  if (lastSymbol() == undefined){
    if (this.innerHTML != "-"){
        theScreen.innerHTML += CurrentStatus.first1;
    }
    open();
  }

  CurrentStatus.first1 *= 1;
  CurrentStatus.op1 = this.innerHTML;

    if (CurrentStatus.prevOp1 != null) { // previous operator ISN'T null
        CurrentStatus.typeOp1 = checkOpType(CurrentStatus.op1);
        CurrentStatus.prevTypeOp = checkOpType(CurrentStatus.prevOp1);
        operation(CurrentStatus.typeOp1);
        theScreen.innerHTML += this.innerHTML;
        CurrentStatus.prevOp1 = CurrentStatus.op1;
    }
    else {    // previous operator IS null
        startFlag = 1;
        flagPoint = 0;
        CurrentStatus.typeOp1 = checkOpType(CurrentStatus.op1);
        theScreen.innerHTML += this.innerHTML;
        CurrentStatus.prevOp1 = CurrentStatus.op1;
    }
    hold();
    lastSymbol();
    limit();
    counter++;
};

function operation(par){
  if (par == true) {                  // if current operator is super
    if (CurrentStatus.prevTypeOp == true) { // if previous operator is super
        calculate(CurrentStatus.prevOp1);
    }
    else {                            // if previous operator is simple
        CurrentStatus.rest1 = CurrentStatus.first1;
        CurrentStatus.restOp1 = CurrentStatus.prevOp1;
        CurrentStatus.first1 = CurrentStatus.second1;
        CurrentStatus.typeOp1 = true;
    }
  }
  else {                              // type of current operator is simple
    //if (current.prevTypeOp == false) {
      calculate(CurrentStatus.prevOp1);
      restOperation();
  }
  CurrentStatus.second1 = 0;
  flagPoint = 0;
};
/**
 * Addind or subscribing the rest
 * @param {string} o current operator
 */
function calculate(o) {
  if (o == "x")
  {
    CurrentStatus.first1 *= +CurrentStatus.second1;
  }
  else if (o == "/") {
    if (CurrentStatus.second1 == 0) {
        dividingByZero = true;
        alert("Dividing by zero");
    }
    else {
        CurrentStatus.first1 /= +CurrentStatus.second1;
    }
  }
  else if (o == "+") {
      CurrentStatus.first1 += +CurrentStatus.second1;
  }
  else {
      CurrentStatus.first1 = CurrentStatus.first1 - +CurrentStatus.second1;
  }
};
/**
 * Addind or subscribing the rest
 */
function restOperation(){
    if (CurrentStatus.restOp1 == "-") {
        CurrentStatus.first1 = CurrentStatus.rest1 - CurrentStatus.first1;
    }
    else {
        CurrentStatus.first1 += CurrentStatus.rest1;
    }
    CurrentStatus.restOp1 = null;
    CurrentStatus.rest1 = 0;
}

function zeroDividing(){
  delete_last();
  counter = CurrentStatus.first1.length;
  dividingByZero = false;
}

function equal() {
  if (lastSymbol() == "+" || lastSymbol() == "-"){
      CurrentStatus.second1 = 0;
  }
  else if (lastSymbol() == "x" || lastSymbol() == "/") {
      CurrentStatus.second1 = 1;
  }
  calculate(CurrentStatus.op1);
  if (dividingByZero == true) {
        return zeroDividing();
  }
  restOperation();
  CurrentStatus.prevOp1 = CurrentStatus.op1;
  theScreen.innerHTML = CurrentStatus.first1;
  resetValues();
  CurrentStatus.first1 = theScreen.innerHTML;
  if(checkForElement(".")) {
    flagPoint = 1;
  }
  else {
    flagPoint = 0;
  }
  counter = CurrentStatus.first1.length;
  limit();
  hold();
};
