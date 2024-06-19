import React from "react"
import axios from 'axios'
// or import {Component} from "react"

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        anecdotes: [],
        current: 0
      }
    }

    componentDidMount = () => {
      axios.get('http://localhost:3001/anecdotes').then(response => {
        this.setState({ anecdotes: response.data })// setState(nextState, callback), nextState either an obj or a func.  
        // calling setState cause rerender of the Componeng, eg, render()                                  
      })
    }
    
    handleClick = () => {
      const current = Math.floor(
        Math.random() * this.state.anecdotes.length
      )
      this.setState({current})
    }

    render() {// pure func, should only calculate the JSX
      if(this.state.anecdotes.length === 0){
      return <div>no anecdotes...</div>
      }

      return (
        <div>
          <h1>anecdote of the day</h1>
          <div>
            {this.state.anecdotes[this.state.current].content}
          </div>
          <button onClick={this.handleClick}>next</button>
        </div>
      )
    }
  }
  
  export default App