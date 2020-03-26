import Actions from '../actions/actions'
//const ADDOP = 'ADDOP'
//const CALCULATE = 'CALCULATE'



const originalState = {
  total: [],
  neg: '',
  nextOp: '',
  nextNum: '' 
 }

const reduceCalculator = function(state = originalState, action){
  switch(action.type){
    case Actions.CONCATNUM:
      return Object.assign({}, state, {nextNum: state.nextNum.concat(action.num)})
    case Actions.CONCATTOTAL:
      return Object.assign({}, state, {total: state.total.concat(action.next)})
    case Actions.ADDOP:
      return Object.assign({}, state, {nextOp: action.op})
    case Actions.REMOVESTATE:
      return Object.assign({}, state, {[action.prop]: ''})
    case Actions.EQUALS:
      return Object.assign({
        total: [],
        neg: '',
        nextOp: '',
        nextNum: action.total
      })
    case Actions.CLEAR:
      return originalState
    default:
      return state
  }
}
export default reduceCalculator