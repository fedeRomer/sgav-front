import React from "react";
import { getUserType } from "../../utils/Common";

export const styles = {

    button: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        borderRadius: '150%',
        // Background 
        backgroundImage: `url(https://www.clipartmax.com/png/middle/470-4704082_glossy-sos-circle-button-clip-art-sos-button-clip-art.png)`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '200px',
        // Size
        width: '150px',
        height: '150px',
        flex: 1,
        right:0,
        margin:5,
        bottom:0,
        position:'absolute'
    },
    buttontext:{
        flex: 1,
        right:0,
        margin:150,
        bottom:3,
        position:'absolute'
    }

}