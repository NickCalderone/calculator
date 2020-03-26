import React from 'react';
import logo from './logo.svg';
import './App.css';


/*
const createAddOp = {
  type: ADDOP,
  op: op
}
const createCalculate = {
  type: CALCULATE,
  calculate: calculate
}
*/



// React

const Button = function(props){
  return (
    <button id={props.id} onClick={() => props.handler(props.number[0])}>{props.number[0]}</button>
  )
}

class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.numButtons = [['0','zero'],['1', 'one'],['2', 'two'],['3', 'three'],['4', 'four'],['5', 'five'],['6','six'],['7', 'seven'],['8', 'eight'],['9', 'nine'], ['.', 'decimal']]
    this.opButtons = [['+', 'add'],['*', 'multiply'],['/', 'divide']]
    this.handleNumpad = this.handleNumpad.bind(this)
    this.handleOperators = this.handleOperators.bind(this)
    this.handleAddNeg = this.handleAddNeg.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.operator = this.operator.bind(this)
    this.equalsOperations = this.equalsOperations.bind(this)
    this.equals = this.equals.bind(this)
  }
  handleNumpad(number){
    let store = this.props.store
    const regex = /^[-]?[1-9][0-9]*[.]?[0-9]*$|^[-]?[.][0-9]*$/
    const newNum = store.nextNum.concat(number)
    console.log('hey')
    if (regex.test(newNum)){
      if (store.nextOp){
        if (store.nextOp[1] === '-'){
          this.props.dispatchConcatNum('-')
          this.props.dispatchConcatTotal(store.nextOp[0])
          this.props.dispatchRemoveState('nextOp')
          this.props.dispatchConcatNum(number)
          return
        }
        this.props.dispatchConcatTotal(store.nextOp)
        this.props.dispatchRemoveState('nextOp')
        this.props.dispatchConcatNum(number)
        return
      } else {
        this.props.dispatchConcatNum(number)
        return
      }
    } else return
  }
  handleOperators(op){
    if (this.props.store.nextOp === '-' && this.props.store.nextNum === '-'){
      this.props.dispatchAddOp(op)
      this.props.dispatchRemoveState('nextNum')
      return
    } else if (this.props.store.nextNum && !this.props.store.nextOp){
      this.props.dispatchAddOp(op)
      this.props.dispatchConcatTotal(this.props.store.nextNum)
      this.props.dispatchRemoveState('nextNum')
      return
    } else {
      this.props.dispatchAddOp(op)
      return
    }
  }
  handleAddNeg(){
    if (this.props.store.nextOp === '-' && this.props.store.nextNum[0] !== '-'){
      this.props.dispatchConcatNum('-')
      return
    }
    const regex = /^[*/+]?[-]$/
    const test = this.props.store.nextOp.concat('-')
    if (regex.test(test)){
      this.props.dispatchAddOp(test)
      if (this.props.store.nextNum){
        this.props.dispatchConcatTotal(this.props.store.nextNum)
        this.props.dispatchRemoveState('nextNum')
      } else return
    } else {
      this.props.dispatchAddOp('-')
    }
  }
  handleEquals(){
    if (this.props.store.nextNum){
      let total = this.equals(this.props.store.total.concat(this.props.store.nextNum))
      this.props.dispatchEquals(total)
    } else {
      this.props.dispatchEquals(this.props.store.total)
    }
  }
  handleClear(){
    this.props.dispatchClear()
  }

  // equals 

  operator(first, operator, second) {
    let firstNumber = Number(first)
    let secondNumber = Number(second)
    switch (operator) {
        case "*":
            return (firstNumber * secondNumber).toString();
        case "/":
            return (firstNumber / secondNumber).toString();
        case "+":
            return (firstNumber + secondNumber).toString();
        case "-":
            return (firstNumber - secondNumber);
        default:
            return "operator function error"
    }
}
equalsOperations(array, index) {
    let replacement = this.operator(array[index - 1], array[index], array[index + 1])
    let returnArray = [...array]
    returnArray.splice(index - 1, 3, replacement)
    return returnArray
}


equals(array) {
    console.log('equals function, array: ', array)
    let multDivIndex = array.findIndex((element) => (element === '/' || element === '*'))
    let plusMinusIndex = array.findIndex((element) => (element === '+' || element === '-'))

    if (multDivIndex !== -1) {
        let newArray = this.equalsOperations(array, multDivIndex)
        return this.equals(newArray)
    } else if (plusMinusIndex !== -1){
        let newArray = this.equalsOperations(array, plusMinusIndex)
        return this.equals(newArray)
    }   else return array[0]
}

  render(){
    return (
      <div>
        <h4 id='display'>{(this.props.store.total.join('').concat(this.props.store.nextOp || this.props.store.nextNum) || '0')}</h4>
        <h4>total: {this.props.store.total.join(',')}</h4>
        <h4>neg: {this.props.store.neg}</h4>
        <h4>nextOp: {this.props.store.nextOp}</h4>
        <h4>nextNum: {this.props.store.nextNum}</h4>
        {this.numButtons.map(num => (
          <Button key={num[0]} number={num[0]} id={num[1]} handler={this.handleNumpad} />
        ))}
        {this.opButtons.map(op => (
          <Button key={op[0]} number={op[0]} id={op[1]} handler={this.handleOperators} />
        ))}
        <button id='subtract' onClick={this.handleAddNeg}>-</button>
        <button id='equals' onClick={this.handleEquals}>=</button>
        <button id='clear' onClick={this.handleClear}>clear</button>
      </div>
    )
  }
}

export default Calculator