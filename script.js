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

function operate(expression) {
    return makeInput(expression[0])[expression[1]](expression[2]);
}
let exp1 = [10,"divide",2];
console.log(operate(exp1));