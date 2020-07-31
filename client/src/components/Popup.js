import React from 'react'

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
            <p>{this.props.error}</p>
            <div>
                 <button onClick={this.props.closePopup}>Ok</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Popup