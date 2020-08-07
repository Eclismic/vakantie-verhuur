import React from 'react'
import checkmark from "../img/checkmark.svg"

const Popup = ({errorMessage, closePopup, text, error}) =>  {
     
      return error ? (
        <div className='popup'>
          <div className='popup_inner'>
            <img id="popup-sign" src="https://img.icons8.com/color/100/000000/break--v4.png"/>
            <h1>{text}</h1>
            <p>{errorMessage}</p>
            <div className="popup-button-wrapper">
                 <button id="popup-button" onClick={closePopup}>Ok</button>
            </div>
          </div>
        </div>
      ) : (
        <div className='popup'>
          <div className='popup_inner'>
            <img id="popup-sign" src="https://img.icons8.com/flat_round/200/000000/checkmark.png"/>
            <h1>{text}</h1>
            <p>{errorMessage}</p>
            <div className="popup-button-wrapper">
                 <button id="popup-button" onClick={closePopup}>Ok</button>
            </div>
          </div>
        </div>
      )
  }

  export default Popup