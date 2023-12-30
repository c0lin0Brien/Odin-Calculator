let val = [];
let evaluation = [];
operation = [];
let second = false;
let next = false;
let repeat = [];
function makeInput(value) {
    // Initialize the object
    let first = {};
    first.value = value;
    // Set methods for different operators
    first.add = function(second) {
        return first.value + second;
    }
    first.subtract = function(second) {
        return first.value - second;
    }
    first.multiply = function(second) {
        return first.value * second;
    }
    first.divide = function(second) {
        return first.value / second;
    }
    return first;
}
// Operate Function
function operate(expression) {
    return makeInput(expression[0])[expression[1]](expression[2]);
}
// Numbers Onclick Function
const display = document.querySelector(".display");
function numPress(button) {
    if (next) {
        val = [];
        evaluation = [];
        next = false;
    }
    if (!second) {
        val.push(button.value);
        let currentVal = Number(val.join(""));
        display.textContent = currentVal;
    } else {
        val = [];
        val.push(button.value);
        evaluation.push(operation[0]);
        let currentVal = Number(val.join(""));
        display.textContent = currentVal;
        second = false;
    }
}
// Operators Onclick Function
function opPress(button) {
    let buttons = Array.from(document.querySelectorAll(".button"))
    for (i=0; i < buttons.length; i++) {
        buttons[i].style.color = "white";
        buttons[i].style.backgroundColor = "black";
    }
    // Evaluate Button
    if (button.value == "evaluate") {
        if (evaluation.length == 2) {
            evaluation.push(Number(val.join("")));
            let solution = operate(evaluation);
            display.textContent = solution;
            repeat = [solution, evaluation[1], evaluation[2]];
            evaluation = [solution];
            val = [solution];
            next = true;
            console.log(repeat);
        } else if (next) {
            console.log("repeat!");
            let solution = operate(repeat);
            display.textContent = solution;
            repeat = [solution, repeat[1], repeat[2]];
            evaluation = [solution];
            val = [solution];
            next = true;
            console.log(repeat);
        }
    // Clear Button
    } else if (button.value == "clear") {
        val = [];
        evaluation = [];
        display.textContent = 0;
    // Basic Operators
    } else {
        next = false;
        button.style.color = "black";
        button.style.backgroundColor = "white";
        if (evaluation.length == 0) {
            evaluation.push(Number(val.join("")));
        } else if (evaluation.length == 2) {
            evaluation.push(Number(val.join("")));
            let solution = operate(evaluation);
            display.textContent = solution;
            evaluation = [solution];
            val = [solution];
        }
        operation = [];
        operation.push(button.value);
        second = true;
    }

}
// Creating Number Buttons
// 1 - 9
const numbers = document.querySelector(".numbers");
for (i=0; i<3; i++) {
    let numrow = document.createElement("div");
    numrow.classList.add("numrow");
    for (j=0; j<3; j++) {
        let numval = 1 + (i * 3) + j;
        let numbutton = document.createElement("button");
        numbutton.innerHTML = numval;
        numbutton.value = numval;
        numbutton.addEventListener("click", function() { 
            numPress(numbutton);
        });
        numbutton.classList.add("numbutton");
        numbutton.classList.add("button");
        numrow.appendChild(numbutton);
    }
    numbers.appendChild(numrow);
}
// 0
let numrow = document.createElement("div");
numrow.classList.add("numrow");
let zeroButton = document.createElement("button");
zeroButton.innerHTML = 0;
zeroButton.value = 0;
zeroButton.addEventListener("click", function() { 
    numPress(zeroButton);
});
zeroButton.classList.add("numbutton");
zeroButton.classList.add("button");
zeroButton.style.flexBasis = "66.66%";
numrow.appendChild(zeroButton);
// .
let decButton = document.createElement("button");
decButton.innerHTML = ".";
decButton.value = ".";
decButton.addEventListener("click", function() { 
    numPress(decButton);
});
decButton.classList.add("numbutton");
decButton.classList.add("button");
decButton.style.flexBasis = "33.33%";
numrow.appendChild(decButton);
numbers.appendChild(numrow);

// Creating Operator Buttons
let opvals = ["+", "-", "×", "÷", "AC", "="];
let operations = ["add", "subtract", "multiply", "divide", "clear", "evaluate"];
const operators = document.querySelector(".operators");
for (i=0; i<3; i++) {
    let operrow = document.createElement("div");
    operrow.classList.add("operrow");
    for (j=0; j<2; j++) {
        let operbutton = document.createElement("button");
        operbutton.classList.add("operbutton");
        operbutton.classList.add("button");
        operbutton.innerHTML = opvals.shift();
        operbutton.value = operations.shift();
        operbutton.addEventListener("click", function() {
            opPress(operbutton);
        })
        operrow.appendChild(operbutton);
    }
    operators.appendChild(operrow);
}
