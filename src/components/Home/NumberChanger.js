import React, { Component } from 'react';

class NumberChanger extends Component {
  constructor(props){
    super(props)

    this.state = {
      number: 0
    }

  }
  
  updateNumber = (newNumber) => {
    this.setState({
      number: newNumber
    })
  }

  render() {
    return (
      <div>

        <input onChange={(e) => {this.updateNumber(e.target.value)}}/>

        <h2>The Current Number is {this.state.number}</h2>

      </div>
    );
  }
}


export default NumberChanger;