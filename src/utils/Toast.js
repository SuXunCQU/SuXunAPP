import React from "react";
import { ActivityIndicator } from "react-native";
import {Toast } from "teaset";
import {Color} from "./GlobalStyle";


let customKey = null;

Toast.showLoading=(text)=> {
    if (customKey) return;
    customKey = Toast.show({
        text,
        icon: <ActivityIndicator size='large' color={Color.button.active} />,
        position: 'center',
        duration: 100000,
    });
}

Toast.hideLoading=()=> {
    if (!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

Toast.showTips=(text)=>{
    if (customKey) return;
    customKey = Toast.show({
        text,
        // icon: <ActivityIndicator size='large' color={Color.button.active} />,
        position: 'center',
        duration: 1000,
    });
}

export default Toast;
