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

const allowedKeys = new Set([
  37, 38, 39, 40, // Arrow keys
  8, // Backspace key
  32, // Spacebar
  17, 91, 67, 86 // copy paste
])

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
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.pressedKeysHistory = new Set();
    this.pressedKeys = new Set();
    this.cursorPosition = null
  }

  _transcribeCell(cursorPosition) {
    // Take history of cells pressed, sort, then convert to string to get the cell code
    let cellCode = Array.from(this.pressedKeysHistory).sort((a, b) => a - b).join('')
    let cell = cellCode in cellCodeMap ? cellCodeMap[cellCode] : "";
    this.setState((prevState, props) => {
      this.cursorPosition = cursorPosition + 1
      return {
        text: (
          prevState.text.slice(0, cursorPosition)
          + cell
          + prevState.text.slice(cursorPosition, prevState.text.length))
      };
    });
    this.pressedKeysHistory.clear()
  }

  _handleKeyDown(event) {
    console.log(event.keyCode)
    if (!allowedKeys.has(event.keyCode)) {
      event.preventDefault()
    }
    if (event.keyCode in keyMap) {
      let cellPressed = keyMap[event.keyCode]
      this.pressedKeysHistory.add(cellPressed)
      this.pressedKeys.add(cellPressed)
    }
  }

  _handleChange(event) {
    this.setState({text: event.target.value});
  }


  _handleKeyUp(event) {
    if (event.keyCode in keyMap) {
      let cellPressed = keyMap[event.keyCode]
      this.pressedKeys.delete(cellPressed)
      if (this.pressedKeys.size === 0) {
        this._transcribeCell(event.target.selectionStart)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.cursorPosition !== null) {
      this.refs.input.selectionStart = this.cursorPosition
      this.refs.input.selectionEnd = this.cursorPosition
    }
    this.cursorPosition = null
  }

  render() {
    return (
      <container>
        <textarea ref='input' cols='60' rows='8'
                  value={this.state.text}
                  onKeyUp={this._handleKeyUp}
                  onKeyDown={this._handleKeyDown}
                  onChange={this._handleChange}/>
      </container>
    )

  }
}

export default connect((state, ownProps) => ownProps, () => ({}))(MainPage)
