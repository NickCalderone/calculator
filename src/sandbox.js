const operator = function (firstNumber, operator, secondNumber) {
    switch (operator) {
        case "*":
            return firstNumber * secondNumber;
        case "/":
            return firstNumber / secondNumber;
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        default:
            return "operator function error"
    }
}
const equalsOperations = function (array, index) {
    let replacement = operator(array[index - 1], array[index], array[index + 1])
    let returnArray = [...array]
    returnArray.splice(index - 1, 3, replacement)
    return returnArray
}


const equals = function (array) {
    let multDivIndex = array.findIndex((element) => (element === '/' || element === '*'))
    let plusMinusIndex = array.findIndex((element) => (element === '+' || element === '-'))

    if (multDivIndex !== -1) {
        let newArray = equalsOperations(array, multDivIndex)
        return equals(newArray)
    } else if (plusMinusIndex !== -1){
        let newArray = equalsOperations(array, plusMinusIndex)
        return equals(newArray)
    }   else return array
}

const firstArray = [10, '/', 5, '*', 5, "+", 9, '/', -3]
console.log(firstArray.join(''))
let x = equals(firstArray)
console.log(x)
