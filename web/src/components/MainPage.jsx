import React, { Component } from 'react'
import { connect } from 'react-redux';

const keyMap = {
  70: 1,
  68: 2,
  83: 3,
  74: 4,
  75: 5,
  76: 6
}

const cellCodeMap = {
  '1': 'a',
  '12': 'b',
  '14': 'c',
  '145': 'd',
  '15': 'e',
  '124': 'f',
  '1245': 'g',
  '125': 'h',
  '24': 'i',
  '245': 'j',
  '13': 'k',
  '123': 'l',
  '134': 'm',
  '1345': 'n',
  '135': 'o',
  '1234': 'p',
  '12345': 'q',
  '1235': 'r',
  '234': 's',
  '2345': 't',
  '136': 'u',
  '1236': 'v',
  '2456': 'w',
  '1346': 'x',
  '13456': 'y',
  '1356': 'z'
}



class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
    this.pressedKeysHistory = new Set()
    this.pressedKeys = new Set()
  }

  _transcribeCell() {
    // Take history of cells pressed, sort, then convert to string to get the cell code
    let cellCode = Array.from(this.pressedKeysHistory).sort((a,b) => a - b).join('')
    let letter = cellCode in cellCodeMap ? cellCodeMap[cellCode] : "";
    this.setState((prevState, props) => {
      return {
        text: prevState.text + letter};
    });
    this.pressedKeysHistory.clear()
  }

  _handleKeyDown(event) {
    if (event.keyCode in keyMap) {
      let cellPressed = keyMap[event.keyCode]
      this.pressedKeysHistory.add(cellPressed)
      this.pressedKeys.add(cellPressed)
    }
  }


  _handleKeyUp(event) {
    if (event.keyCode in keyMap) {
      let cellPressed = keyMap[event.keyCode]
      this.pressedKeys.delete(cellPressed)
      if (this.pressedKeys.size == 0) {
        this._transcribeCell()
      }
    }
  }


  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    document.addEventListener("keyup", this._handleKeyUp.bind(this));
  }

  render() {
    return (
      <container>
        {this.state.text}
      </container>
    )

  }
}

export default connect((state, ownProps) => ownProps, () => ({}))(MainPage)
