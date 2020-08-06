import React from 'react'
import checkmark from "../img/checkmark.svg"

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          {(this.props.error === null) ? null : <img id="check-mark" src={checkmark}></img> }
            <h1>{this.props.text}</h1>
            <p>{this.props.error}</p>
            <div className="popup-button-wrapper">
                 <button id="popup-button" onClick={this.props.closePopup}>Ok</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Popup