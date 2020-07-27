import React from 'react';

const ImgComp = ({src}) => {
    let imgStyles={
        width: "60vw",
        height: "60vh"
    }
    return <img src={src} alt="slide-img" style={imgStyles}></img>;
}

export default ImgComp;