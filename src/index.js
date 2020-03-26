import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import reduceCalculator from './reducer/rootreducer' 
import Actions from './actions/actions'


const createConcatNum = (num) => ({
  type: Actions.CONCATNUM,
  num: num
})
const createConcatTotal = (next) => ({
  type: Actions.CONCATTOTAL,
  next: next
})
const createAddOp = (op) => ({
  type: Actions.ADDOP,
  op: op
})
const createRemoveState = (prop) =>({
  type: Actions.REMOVESTATE,
  prop: prop
})
const createEquals = (total) => ({
  type: Actions.EQUALS,
  total: total
})
const createClear = () => ({
  type: Actions.CLEAR
})

const store = createStore(reduceCalculator)

const mapStateToProps = (state) => ({
  store: state 
})
const mapDispatchToProps = (dispatch) => ({
  dispatchConcatNum: (number) => dispatch(createConcatNum(number)),
  dispatchConcatTotal: (next) => dispatch(createConcatTotal(next)),
  dispatchAddOp: (op) => dispatch(createAddOp(op)),
  dispatchRemoveState: (prop) => dispatch(createRemoveState(prop)),
  dispatchEquals: (total) => dispatch(createEquals(total)),
  dispatchClear: () => dispatch(createClear())
})
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Calculator)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
