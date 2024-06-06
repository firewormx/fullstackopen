import { createContext, useReducer, useContext } from "react";

const counterReducer = (state, action) => {
    switch(action.type){
      case 'INC': return state + 1;
      case 'DEC' : return state -1;
      case 'ZERO' : return  0;
      default: return state
      }
  }

const CounterContext = createContext()
// returns a context obj,which does not hold any info.it presents which context other components read or provide.


export const CounterContextProvider = (props) => {
const [counter, counterDispatch] = useReducer(counterReducer, 0)
return(
    <CounterContext.Provider value= {[counter, counterDispatch]}>
        {props.children}
    </CounterContext.Provider>
)
}
//custom hooks
export const useCounterValue = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[1]
}

export default CounterContext