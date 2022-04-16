import React from 'react';
import {useNavigate as Navigate} from 'react-router-dom';

function BackButton(){
    const goTo = Navigate();

    function goBack(){
        goTo(-1);
    }

    return(
        <button onClick={goBack}>BACK</button>
    )

}

export default BackButton;


